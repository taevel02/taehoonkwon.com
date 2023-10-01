import * as React from 'react'
import { Link } from 'gatsby'

interface PageProps {
  children: React.ReactNode
}

const Layout: React.FC<PageProps> = ({ children }) => {
  return (
    <div className="h-full relative">
      <header className="relative text-sm border-b border-gray-300">
        <div className="max-w-3xl mx-auto">
          <div className="h-full relative">
            <div className="relative overflow-hidden">
              <nav className="py-5 px-4 block float-left -ml-6">
                <Link
                  to="/"
                  className="no-underline text-black float-left transition-opacity px-3 font-light"
                >
                  Home
                </Link>
                <Link
                  to="/bio"
                  className="no-underline text-black float-left transition-opacity px-3 font-light"
                >
                  Bio
                </Link>
                <Link
                  to="/archives"
                  className="no-underline text-black float-left transition-opacity px-3 font-light"
                >
                  Archives
                </Link>
              </nav>
            </div>
          </div>
        </div>
      </header>
      <section>
        <article className="max-w-3xl mx-auto my-12 border-b border-gray-300 text-justify">
          <div className="mb-4 overflow-hidden">{children}</div>
          <footer className="py-5" />
        </article>
      </section>
      <footer>
        <div className="max-w-3xl mx-auto py-12">
          <span className="block text-center text-sm font-light">
            &copy; 2023 Taehoon Kwon / Inspired by{' '}
            <Link
              target="_blank"
              to="https://jongwook.kim/"
              className="no-underline"
            >
              jongwook.kim
            </Link>
          </span>
        </div>
      </footer>
    </div>
  )
}

export default Layout
