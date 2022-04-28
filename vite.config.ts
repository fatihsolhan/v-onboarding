import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import { defineConfig } from 'vite'
import pkg from "./package.json";
import typescript from '@rollup/plugin-typescript'

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];
export default defineConfig({
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
  }
})
