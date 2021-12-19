import typescript from '@rollup/plugin-typescript'
import { defineConfig } from 'rollup'
import vue from 'rollup-plugin-vue'
export default defineConfig({
  input: 'src/index.ts',
  plugins: [
    vue(),
    typescript({
      exclude: ["playground/**/*"]
    })
  ],
  external: ['vue']
})