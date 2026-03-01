# Каталог товаров

SPA для поиска и просмотра товаров. React 18, TypeScript, FSD, SCSS.

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

