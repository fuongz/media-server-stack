import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { useMemo, useState } from 'react'
import BreadcrumbComponent from '../../components/common/breadcrumb'
import FileExlorerComponent from '../../components/common/file-explorer'
import { getFolder } from './../../lib/api'

interface Props {
  records: any[]
  pathArr: any
}

const FileExlorer: NextPage<Props> = ({ records, pathArr }) => {
  const [paths, setPaths] = useState<string[]>([])

  useMemo(() => {
    if (records) {
      setPaths(pathArr)
    }
  }, [pathArr, records])

  return (
    <>
      <Head>
        <title>File</title>
      </Head>

      <main className="p-2 container mx-auto">
        <BreadcrumbComponent paths={paths} />
        <FileExlorerComponent records={records} pathArr={pathArr} />
      </main>
    </>
  )
}

export default FileExlorer
export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug: string[] = params?.slug && typeof params.slug !== 'string' ? params.slug : []
  const data = await getFolder(slug)
  return {
    props: {
      records: data && data.status === 1 ? data.data : [],
      pathArr: data && data.status === 1 ? data.meta.paths : [],
    },
  }
}

export const getStaticPaths: GetStaticPaths<{ slug: string[] }> = async (slug) => {
  return {
    paths: [],
    fallback: 'blocking',
  }
}
