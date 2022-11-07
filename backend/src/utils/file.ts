import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'
import { connect, selectMedia } from '../configs/database'
import configs from './../configs'

function getFolderSlugs(slugs = []) {
  return fs.readdirSync(path.join(configs.rootDir, ...slugs))
}

export const sync = () => {
  connect((err: any) => {
    let default_path = ''
    const rootDir = getFolderSlugs([]).filter((f) => !configs.excludesFiles.includes(f) && !configs.excludesFilesStartsWith.some((s: string) => f.startsWith(s)))

    for (let x = 0; x < rootDir.length; x++) {
      const slug = rootDir[x]
      const extension = path.extname(slug).toLowerCase()
      const fileName = path.basename(slug, extension)
      const isPhoto = ['.png', '.jpg', '.jpeg', '.svg'].includes(extension)
      const isVideo = ['.mp4', '.mov'].includes(extension)
      const isFile = extension !== ''
      const isFolder = !isFile
    }
  })
}

export const getAllFolders = (slugs = []) => {
  const folderSlugs = getFolderSlugs(slugs)
  return folderSlugs
    .filter((f) => !configs.excludesFiles.includes(f) && !configs.excludesFilesStartsWith.some((s: string) => f.startsWith(s)))
    .map((slug) => {
      const extension = path.extname(slug).toLowerCase()
      const fileName = path.basename(slug, extension)
      const isPhoto = ['.png', '.jpg', '.jpeg', '.svg'].includes(extension)
      const isVideo = ['.mp4', '.mov'].includes(extension)
      const isFile = extension !== ''
      const isFolder = !isFile
      return {
        _id: uuidv4(),
        slug,
        name: fileName,
        extension,
        is_file: isFile,
        is_folder: isFolder,
        is_photo: isPhoto,
        is_video: isVideo,
        file: isFile ? `${configs.baseUrl}/_files/${slugs.join('/')}${slugs.length > 0 ? '/' : ''}${slug}` : null,
        link: !isFile ? `${configs.baseUrl}/api/v1/fetch/${slugs.join('/')}${slugs.length > 0 ? '/' : ''}${slug}` : null,
      }
    })
}
