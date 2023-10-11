/** @type {import('vite').UserConfig} */

import { defineConfig, loadEnv, PluginOption } from 'vite'
import react from '@vitejs/plugin-react-swc'
import legacy from '@vitejs/plugin-legacy'
import path from 'path'

const dirname = new URL('.', import.meta.url).pathname
const resolve = (dir: string) => path.join(dirname, dir)

const getPulgins = (command, appEnv) => {
  const plugins: PluginOption[] = [
    react(),
  ]
  if (appEnv === '"prod"' && command === 'build') {
    plugins.push(
      legacy({
        targets: ['defaults', 'IE 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      })
    )
  }
  return plugins
}

// https://vitejs.dev/config/
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const APP_ENV = JSON.stringify(env.VITE_APP_ENV)

  const baseConfig = {
    define: {
      'process.env.APP_ENV': APP_ENV,
    },
    resolve: {
      alias: {
        '@': resolve('./src'),
      },
    },
    plugins: getPulgins(command, APP_ENV),
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modules: true,
        },
      },
    },
    build: {
      target: 'es2015',
      cssTarget: 'chrome61',
      rollupOptions: {
        output: {
          manualChunks: {
            'react-vender': [
              'react',
              'react-dom',
              'react-router-dom',
              'regenerator-runtime',
            ],
            'util-vender': ['lodash-es', 'axios'],
            'lib-vender': ['tea-component', 'moment'],
          },
        },
      },
    },
  }
  return {
    ...baseConfig,
  }
})
