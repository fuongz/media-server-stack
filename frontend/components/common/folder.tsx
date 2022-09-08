import Link from 'next/link'
import { FC } from 'react'

interface Props {
  folder: any
  pathArr: string[]
}

const FolderComponent: FC<Props> = ({ folder, pathArr }) => {
  const prefixPath = pathArr && pathArr.length > 0 ? pathArr.join('/') : null
  return (
    <>
      {folder ? (
        <Link href={`/f${prefixPath ? `/${prefixPath}` : ''}/${folder.slug}`}>
          <a className="text-zinc-400 px-4 border py-2 border-zinc-700 rounded-md bg-zinc-800 cursor-pointer hover:text-zinc-200 hover:bg-zinc-700 transition hover:transition">{folder.name}</a>
        </Link>
      ) : (
        <></>
      )}
    </>
  )
}

export default FolderComponent
