import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/register': {
                target: 'http://localhost:4000', // backend server
                changeOrigin: true,
                secure: false
            }
        }
    }
});