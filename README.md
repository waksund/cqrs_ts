# cqrs_ts

## Монорепо, состоящее из пяти приложений

* `spaghetti` - приложение, содержащее весь функционал в контроллерах
* `services-write` - write часть. Сервисный слой представляет собой ряд классов - сервисов 
* `services-read` - read часть. Сервисный слой представляет собой ряд классов - сервисов 
* `commands-write` - write часть. Сервисный слой представляет собой ряд комманд 
* `commands-read` - write часть. Сервисный слой представляет собой ряд запросов

## Переменные окружения

* `APP_PORT` [3000]
* `DB_URL` [postgres://user_name:user_password@localhost:5432/cqrs_ts]
* `DB_LOGGING` [true]
* `REDIS_HOST`
* `REDIS_PASSWORD`
* `REDIS_PORT`

## Scripts

```shell
npm run start:spaghetti
```

```shell
npm run start:services-write
```

```shell
npm run start:services-read
```

```shell
npm run start:commands-write
```

```shell
npm run start:commands-read
```
