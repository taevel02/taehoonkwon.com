import * as React from 'react'
import { Link, HeadFC, PageProps, withPrefix } from 'gatsby'
import Layout from '../components/layout'
import Title from '../components/title'
import Content from '../components/content'

const BioPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Title title="Bio" />
      <Content>
        <p className="leading-6 my-4">
          <a href="/bio/resume-example.pdf" target="_blank">
            pdf
          </a>
        </p>
        <p className="leading-6 my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi vero
          cupiditate modi deserunt consectetur! Natus ea facere deleniti quaerat
          ex modi, illo, aspernatur quia, reprehenderit necessitatibus officia.
          Commodi, magnam odio.
        </p>
        <p className="leading-6 my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi vero
          cupiditate modi deserunt consectetur! Natus ea facere deleniti quaerat
          ex modi, illo, aspernatur quia, reprehenderit necessitatibus officia.
          Commodi, magnam odio.
        </p>
        <p className="leading-6 my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi vero
          cupiditate modi deserunt consectetur! Natus ea facere deleniti quaerat
          ex modi, illo, aspernatur quia, reprehenderit necessitatibus officia.
          Commodi, magnam odio.
        </p>
        <p className="leading-6 my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi vero
          cupiditate modi deserunt consectetur! Natus ea facere deleniti quaerat
          ex modi, illo, aspernatur quia, reprehenderit necessitatibus officia.
          Commodi, magnam odio.
        </p>
        <p className="leading-6 my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi vero
          cupiditate modi deserunt consectetur! Natus ea facere deleniti quaerat
          ex modi, illo, aspernatur quia, reprehenderit necessitatibus officia.
          Commodi, magnam odio.
        </p>
        <p className="leading-6 my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi vero
          cupiditate modi deserunt consectetur! Natus ea facere deleniti quaerat
          ex modi, illo, aspernatur quia, reprehenderit necessitatibus officia.
          Commodi, magnam odio.
        </p>
        <p className="leading-6 my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi vero
          cupiditate modi deserunt consectetur! Natus ea facere deleniti quaerat
          ex modi, illo, aspernatur quia, reprehenderit necessitatibus officia.
          Commodi, magnam odio.
        </p>
      </Content>
    </Layout>
  )
}

export default BioPage

export const Head: HeadFC = () => <title>Bio - 권태훈 (Taehoon Kwon)</title>
