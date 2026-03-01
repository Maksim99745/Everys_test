const isDev = import.meta.env.DEV;

export const config = {
  apiUrl: 'http://fakestock.everys.com/api',
  apiUsername: 'candidate',
  apiPassword: 'candidate321',
  /** Таймаут запроса: больше в dev для отладки */
  apiTimeout: isDev ? 20000 : 15000,
  /** Повторы при сбое: больше в dev для нестабильного API */
  apiRetryCount: isDev ? 3 : 2,
} as const;
