import { NextPage } from 'next'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import BreadcrumbComponent from '../components/common/breadcrumb'

interface Props {
  params: any
}

const WatchPage: NextPage<Props> = () => {
  const router = useRouter()
  const [videoUrl, setVideoUrl] = useState<string>('')

  useEffect(() => {
    if (router.query && router.query.v) {
      setVideoUrl(router.query.v as string)
    }
  }, [router.query])

  return (
    <>
      <Head>
        <title>File</title>
      </Head>

      <main className="p-2 container mx-auto">
        <BreadcrumbComponent paths={[]} />
        {videoUrl && (
          <video controls>
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        )}
      </main>
    </>
  )
}

export default WatchPage
