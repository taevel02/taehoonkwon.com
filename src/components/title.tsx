import * as React from 'react'

interface PageProps {
  title: string
}

const Title: React.FC<PageProps> = ({ title }) => {
  return (
    <>
      <div>
        <h1 className="font-normal text-3xl" itemProp="name">
          {title}
        </h1>
      </div>
    </>
  )
}

export default Title
