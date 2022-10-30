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

export const selectMedia = (slug: string, callback: any) => {
  db.all(`SELECT * FROM media WHERE slug = ?`, [slug], (err: any, rows: any) => {
    if (err) {
      callback(err)
    } else {
      console.log(` + Fetched ${rows.length} media!`)
      callback(null, rows)
    }
  })
}

export const selectMediaByParentId = (slug: string, parentId: string, callback: any) => {
  db.all(`SELECT * FROM media WHERE slug = ? AND parent_id = ?`, [slug, parentId], (err: any, rows: any) => {
    if (err) {
      callback(err)
    } else {
      console.log(` + Fetched ${rows.length} media!`)
      callback(null, rows)
    }
  })
}

export const insertMedia = (media: any, callback: any) => {
  let type = ''
  if (media.is_folder) {
    type = 'folder'
  } else if (media.is_file) {
    type = 'file'
  } else if (media.is_video) {
    type = 'video'
  } else if (media.is_audio) {
    type = 'audio'
  } else if (media.is_photo) {
    type = 'image'
  }

  db.run('INSERT INTO media (parent_id, _id, name, slug, type, file_extension) VALUES (?, ?, ?, ?, ?, ?)', [media.parent_id, media._id, media.name, media.slug, type, media.extension], (err: any) => {
    if (err) {
      callback(err)
    } else {
      console.log(` + Inserted media "${media.slug}"!`)
      callback()
    }
  })
}
