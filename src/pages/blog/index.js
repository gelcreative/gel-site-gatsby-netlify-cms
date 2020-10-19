import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../../components/Layout'

import SearchForm from '../../components/SearchForm'

const BlogHeader = styled.header`
  margin-top: 200px;

  h1 {
    flex-basis: 100%;

    color: ${props => props.theme.typeGrey};
    font-size: 5.4rem;
    font-weight: lighter;
  }
`

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
      height: 500px;
    }
  }

  @media print,screen and (max-width:768px) {
    .column {
      height: 300px;
    }
  }

  @media print,screen and (max-width:600px) {
    .column {
      height: 200px;
    }
  }

  @media print,screen and (max-width:400px) {
    .column {
      height: 150px;
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
        <BlogHeader>
          <h1>Our Blog</h1>
          <SearchForm />
        </BlogHeader>
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
//<h2>{edge.node.frontmatter.title}</h2>

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
