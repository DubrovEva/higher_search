#!/bin/bash -e

RED='\033[0;31m'
GREEN='\033[0;32m'
NC='\033[0m'

fmt() {
  echo "run go fmt"
  go fmt ./...
}

vet() {
  echo "run go vet"
  go vet ./...
}

unit() {
  echo "run unit tests with race"
   if ! go test -race ./...;
   then
     echo -e "${RED}[UNIT TESTS FAILED]${NC}"
     print_fail
     return 1
   else
     echo -e "${GREEN}[UNIT TESTS PASSED]${NC}"
   fi
}

lint() {
  echo "run linter"
  go mod vendor
  if ! docker run --rm -v "$(pwd)":/work:ro -w /work -it golangci/golangci-lint:latest golangci-lint run -v
  then
    echo -e "${RED}[LINTER CHECK FAILED]${NC}"
    print_fail
    return 1
  else
    echo -e "${GREEN}[LINTER CHECK PASSED]${NC}"
  fi
  rm -Rf vendor
}

print_success() {
  echo -e "${GREEN}\nALL TESTS PASSED ${NC}"
}

test(){
  fmt
  vet
  unit
  lint
  print_success
}

using(){
  echo "Укажите команду при запуске: ./run.sh [command]"
  echo "Список команд:"
  echo "  unit - запустить unit-тесты"
  echo "  lint - запустить все линтеры"
  echo "  fmt - форматирование кода при помощи 'go fmt'"
  echo "  vet - проверка правильности форматирования кода"
  echo "  test - запустить все проверки"
}

command="$1"
if [ -z "$command" ]
then
 using
 exit 0;
else
 $command $@
fi
