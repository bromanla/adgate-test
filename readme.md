

## Docker

> Make environment variables (see docker-compose.yaml)

```bash
docker-compose up
```

## Build

> Make environment variables (see .env.example)

> We use node version 16+

Download the dependencies:

```bash
npm ci
```

To run compile the Typescript:

```bash
npm run build
```

Remove dependencies for development:

```bash
npm ci --omit=dev
```

To run the application:

```bash
npm run start:prod
```
<!-- ## Обязательные требования

* ✅ Пароли не хранить в открытом виде
* ✅ Реализовать валидацию полей на api запросы с кодами ответов и сообщениями об ошибке в теле ответа.
* ✅ Развернуть проект в любом удобном месте, что бы можно было прогнать тесты и проверить.
* ✅ Код на github или gitlab
* ✅ Придерживаться принципам SOLID
* ✅ Токен авторизации живет 30 минут
* ✅ Реализовать endpoint для обновления токена
* ❌ Создать миграции
* ✅ Написать сопроводительную документация в README.md для разворота
* ✅ Реализовать offset или пагинацию для сущности **TAG**
* ✅ Реализовать Сортировку по полю **sortOrder** и(или) полю **name** для сущности **TAG**

## Дополнительные требования

* ✅ Использовать DTO
* ✅ Писать интерфейсы и реализовывать их
* ❌ Желательно не использовать ORM
* ✅ Написать DockerFile для приложения
* ✅ Написать docker-composer для локального разворота приложения
* ✅ Реализовать кеширование
* ❌ Покрыть тестами сами api
* ✅ Добавить генерацию swagger документации для api методов (или написать ручками и положит в проект в директорию /doc) -->
