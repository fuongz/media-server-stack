import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'
import { blurDataUrl } from '../../lib/image'

interface Props {
  file: any
  pathArr: string[]
}

interface OtherFileProps {
  file: any
}

interface PhotoProps {
  file: any
}

const OtherFileComponent: FC<OtherFileProps> = ({ file }) => {
  return (
    <Link href={file.file}>
      <a className="px-4 py-2 text-zinc-400 rounded-md border border-zinc-700 hover:bg-zinc-800 hover:transition transition overflow-hidden text-ellipsis">{file.name}</a>
    </Link>
  )
}

const PhotoComponent: FC<PhotoProps> = ({ file }) => {
  return (
    <div className="relative overflow-hidden" key={file}>
      <a href={file.file} rel="noreferrer nofollow">
        <Image src={file.file} placeholder="blur" blurDataURL={`data:image/svg+xml;base64,${blurDataUrl(300, 300)}`} alt={file.name} width={300} height={300} objectFit="cover" objectPosition="top" />
      </a>
    </div>
  )
}

const FileComponent: FC<Props> = ({ file }) => {
  return (
    <>
      {file ? (
        <>
          {file.is_photo ? <PhotoComponent file={file} /> : <></>} {!file.is_photo ? <OtherFileComponent file={file} /> : <></>}
        </>
      ) : (
        <></>
      )}
    </>
  )
}

export default FileComponent
