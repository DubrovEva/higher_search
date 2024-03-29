package app

import (
	"context"
	"database/sql"
	"fmt"
	"github.com/DubrovEva/higher_search/internal/config"
	"github.com/DubrovEva/higher_search/internal/db"
	"github.com/DubrovEva/higher_search/internal/service"
	protoservice "github.com/DubrovEva/higher_search/pkg/proto/service"
	_ "github.com/lib/pq"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/improbable-eng/grpc-web/go/grpcweb"
)

type Application struct {
	cfg *config.Config
	db  *sql.DB
	hs  *http.Server
	wg  *sync.WaitGroup

	userDB *db.User

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
		return fmt.Errorf("can't init db connection: %w", err)
	}
	a.initDatabaseMappers()

	if err := a.initServer(); err != nil {
		return fmt.Errorf("can't init service: %w", err)
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
		a.cfg.DB.Host,
		a.cfg.DB.Port,
		a.cfg.DB.User,
		a.cfg.DB.Password,
		a.cfg.DB.Name)

	dbConn, err := sql.Open("postgres", psqlInfo)
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

func (a *Application) initDatabaseMappers() {
	a.userDB = db.NewUser(a.db)
}

func (a *Application) initServer() error {
	grpcServer := grpc.NewServer()
	reflection.Register(grpcServer)
	protoservice.RegisterAccountServer(grpcServer, &service.AccountImpl{
		User: a.userDB,
	})

	wrappedGrpc := grpcweb.WrapServer(grpcServer,
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
	log.Println("Server initialised")

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
		log.Fatalf("faild to close db connection: %v", err)
	}

	if err := a.hs.Shutdown(ctx); err != nil {
		log.Printf("failed to stop http service: %v", err)
	}

	return appErr
}
