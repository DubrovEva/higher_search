#!/bin/bash
DST="./frontend/app/proto"

# на основе протобуфов генерирует модели для фронтенда

rm -rf $DST

mkdir -p $DST/models
protoc -I=./proto ./proto/models/*.proto \
  --plugin=protoc-gen-ts=./frontend/node_modules/.bin/protoc-gen-ts \
  --ts_out=$DST --ts_opt=long_type_string

mkdir -p $DST/api
protoc -I=./proto ./proto/api/*.proto \
  --plugin=protoc-gen-ts=./frontend/node_modules/.bin/protoc-gen-ts \
  --ts_out=$DST --ts_opt=long_type_string

rename -E 's/.client.ts/_client.ts/' $(find $DST -type f)