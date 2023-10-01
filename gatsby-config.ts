import type { GatsbyConfig } from 'gatsby'
import metaConfig from './gatsby-meta-config'

const config: GatsbyConfig = {
  siteMetadata: metaConfig,
  plugins: [
    {
      resolve: 'gatsby-plugin-manifest',
      options: {
        name: metaConfig.title,
        short_name: metaConfig.title,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `${__dirname}/static/favicon.svg`,
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'archives',
        path: `${__dirname}/content/archives`,
      },
    },
    'gatsby-plugin-postcss',
    'gatsby-plugin-sitemap',
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
  ],
}

export default config
