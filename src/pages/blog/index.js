import React from 'react'
import { graphql } from 'gatsby'
import Layout from '../../components/Layout'

const BlogPage = ({data}) => {
  const { edges: posts } = data.allMarkdownRemark
  
  return (
    <Layout>
      <div className="container">
        <section className="columns gel-blog-container-outer">
          <h1 className="visually-hidden">Gel's Blog</h1>
            {posts.map((edge, i) => {
              return (
                <div className={"column " + toString((i%2 == 0 && "dookie"))} key={edge.node.id}>{edge.node.frontmatter.title}</div>
              )
            })}
        </section>
      </div>
    </Layout>
  )
}

export default BlogPage

export const pageQuery = graphql`
  query BlogQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
