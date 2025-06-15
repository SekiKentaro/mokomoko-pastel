import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Vite に React プラグインを読み込ませるだけの設定
export default defineConfig({
  base: '/mokomoko-pastel/',
  plugins: [react()],
  resolve: {
    dedupe: ['three']
  }
});