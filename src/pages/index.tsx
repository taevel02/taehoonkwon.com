import * as React from 'react'
import { Link, HeadFC, PageProps } from 'gatsby'
import Layout from '../components/layout'
import Title from '../components/title'

const IndexPage: React.FC<PageProps> = () => {
  return (
    <Layout>
      <Title title="권태훈 (Taehoon Kwon)" />
      <div className="p-0 text-black font-light text-base">
        <p className="leading-6 mt-8 mb-4 flex text-sm">
          <span className="flex items-center mr-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 480 512"
            >
              <path d="M186.1 328.7c0 20.9-10.9 55.1-36.7 55.1s-36.7-34.2-36.7-55.1 10.9-55.1 36.7-55.1 36.7 34.2 36.7 55.1zM480 278.2c0 31.9-3.2 65.7-17.5 95-37.9 76.6-142.1 74.8-216.7 74.8-75.8 0-186.2 2.7-225.6-74.8-14.6-29-20.2-63.1-20.2-95 0-41.9 13.9-81.5 41.5-113.6-5.2-15.8-7.7-32.4-7.7-48.8 0-21.5 4.9-32.3 14.6-51.8 45.3 0 74.3 9 108.8 36 29-6.9 58.8-10 88.7-10 27 0 54.2 2.9 80.4 9.2 34-26.7 63-35.2 107.8-35.2 9.8 19.5 14.6 30.3 14.6 51.8 0 16.4-2.6 32.7-7.7 48.2 27.5 32.4 39 72.3 39 114.2zm-64.3 50.5c0-43.9-26.7-82.6-73.5-82.6-18.9 0-37 3.4-56 6-14.9 2.3-29.8 3.2-45.1 3.2-15.2 0-30.1-.9-45.1-3.2-18.7-2.6-37-6-56-6-46.8 0-73.5 38.7-73.5 82.6 0 87.8 80.4 101.3 150.4 101.3h48.2c70.3 0 150.6-13.4 150.6-101.3zm-82.6-55.1c-25.8 0-36.7 34.2-36.7 55.1s10.9 55.1 36.7 55.1 36.7-34.2 36.7-55.1-10.9-55.1-36.7-55.1z" />
            </svg>
            <Link
              target="_blank"
              rel="noopener"
              to="https://github.com/taevel02"
              className="text-black no-underline pl-2"
            >
              taevel02
            </Link>
          </span>
          <span className="flex items-center mr-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M368.4 18.3L312.7 74.1 437.9 199.3l55.7-55.7c21.9-21.9 21.9-57.3 0-79.2L447.6 18.3c-21.9-21.9-57.3-21.9-79.2 0zM288 94.6l-9.2 2.8L134.7 140.6c-19.9 6-35.7 21.2-42.3 41L3.8 445.8c-3.8 11.3-1 23.9 7.3 32.4L164.7 324.7c-3-6.3-4.7-13.3-4.7-20.7c0-26.5 21.5-48 48-48s48 21.5 48 48s-21.5 48-48 48c-7.4 0-14.4-1.7-20.7-4.7L33.7 500.9c8.6 8.3 21.1 11.2 32.4 7.3l264.3-88.6c19.7-6.6 35-22.4 41-42.3l43.2-144.1 2.8-9.2L288 94.6z" />
            </svg>
            <Link
              target="_blank"
              rel="noopener"
              to="https://brunch.co.kr/@lifeisart"
              className="text-black no-underline pl-2"
            >
              lifeisart
            </Link>
          </span>
          <span className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="1em"
              viewBox="0 0 512 512"
            >
              <path d="M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" />
            </svg>
            <Link
              target="_blank"
              rel="noopener"
              to="mailto:taevel02@gmail.com"
              className="text-black no-underline pl-2"
            >
              taevel02@gmail.com
            </Link>
          </span>
        </p>
        <p className="leading-6 my-4">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ratione
          adipisci dolorum ab ipsam pariatur, autem impedit porro reiciendis
          blanditiis veniam fugiat ducimus. Qui in voluptate vero, odit amet
          possimus officia.
        </p>
        <p className="leading-6 my-4">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sequi
          pariatur amet dignissimos, animi quod recusandae totam natus,
          molestiae sed voluptate, inventore magni quaerat? Quae, omnis aperiam.
          Reprehenderit omnis eos itaque!
        </p>
        <p className="leading-6 my-4">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, excepturi
          quos adipisci accusamus fuga voluptates inventore eaque error iure quo
          modi? Iusto, laboriosam voluptates dolore aspernatur ea enim fugit
          voluptas?
        </p>
      </div>
    </Layout>
  )
}

export default IndexPage

export const Head: HeadFC = () => (
  <>
    <title>권태훈 (Taehoon Kwon)</title>
  </>
)
