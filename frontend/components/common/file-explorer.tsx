import { FC, useMemo, useState } from 'react'
import FileComponent from './file'
import FolderComponent from './folder'

interface Props {
  records: any[]
  pathArr: string[]
}

const FileExlorerComponent: FC<Props> = ({ records, pathArr }) => {
  const [folders, setFolders] = useState<any[]>([])
  const [files, setFiles] = useState<any[]>([])

  useMemo(() => {
    if (records && records.length > 0) {
      setFolders(records.filter((record: any) => record.is_folder))
      setFiles(records.filter((record: any) => !record.is_folder))
    }
  }, [records])

  return (
    <>
      {records && records.length > 0 ? (
        <>
          {folders && folders.length > 0 ? (
            <>
              <h3 className="mb-3 mt-6 text-zinc-400">Folders</h3>
              <div className="grid grid-cols-1 md:grid-cols-6 gap-3">{folders ? folders.map((folder) => <FolderComponent key={folder._id} pathArr={pathArr} folder={folder} />) : <></>}</div>
            </>
          ) : (
            <></>
          )}

          {files && files.length > 0 ? (
            <>
              <h3 className="mb-3 mt-6 text-zinc-400">Files</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-3">{files ? files.map((file) => <FileComponent key={file._id} pathArr={pathArr} file={file} />) : <></>}</div>
            </>
          ) : (
            <></>
          )}
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default FileExlorerComponent
