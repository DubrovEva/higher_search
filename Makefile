export PATH := "${PATH}:$(go env GOPATH)/bin"
# на основе протобуфов генерирует модели для бэкенда

./pkg/proto:
	rm -rf backend/pkg/proto
	mkdir -p backend/pkg/proto
	protoc \
		--proto_path ./proto \
		--go_out ./backend/pkg/proto \
		--go_opt paths=source_relative \
		--go-grpc_out ./backend/pkg/proto \
		--go-grpc_opt paths=source_relative \
		$(shell find ./proto -name '*.proto')

.PHONY : ./pkg/proto