# TripMate

Веб-приложение для планирования маршрутов по Казахстану на React и Vite. Интерфейс доступен на казахском, русском и английском.

## Запуск в PowerShell

Используйте Node.js 24 LTS и откройте папку с `package.json`.

```powershell
npm ci
npm run dev
```

Откройте адрес, который Vite выведет в терминале. Для проверки проекта доступны `npm run lint`, `npm run build` и `npm run preview`.

## ИИ-помощник и донаты

Скопируйте шаблон настроек и откройте копию в VS Code.

```powershell
Copy-Item .env.example .env.local
code .env.local
```

- `OPENAI_API_KEY` — ключ OpenAI API. Он используется сервером по адресу `/api/assistant`. Храните его только в локальных настройках или в секретах сервера.
- `OPENAI_MODEL` — модель с поддержкой Structured Outputs. По умолчанию `gpt-4o-mini`.
- `VITE_DONATION_ALERTS_URL` — публичная ссылка на страницу донатов вида `https://www.donationalerts.com/r/имя-профиля`. Скопируйте её из настроек публичной страницы DonationAlerts. При заполненной ссылке кнопка «Поддержать TripMate» появится в футере и на странице «О нас». Для собранной версии запустите `npm run build` заново.

После изменения настроек перезапустите Vite. Откройте «Планировщик» → «ИИ-помощник TripMate» и вставьте пример запроса. После генерации кнопка «Добавить в мой маршрут» внесёт остановки из плана по порядку, пропуская дубликаты. Группировка по дням отображается в рекомендации, а «Мой маршрут» хранит последовательность остановок.

Обычный каталог, планировщик и карта работают без ключа. Сервер ИИ доступен при локальном запуске через `npm run dev` или `npm run preview`. Для публикации потребуется развернуть `/api/assistant` на Node.js вместе с приложением и настроить доступ и лимиты API. Статическая папка `dist` содержит только клиентское приложение.
# TripMate Mobile

## Project Overview

TripMate Mobile is an intelligent mobile application
for planning tourist routes with multilingual support.

The application aims to help travelers discover
destinations in Kazakhstan and create personalized
travel itineraries based on their preferences.

## Key Features (Planned)

- Multilingual interface: Kazakh, Russian, English
- Discover tourist destinations
- Personalized route recommendations
- Intelligent route planning
- Interactive maps
- Travel budget and duration preferences
- Save and manage travel itineraries

## Proposed Technology Stack

- Mobile: React Native
- Backend: Node.js + Express.js
- Database: PostgreSQL
- Maps: Google Maps API
- Intelligent Module: Recommendation algorithms

## Project Status

Planning and design stage.

## Academic Project

Graduation thesis project.

Topic:
Development of an Intelligent Mobile Application
for Tourist Route Planning with Multilingual Support.
 9c286b3ec3b66a37d9508a9fd29b818c226810b9
