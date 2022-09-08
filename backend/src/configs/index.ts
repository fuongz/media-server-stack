'use strict'

import path from 'path'

require('dotenv').config()

const excludesFilesDefault = ['.DS_Store', '._app.js', '._.DS_Store']
const excludesFilesStartsWithDefault = ['._', '.']

const getEnv = (key: string, defaultValue: any = null, type = 'string') => {
  let value: any = process.env[key] || defaultValue

  if (type === 'boolean') {
    if (typeof value === 'string') {
      return value === 'true'
    }

    if (isNaN(value)) {
      return parseInt(value, 10) === 1
    }
  }

  return type === 'json' ? JSON.parse(value) : value
}

const baseUrl = getEnv('BASE_URL') ? getEnv('BASE_URL') : 'http://localhost:3001'

export default {
  environment: getEnv('ENVIRONMENT', 'development'),
  debug: getEnv('DEBUG', false, 'boolean'),
  rootDir: getEnv('ROOT_FOLDER') ? path.join(getEnv('ROOT_FOLDER')) : path.join(__dirname, 'public'),
  baseUrl: baseUrl,
  port: getEnv('PORT', 3001, 'number'),
  corsWhitelist: getEnv('CORS_WHITELIST', [], 'json') || [],
  excludesFiles: getEnv('EXCLUDE_FILES', excludesFilesDefault, 'json'),
  excludesFilesStartsWith: getEnv('EXCLUDE_FILES_STARTS_WITH', excludesFilesStartsWithDefault, 'json'),
  certFolder: getEnv('CERT_FOLDER', null),
}
