// vite.config.js (ESM)
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api/swiggy/list': {
        target: 'https://www.swiggy.com',
        changeOrigin: true,
        rewrite: p => p.replace(/^\/api\/swiggy\/list/, '/dapi/restaurants/list/v5'),
        cookieDomainRewrite: { '.swiggy.com': 'localhost', 'swiggy.com': 'localhost' },
        configure(proxy) {
          proxy.on('proxyRes', (res) => {
            const sc = res.headers['set-cookie'];
            if (sc) {
              res.headers['set-cookie'] = sc.map(c =>
                  c.replace(/Domain=\.?swiggy\.com/ig, 'Domain=localhost')
                      .replace(/SameSite=None/ig, 'SameSite=Lax')
              );
            }
          });
        },
      },
    },
  },
});
