import vue from '@vitejs/plugin-vue'
import * as path from 'path'
import { defineConfig } from 'vite'
import pkg from "./package.json";

import dtsPlugin from 'vite-plugin-dts'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'

const external = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {}),
];
export default defineConfig({
  plugins: [
    vue(),
    vueSetupExtend(),
    dtsPlugin({
      outputDir: 'dist/types',
      include: 'src',
      staticImport: true,
      insertTypesEntry: true,
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    }
  },
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      formats: ['es', 'cjs', 'umd'],
      name: 'v-onboarding',
      fileName: (format) => `v-onboarding.${format}.js`
    },
    rollupOptions: {
      external: external,
      output: {
        globals: {
          vue: 'Vue'
        },
        format: 'es',
      }
    }
  }
})
