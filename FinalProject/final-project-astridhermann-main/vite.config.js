import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslint from 'vite-plugin-eslint';
import jsconfigPaths from 'vite-jsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint(), jsconfigPaths()],
})
