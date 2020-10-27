module.exports = {
  siteMetadata: {
    title: 'Gel Agency',
    description: 'Full-service marketing agency specializing in strategy, branding, website design, digital advertising, and communications. Strategists, designers, and developers fuelled by creative intelligence.',
  },
  plugins: [
    'gatsby-plugin-react-helmet',
    'gatsby-plugin-sass',
    {
      resolve: 'gatsby-plugin-react-svg',
      options: {
        rule: {
          include: `${__dirname}/src/img`
        },
      },
    },
    {
      // keep as first gatsby-source-filesystem plugin for gatsby image support
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/static/img`,
        name: 'uploads',
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
        ignore: [`**/trash_bin/**`]
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/img`,
        name: 'images',
      },
    },
    'gatsby-plugin-sharp',
    'gatsby-transformer-sharp',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        path: `${__dirname}/src/client-logos`,
        name: 'clientLogos',
      }
    },
    {
      resolve: 'gatsby-plugin-google-analytics',
      options: {
        trackingId: 'UA-66785701-1',
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-relative-images',
            options: {
              name: 'uploads',
            },
          },
          {
            resolve: 'gatsby-remark-images',
            options: {
              // It's important to specify the maxWidth (in pixels) of
              // the content container as this plugin uses this as the
              // base for generating different widths of each image.
              maxWidth: 2048,
            },
          },
          {
            resolve: 'gatsby-remark-copy-linked-files',
            options: {
              destinationDir: 'static',
            }
          }
        ],
      },
    },
    {
      resolve: `@gatsby-contrib/gatsby-plugin-elasticlunr-search`,
      options: {
        // Fields to index
        fields: [`title`, `tags`],
        // How to resolve each field`s value for a supported node type
        resolvers: {
          // For any node of type MarkdownRemark, list how to resolve the fields` values
          MarkdownRemark: {
            id: node => node.id,
            title: node => node.frontmatter.title,
            tags: node => node.frontmatter.tags,
            image: node => node.frontmatter.thumbnail_image,
            path: node => node.fields.slug,
          },
        },
        // Optional filter to limit indexed nodes
        // (Only get blog post nodes)
        filter: (node, getNode) => node.frontmatter.templateKey == "blog-post",
      },
    },
    {
      resolve: `gatsby-source-instagram`,
      options: {
        username: `1532385372`,
      },
    },
    {
      resolve: 'gatsby-plugin-netlify-cms',
      options: {
        modulePath: `${__dirname}/src/cms/cms.js`,
      },
    },
    'gatsby-plugin-styled-components',
    'gatsby-plugin-purgecss', // must be after other CSS plugins
    'gatsby-plugin-react-leaflet',
    'gatsby-plugin-netlify', // make sure to keep it last in the array
  ],
}
