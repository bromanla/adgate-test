# Тестовое задание

## Описание
Тестовое задание состоит из основных нужных нам в работе инструментов собранных в одном месте.
Проект должен быть на Node JS, должна использоваться база данных PostgreSQL.
При отправке команды /start бот должен сохранить информацию о пользователе в таблицу базы данных и выдать сообщение:

*«Здравствуйте. Нажмите на любую интересующую Вас кнопку»*

Должны быть кнопки:

- Погода в Канаде
- Хочу почитать!
- Сделать рассылку

## Погода в Канаде

При нажатии на эту кнопку пользователю должно прийти сообщение с текстом, информирующем о сегодняшней погоде в Канаде.
Api для погоды и формат сообщения на Ваш выбор.

## Хочу почитать!

При нажатии на эту кнопку пользователю должно прийти 2 сообщения.

В первом сообщении должна быть [картинка](../files/read.jpg) и текст:

*«Идеальный карманный справочник для быстрого ознакомления с особенностями работы разработчиков на Python. Вы найдете море краткой информации о типах и операторах в Python, именах специальных методов, встроенных функциях, исключениях и других часто используемых стандартных модулях.»*

Во втором сообщении должен быть прикреплен [архив](../files//karmaniy_spravochnik_po_piton.zip)

## Сделать рассылку

При нажатии на эту кнопку пользователь может отправить всем ранее написавшим пользователям сообщение.

Бот должен написать:

*«Вы выбрали рассылку всем пользователям. Вы уверены, что хотите это сделать?»*

и прикрепить кнопки «Уверен» и «Отмена»

При нажатии на кнопку «Отмена» диалог должен завершиться.

При нажатии на кнопку «Уверен» бот присылает сообщение:

*«Введите сообщение, которое хотите отправить всем пользователям.»*

Ожидается ввод текста пользователем.
Это сообщение нужно разослать всем пользователям.
После успешной рассылки нужно пользователю прислать подтверждение об этом.
