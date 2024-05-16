# higher_search

Приложение для навигации в студенческих организациях Высшей Школы Экономики.

###  Запуск 

Из директории deployments: ```docker compose up --build```  
Сайт будет запущен на http://localhost/

Удаление базы данных:   
```
docker compose down
docker volume rm deployments_pg_data
```


Тестирование gRPC запросов: ```evans -r --port 8080 --web repl ```
(для того, чтобы не вводить repetead параметры - `CTRL + D` )

Скрипт тестирования (go vet, go lint, go fmt, go test):  
`./run.sh test`
(из директории backend)