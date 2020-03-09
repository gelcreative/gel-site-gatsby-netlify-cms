import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../../components/Layout'

const BlogSection = styled.section`
  flex-wrap: wrap;
  &.gel-blog-container-outer {
    margin-top: 150px;
    article {
      overflow: hidden;
    }
  }

  .column {
    justify-content: stretch;
  }

  @media print,screen and (min-width:769px) {
    .column:first-of-type {
      height: 640px;
    }

    .column {
      height: 420px;
    }
  }

  .column:nth-child(odd) .gel-blog-item-inner {
    background-color: ${props => props.theme.typeGrey};
  }

  .column:nth-child(odd) .gel-blog-item-inner:hover {
    background-color: ${props => props.theme.blue};
  }

  .column:nth-child(even) .gel-blog-item-inner {
    background-color: ${props => props.theme.lightGrey};
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
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: 300ms;
  }

  .gel-blog-item-inner a {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    text-decoration: none;
  }

  .gel-blog-item-inner {
    position: relative;
  }

  .gel-blog-item-inner:hover {
    transform: scale(1.1);
  }

  .gel-blog-item-inner::before {
      content: '';
      display: inline-block;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      background-color: rgba(28,29,37,.3);
      z-index: 1;
      transition: 300ms ease-in-out;
  }

  .gel-blog-item-inner > a {
      position: relative;
      z-index: 2;
  }

  h2 {
    font-family: ${props => props.theme.regularFont};
    font-size: 3rem;
    color: #ffffff;
    text-align: center;
    text-decoration: none;
  }
`

const BlogPage = ({data}) => {
  
  const { edges: posts } = data.allMarkdownRemark
  
  return (
    <Layout>
      <div className="container">
        <BlogSection className="columns gel-blog-container-outer">
          <h1 className="visually-hidden">Gel's Blog</h1>
            {posts.map(edge => {

              return (
                <article className="column is-full" key={edge.node.id}>
                  <div 
                    className="gel-blog-item-inner" 
                    style={{
                      backgroundImage: `url(${
                        edge.node.frontmatter.featured_image.image.childImageSharp
                          ? edge.node.frontmatter.featured_image.image.childImageSharp.fluid.src
                          : edge.node.frontmatter.featured_image.image
                      })`,
                  }}>
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
            featured_image {
              alt
              image {
                childImageSharp {
                  fluid(maxWidth: 1920, quality: 100) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
          }
        }
      }
    }
  }
`
