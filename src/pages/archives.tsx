import * as React from 'react'
import { PageProps } from 'gatsby'
import Content from '../components/content'
import Layout from '../components/layout'
import Title from '../components/title'

const ArchivesPage: React.FC<PageProps> = ({ data, path }) => {
  // const { edges } = data.allMarkdownRemark

  return (
    <Layout>
      <Title title="Archives" />
      <Content>
        {/* <ul className="list-none">
          {edges.map(({ node }) => (
            <li className="my-4" key={node.id}>
              <Link to={node.fields.slug} className="text-black">
                {node.frontmatter.title}
              </Link>
            </li>
          ))}
        </ul> */}
      </Content>
    </Layout>
  )
}

export default ArchivesPage
