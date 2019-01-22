import React from 'react'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../../components/Layout'

const BlogSection = styled.section`
  display: flex;
  flex-wrap: wrap;

  .column {
    height: 200px;
  }

  .is-full {
      background: yellow;
  }

  .is-one-third {
      background: blue;
  }

  .is-two-thirds {
      background: red;
  }
`

const BlogPage = ({data}) => {
  
  const { edges: posts } = data.allMarkdownRemark

  let columnClass = ""
  let timesFive = 0
  let columnCounter = 1
  
  return (
    <Layout>
      <div className="container">
        <BlogSection className="columns gel-blog-container-outer">
          <h1 className="visually-hidden">Gel's Blog</h1>
            {posts.map((edge, i) => {

              if (columnCounter % 5  === 0) {
                timesFive++
              }

              if((i + 1) <= 5) {
                columnCounter = i + 1
              }

              if((i + 1) > 5) {
                columnCounter =  (i + 1) - (5 * timesFive)
              }
              
              // if ((i + 1) >= 10) {
              //   columnCounter = (i + 2) - (5 * timesFive)
              // }

              console.log(i, columnCounter, timesFive)

              switch(columnCounter) {
                case 1:
                  columnClass = " is-full"
                  break;
                case 2:
                  columnClass = " is-one-third"
                  break;
                case 3:
                  columnClass = " is-two-thirds"
                  break;
                case 4:
                  columnClass = " is-two-thirds"
                  break;
                case 5:
                  columnClass = " is-one-third"
                  break;
                default:
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