import typescript from '@rollup/plugin-typescript';
import vue from '@vitejs/plugin-vue';
import * as path from 'path';
import { defineConfig } from 'vite';
import pkg from "./package.json";

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
  'focus-trap'
];
export default defineConfig({
  test: {
    globals: true,
    environment: 'happy-dom',
  },
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'v-onboarding',
      fileName: (format) => `v-onboarding.${format}.js`
    },
    rollupOptions: {
      input: 'src/index.ts',
      external: external,
      plugins: [
        typescript({
          exclude: ["playground/**/*"]
        })
      ],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
})
