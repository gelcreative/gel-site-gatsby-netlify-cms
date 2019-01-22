import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../../components/Layout'

const BlogSection = styled.section`
  display: flex;
  flex-wrap: wrap;
`

const BlogPage = ({data}) => {
  
  const { edges: posts } = data.allMarkdownRemark
  
  return (
    <Layout>
      <div className="container">
        <BlogSection className="columns gel-blog-container-outer">
          <h1 className="visually-hidden">Gel's Blog</h1>
            {posts.map((edge, i) => {
              let columnClass
              if((i + 1) < 4 && (i + 1) % 2 === 0) {
                columnClass = " is-one-third"
              } else if((i + 1) % 3 === 0) {
                columnClass = " is-two-thirds"
              } else if((i + 1) % 4 === 0) {
                columnClass = " is-two-thirds"
              }  else if((i + 1) % 5 === 0) {
                columnClass = " is-one-third"
              } else {
                columnClass = " is-full"
              }
              return (
                <div className={"column" + columnClass } key={edge.node.id}>{edge.node.frontmatter.title}</div>
              )
            })}
        </BlogSection>
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
