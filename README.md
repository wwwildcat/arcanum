# arcanum
 
Установка: `npm install`

Запуск: `npm start` + путь до папки с репозиториями. В адресной строке браузера адрес вида http://localhost:3000/:repositoryID (название репозитория)

## Блоки серверной части

Большинство запросов к серверу состоит из 3-х частей:

- подготовка параметров запроса

- собственно запрос через `child_process`

- форматирование ответа в нужный json

Поскольку собственно запрос возвращает результат работы стороннего API (git), то его нет смысла тестировать, а подготовку параметров и форматирование ответа для удобства тестирования можно выделить в отдельные функции. Например, для запроса содержимого директории [getRepository](https://github.com/wwwildcat/arcanum/blob/tests/src/server/callbacks/getRepository/getRepository.js) это [ветка getCommandParams](https://github.com/wwwildcat/arcanum/blob/tests/src/server/callbacks/getCommandParams.js#L11) и [getRepositoryData](https://github.com/wwwildcat/arcanum/blob/tests/src/server/callbacks/getRepository/getRepositoryData.js). Результатом их сценариев соответственно будет результат функции.

[Тесты](https://github.com/wwwildcat/arcanum/tree/tests/tests)
