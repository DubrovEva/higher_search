# higher_search

Приложение для навигации в студенческих организациях Высшей Школы Экономики. Выполнено в рамках [выпускной квалификационной работы]([url](https://www.hse.ru/ba/se/students/diplomas/924181883)).

[Демонстрация](https://drive.google.com/file/d/1LmxBtdD1PVRjHaWdU64ul6usvQLFM-RV/view?usp=drive_link)

[Текст ВКР](https://github.com/DubrovEva/higher_search/blob/main/%D0%94%D1%83%D0%B1%D1%80%D0%BE%D0%B2%D1%81%D0%BA%D0%B0%D1%8F_%D0%A2%D0%B5%D0%BA%D1%81%D1%82_%D0%92%D0%9A%D0%A0.pdf)

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
