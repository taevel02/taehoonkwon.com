import * as React from 'react'
import { Link, HeadFC, PageProps } from 'gatsby'
import Layout from '../components/layout'

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <div>
        <h1 className="font-normal text-3xl">404 Not Found</h1>
      </div>
    </Layout>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
