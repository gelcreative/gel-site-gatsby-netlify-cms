import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import { kebabCase } from 'lodash'
import Layout from '../../components/Layout'

const BlogSection = styled.section`
  flex-wrap: wrap;
  &.gel-blog-container-outer {
    margin-top: 150px;
  }

  .column:first-of-type {
    height: 640px;
  }

  .column {
    height: 420px;
    justify-content: stretch;
  }

  .column:nth-child(odd) .gel-blog-item-inner {
    background-color: ${props => props.theme.typeGrey};
    transition: 300ms;
  }

  .column:nth-child(odd) .gel-blog-item-inner:hover {
    background-color: ${props => props.theme.blue};
  }

  .column:nth-child(even) .gel-blog-item-inner {
    background-color: ${props => props.theme.lightGrey};
    transition: 300ms;
  }

  .column:nth-child(even) .gel-blog-item-inner:hover {
    background-color: ${props => props.theme.orange};
  }

  .gel-blog-item-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 30px 3%;
  }

  .gel-blog-item-inner a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    text-decoration: none;
  }

  h2 {
    font-family: "futura-pt";
    color: #ffffff;
    text-align: center;
    text-decoration: none;
  }
`

const BlogPage = ({data}) => {
  
  const { edges: posts } = data.allMarkdownRemark

  let columnClass = ""
  let columnCounter = 1
  
  return (
    <Layout>
      <div className="container">
        <BlogSection className="columns gel-blog-container-outer">
          <h1 className="visually-hidden">Gel's Blog</h1>
            {posts.map(edge => {

              if(columnCounter > 5) {
                columnCounter = 1
              }

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

              columnCounter++

              return (
                <article className={"column" + columnClass } key={edge.node.id}>
                  <div className="gel-blog-item-inner">
                    <Link to={edge.node.fields.slug}>
                      <h2>{edge.node.frontmatter.title}</h2>
                    </Link>
                  </div>
                </article>
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
