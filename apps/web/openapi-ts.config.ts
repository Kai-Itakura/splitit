import { defineConfig } from '@hey-api/openapi-ts';
import { API_URL } from './app/constants/api-url';

export default defineConfig({
  input: `${API_URL}/api-json`,
  output: 'app/api-client',
  plugins: [
    {
      name: '@hey-api/client-next',
      runtimeConfigPath: './app/hey-api.ts',
    },
  ],
});
