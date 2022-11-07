import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import BreadcrumbComponent from '../components/common/breadcrumb'
import FileExplorerComponent from '../components/common/file-explorer'
import { getFolder } from '../lib/api'

interface Props {
  records: any[]
}

const Home: NextPage<Props> = ({ records }) => {
  return (
    <>
      <Head>
        <title>Home</title>
      </Head>

      <main className="p-2 container mx-auto">
        <BreadcrumbComponent paths={[]} />
        <FileExplorerComponent records={records} pathArr={[]} />
      </main>
    </>
  )
}

export default Home
export const getStaticProps: GetStaticProps = async () => {
  const data = await getFolder()
  return {
    props: {
      records: data && data.status === 1 ? data.data : [],
      pathArr: data && data.status === 1 ? data.meta.paths : [],
    },
  }
}
