'use strict'

import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
const serveStatic = require('serve-static')
const { getAllFolders } = require('./utils/file')
import configs from './configs'
import { connect, getConfigs, disconnect, selectMedia, insertMedia, selectMediaByParentId } from './configs/database'

// App
const app = express()

// Middleware
app.use(
  cors((req: any, callback: any) => {
    let corsOptions = {}
    if (configs.corsWhitelist.indexOf(req.header('Origin')) !== -1) {
      corsOptions = { origin: true }
    } else {
      corsOptions = { origin: false }
    }
    callback(null, corsOptions)
  })
)
if (configs.environment === 'production') {
  app.use(helmet())
}
app.use('/_files', serveStatic(configs.rootDir))

// Routes
app.get('/api/v1/configs', (_req: any, res: any) => {
  try {
    connect((err: any) => {
      if (err) {
        throw Error(err)
      }
      getConfigs((err: any, rows: any) => {
        if (err) {
          throw Error(err)
        }
        disconnect((err: any) => {
          if (err) {
            throw Error(err)
          }
        })
        return res.send(rows)
      })
    })
  } catch (err: any) {
    res.status(500).json({ status: 0, message: err.message })
  }
})

app.get('/api/v1/fetch', (req: any, res: any) => {
  const { slugs } = req.query

  try {
    const folders = getAllFolders(slugs ? slugs.split(',') : [])

    connect((err: any) => {
      for (let i = 0; i < folders.length; i++) {
        selectMedia(folders[i].slug, (err: any, rows: any) => {
          if (rows.length === 0) {
            insertMedia(folders[i], (err: any) => {
              if (err) {
                console.log(err)
              }
            })
          }
        })
      }
    })

    return res.status(200).json({
      status: 1,
      meta: {
        paths: [],
      },
      data: folders,
    })
  } catch (err: any) {
    if (configs.debug === true) {
      return res.status(404).json({ status: 0, message: err.message })
    }
    return res.status(404).json({ status: 0, message: `Root folder not found!` })
  }
})

app.get('/api/v1/fetch/:path*', (req: any, res: any) => {
  const paths = req.path
  const pathArr = paths.split('/').filter((p: string) => p !== 'v1' && p !== 'api' && p !== 'fetch' && p !== '')
  try {
    const folders = getAllFolders(pathArr)

    connect((err: any) => {
      for (let i = 0; i < folders.length; i++) {
        selectMedia(pathArr[pathArr.length - 1], (err: any, rows: any) => {
          if (rows.length > 0) {
            selectMedia(folders[i].slug, (err: any, childs: any) => {
              if (childs.length === 0) {
                insertMedia(
                  {
                    ...folders[i],
                    parent_id: rows[0].id,
                  },
                  (err: any) => {
                    if (err) {
                      console.log(err)
                    }
                  }
                )
              }
            })
          }
        })
      }
    })

    return res.status(200).json({
      status: 1,
      meta: {
        paths: pathArr,
      },
      data: folders,
    })
  } catch (err: any) {
    if (configs.debug === true) {
      return res.status(404).json({ status: 0, message: err.message })
    }
    return res.status(404).json({ status: 0, message: `Path /${pathArr.join('/')} not found!` })
  }
})

// Start!
app.listen(process.env.PORT || 3001, () => {
  console.log('Server is running on ' + configs.baseUrl + ':' + configs.port)
  console.log('===')
  console.log(' + Whitelist', configs.corsWhitelist)
  console.log('===')
})
