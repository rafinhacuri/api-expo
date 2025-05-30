import 'dotenv/config'
import { defineNitroConfig } from 'nitropack/config'
import process from 'node:process'

const { MONGO_URL, MONGO_USERNAME, MONGO_PASSWORD, MONGO_DB_NAME } = process.env

export default defineNitroConfig({
  srcDir: 'server',
  compatibilityDate: '2025-05-17',
  runtimeConfig: {
    MONGO_URL,
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_DB_NAME,
  },
})
