import React, { createElement } from 'react'
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

  ul {
    text-align: center;
    
    li {
      display: inline-block;
      margin: 20px 10px;

      a {
        padding: 2px 20px;
        background: ${props => props.theme.orange};
        border-radius: 6px;

        color: ${props => props.theme.white};
        text-transform: uppercase;

        font-size: 2.4rem;
        font-weight: bold;

        :hover {
          text-decoration: none;
          background: ${props => props.theme.darkOrange};
        }
      }
    }
  }
`

const BlogSection = styled.section`
  form section { padding-bottom: 0px; }
  form.active section { padding-bottom: 30px; }

  section {
    flex-wrap: wrap;

    .gel-blog-container-outer {

      article {
        overflow: hidden;
      }
    }
    
    .column {
      justify-content: stretch;
    }

    @media print,screen and (min-width:769px) {

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
      font-size: 0;
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
  }

  form.active + section { display: none; }
`

const BlogPage = ({data}) => {

  const { edges: posts } = data.allMarkdownRemark

  // Get tags list for the tag filter
  function tagsLoop() {
    var tagsList = [];
    
    posts.map((edge) => {  
      for (let i = 0; i < edge.node.frontmatter.tags.length; i++) {
        if (tagsList.findIndex(obj => obj.props.children === edge.node.frontmatter.tags[i]) === -1) {
          tagsList.push(createElement("li", { key: edge.node.frontmatter.tags[i] }, edge.node.frontmatter.tags[i]));
        }
      }
    })

    return createElement("ul", "", tagsList);
  }

  }

  return (
    <Layout pageType="blog">
      <div className="container">
        <BlogHeader>
          <h1>Our Blog</h1>
        </BlogHeader>
        <BlogSection>
          {/* Blog section for all posts (only one will be visible at a time) */}
          <section id="blog-posts-all" className="blog-section columns gel-blog-container-outer">
            {posts.map((edge, index) => {
              
              var columnClass = "is-half";
              if (index > 1) { columnClass = "is-one-third"; }

              return (
                <article className={"column " + columnClass} key={edge.node.id}>
                  <div 
                    className="gel-blog-item-inner" 
                    style={{
                      backgroundImage: `url(${
                        edge.node.frontmatter.thumbnail_image.image.childImageSharp
                          ? edge.node.frontmatter.thumbnail_image.image.childImageSharp.fluid.src
                          : edge.node.frontmatter.thumbnail_image.image
                      })`,
                  }}>
                    <Link to={edge.node.fields.slug}>
                      
                    </Link>
                  </div>
                </article>
              )

            })}
          </section>
        </BlogSection>
      </div>
    </Layout>
  );
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
            thumbnail_image {
              alt
              image {
                childImageSharp {
                  fluid(maxWidth: 1920, quality: 100) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
            tags
          }
        }
      }
    }
  }
`
