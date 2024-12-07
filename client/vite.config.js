import { defineConfig } from 'vite';

export default defineConfig({
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