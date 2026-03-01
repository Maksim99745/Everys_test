# Каталог товаров

SPA-приложение для поиска и просмотра товаров. Стек: React 18, TypeScript, SCSS.

## FSD (Feature-Sliced Design)

Проект организован по слоям FSD — импорты только сверху вниз, чтобы не было циклических зависимостей:

| Слой | Назначение |
|------|------------|
| `app` | Инициализация, глобальные стили, layout |
| `pages` | Страницы приложения |
| `widgets` | Композитные блоки (Header, Footer) |
| `features` | Пользовательские сценарии (поиск, пагинация) |
| `entities` | Бизнес-сущности (товар, таблица) |
| `shared` | Переиспользуемое (ui, api, lib, config) |

## Запуск

```bash
npm install
npm run dev
```

Открой [http://localhost:5173](http://localhost:5173)

## Скрипты

- `npm run dev` — разработка
- `npm run build` — сборка
- `npm run preview` — превью production-сборки
- `npm run test` — тесты
- `npm run lint` — проверка кода

## Настройки (Development и Production)

Конфигурация в `src/shared/config/env.ts`. Приложение использует разные настройки для Development и Production сред:

| Параметр        | Development | Production |
|-----------------|-------------|------------|
| `apiTimeout`    | 20 с        | 15 с       |
| `apiRetryCount` | 3           | 2          |

Таймаут API в dev увеличен для отладки. Повторов при сбое больше в dev (нестабильный API). Определение среды через `import.meta.env.DEV` (Vite).

