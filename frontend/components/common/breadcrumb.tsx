import styles from './../../styles/Breadcrumb.module.css'
import { FC } from 'react'
import Link from 'next/link'

interface Props {
  paths: string[]
}

const BreadcrumbComponent: FC<Props> = ({ paths }) => {
  const buildPath = (paths: string[], endAt: number = 0) => {
    let path = ''
    const pathArray = paths.slice(0, endAt + 1)
    path = pathArray.join('/')
    return path && path !== '/' ? `/f/${path}` : '/'
  }

  return (
    <ul className="flex w-full flex-gap mt-4 border-b border-zinc-800 pb-4">
      <li className={styles['item']}>
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>

      {paths ? (
        paths.map((path, index: number) => (
          <li key={path} className={styles['item']}>
            <Link href={buildPath(paths, index)}>
              <a>{path}</a>
            </Link>
          </li>
        ))
      ) : (
        <></>
      )}
    </ul>
  )
}

export default BreadcrumbComponent
