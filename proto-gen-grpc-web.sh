#!/bin/bash
DST="./frontend/src/proto"

# на основе протобуфов генерирует модели для фронтенда
mkdir -p $DST/models
protoc -I=./proto ./proto/models/*.proto \
  --plugin=protoc-gen-grpc-web=./frontend-demo/node_modules/.bin/protoc-gen-grpc-web \
  --js_out=import_style=commonjs,binary:$DST \
  --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:$DST

mkdir -p $DST/api
protoc -I=./proto ./proto/api/*.proto \
  --plugin=protoc-gen-grpc-web=./frontend-demo/node_modules/.bin/protoc-gen-grpc-web \
  --js_out=import_style=commonjs,binary:$DST \
  --grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:$DST