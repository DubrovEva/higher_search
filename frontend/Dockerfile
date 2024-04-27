FROM node:18-alpine3.17 as build

WORKDIR /app
COPY . /app

RUN npm install
RUN npm run build

FROM busybox

RUN adduser -D static
USER static
WORKDIR /home/static

COPY --from=build /app/dist .

EXPOSE 8080
CMD ["busybox", "httpd", "-f", "-v", "-p", "8080"]