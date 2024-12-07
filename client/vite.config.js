import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

//! THERE IS A MAJOR PROXY ISSUE

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/register': {
                target: 'http://localhost:4000', // backend server
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/register/, '/register')
            }
        }
    }
});