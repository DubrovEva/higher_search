FROM golang:latest as builder

COPY ./go.mod ./go.sum /go/src/github.com/DubrovEva/higher_search/backend/
WORKDIR /go/src/github.com/DubrovEva/higher_search/backend/
RUN go mod download

COPY .. /go/src/github.com/DubrovEva/higher_search/backend/
RUN CGO_ENABLED=0 GOOS=linux go build -a -installsuffix cgo -o build/higher_search github.com/DubrovEva/higher_search/backend/cmd/higher_search

FROM alpine
RUN apk add --no-cache ca-certificates && update-ca-certificates
COPY --from=builder /go/src/github.com/DubrovEva/higher_search/backend/build/higher_search /usr/bin/higher_search
EXPOSE 8080 8080
ENTRYPOINT ["/usr/bin/higher_search"]