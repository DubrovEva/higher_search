package app

import (
	"context"
	"fmt"
	"github.com/DubrovEva/higher_search/backend/internal/api"
	"github.com/DubrovEva/higher_search/backend/internal/config"
	repo "github.com/DubrovEva/higher_search/backend/internal/repository"
	protoservice "github.com/DubrovEva/higher_search/backend/pkg/proto/api"
	_ "github.com/lib/pq"
	"google.golang.org/grpc"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/reflection"
	"google.golang.org/grpc/status"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
	"github.com/jmoiron/sqlx"
)

type Application struct {
	cfg        *config.Config
	db         *sqlx.DB
	hs         *http.Server
	wg         *sync.WaitGroup
	jwtManager *api.JWTManager

	repoUser         *repo.User
	repoStudorg      *repo.Studorg
	repoUser2Studorg *repo.User2Studorg

	errChan chan error
}

func NewApplication() *Application {
	return &Application{
		errChan: make(chan error),
		wg:      &sync.WaitGroup{},
	}
}

func (a *Application) Start(ctx context.Context) error {
	if err := a.initConfig(); err != nil {
		return fmt.Errorf("can't init config: %w", err)
	}

	if err := a.initDatabaseConnection(); err != nil {
		return fmt.Errorf("can't init repository connection: %w", err)
	}
	a.initRepository()

	if err := a.initServer(); err != nil {
		return fmt.Errorf("can't init api: %w", err)
	}

	return nil
}

func (a *Application) initConfig() error {
	var err error

	a.cfg, err = config.ParseConfig()
	if err != nil {
		return fmt.Errorf("failed to parse config: %w", err)
	}

	return nil
}

func (a *Application) initDatabaseConnection() error {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s password=%s dbname=%s sslmode=disable",
		a.cfg.Database.Host,
		a.cfg.Database.Port,
		a.cfg.Database.User,
		a.cfg.Database.Password,
		a.cfg.Database.Name)

	dbConn, err := sqlx.Open("postgres", psqlInfo)
	if err != nil {
		return err
	}
	if err = dbConn.Ping(); err != nil {
		return err
	}

	a.db = dbConn
	log.Println("Database connection established")

	return nil
}

func (a *Application) initRepository() {
	a.repoUser = repo.NewUser(a.db)
	a.repoStudorg = repo.NewStudorg(a.db)
	a.repoUser2Studorg = repo.NewUser2Studorg(a.db)
}

func (a *Application) initServer() error {
	a.jwtManager = api.NewJWTManager(a.cfg.JWTToken)

	grpcServer := grpc.NewServer(grpc.UnaryInterceptor(NewInterceptor()))
	reflection.Register(grpcServer)
	protoservice.RegisterRouterServer(grpcServer, api.NewRouter(a.repoUser, a.repoStudorg, a.repoUser2Studorg, a.jwtManager))

	wrappedGrpc := grpcweb.WrapServer(grpcServer,
		grpcweb.WithOriginFunc(func(origin string) bool { return true }),
		grpcweb.WithWebsockets(true),
		grpcweb.WithWebsocketOriginFunc(func(req *http.Request) bool {
			return true
		}),
	)
	httpSrv := &http.Server{
		Addr:              a.cfg.URL,
		ReadHeaderTimeout: 5 * time.Second,
		IdleTimeout:       120 * time.Second,
		Handler:           wrappedGrpc,
	}

	a.wg.Add(1)
	go func() {
		defer a.wg.Done()
		err := httpSrv.ListenAndServe()
		if err != nil {
			a.errChan <- err
		}
	}()

	a.hs = httpSrv
	log.Println("Server running at ", a.cfg.URL)

	return nil
}

func (a *Application) Wait(ctx context.Context, cancel context.CancelFunc) error {
	var appErr error

	errWg := sync.WaitGroup{}
	errWg.Add(1)

	go func() {
		defer errWg.Done()
		for err := range a.errChan {
			cancel()
			appErr = err
		}
	}()

	<-ctx.Done()
	a.wg.Wait()
	close(a.errChan)
	errWg.Wait()

	if err := a.db.Close(); err != nil {
		log.Fatalf("faild to close repository connection: %v", err)
	}

	if err := a.hs.Shutdown(ctx); err != nil {
		log.Printf("failed to stop http api: %v", err)
	}

	return appErr
}

func NewInterceptor() grpc.UnaryServerInterceptor {
	return func(ctx context.Context, req interface{}, info *grpc.UnaryServerInfo,
		handler grpc.UnaryHandler) (resp interface{}, err error) {
		log.Println("Processing request")

		defer func() {
			if r := recover(); r != nil {
				err = status.Errorf(codes.Internal, "panic: %s", r)
				log.Printf("Panic detected: %s", r)
			}
		}()

		resp, err = handler(ctx, req)
		errCode := status.Code(err)
		if errCode == codes.Unknown || errCode == codes.Internal {
			log.Printf("Request handler returned an internal error: %s", err)
			return
		}

		log.Println("Request finished successfully")
		return
	}
}
