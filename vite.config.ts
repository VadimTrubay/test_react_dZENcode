import {defineConfig, loadEnv} from "vite";
import react from "@vitejs/plugin-react";
import tsconfigPaths from 'vite-tsconfig-paths';
import {join} from 'path';


// https://vitejs.dev/config/
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), '');
  return {
    define: {
      'process.env': env
    },
    plugins: [react(), tsconfigPaths()],
    test: {
      environment: 'jsdom',
      globals: true,
    },
    resolve: {
      alias: {
        '@': join(__dirname, 'src'),
      },
    },
    build: {
      sourcemap: true,
    },
    server: {
      host: '0.0.0.0',
      port: 5173
    }
  }
})