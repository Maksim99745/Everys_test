export interface EnvConfig {
  apiUrl: string;
  apiUsername: string;
  apiPassword: string;
  isDevelopment: boolean;
}

const isDevelopment = import.meta.env.MODE === 'development';

export const config: EnvConfig = {
  apiUrl: import.meta.env.VITE_API_URL || 'http://fakestock.everys.com/api',
  apiUsername: import.meta.env.VITE_API_USERNAME || 'candidate',
  apiPassword: import.meta.env.VITE_API_PASSWORD || 'candidate321',
  isDevelopment,
};
