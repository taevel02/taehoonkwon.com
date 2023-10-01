import * as React from 'react'

interface PageProps {
  children: React.ReactNode
}

const Content: React.FC<PageProps> = ({ children }) => {
  return <div className="p-0 text-black font-light text-base">{children}</div>
}

export default Content
