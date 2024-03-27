package main

import (
	"context"
	"github.com/DubrovEva/higher_search/internal/app"
	"log"
	"os/signal"
	"syscall"
)

func main() {
	ctx, cancel := signal.NotifyContext(
		context.Background(),
		syscall.SIGINT,
		syscall.SIGTERM,
		syscall.SIGHUP,
		syscall.SIGQUIT,
	)

	application := app.NewApplication()

	err := application.Start(ctx)
	if err != nil {
		log.Fatalf("failed to run app: %v", err)
	}

	err = application.Wait(ctx, cancel)
	if err != nil {
		log.Fatalln("All systems closed with errors. LastError: ", err)
	}

	log.Println("All systems closed without errors")

}
