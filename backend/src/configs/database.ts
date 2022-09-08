const sqlite3 = require('sqlite3').verbose()
const path = require('path')

let db: any = undefined

export const connect = (callback: any) => {
  const filename = path.join(process.cwd(), 'database', 'db.sqlite3')
  db = new sqlite3.Database(filename, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err: any) => {
    if (err) {
      callback(err)
    } else {
      console.log(` + Connected to the database "${filename}"!`)
      callback()
    }
  })
}

export const disconnect = (callback: any) => {
  db.close((err: any) => {
    if (err) {
      callback(err)
    } else {
      console.log(' + Disconnected from the database!')
      callback()
    }
  })
}

export const getConfigs = (callback: any) => {
  db.all('SELECT * FROM configs', (err: any, rows: any) => {
    if (err) {
      callback(err)
    } else {
      console.log(` + Fetched ${rows.length} configs!`)
      callback(null, rows)
    }
  })
}
