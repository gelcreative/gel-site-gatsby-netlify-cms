import React from 'react'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../../components/Layout'

import Search from '../../components/Search'

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
      height: 500px;
      padding: 2rem;
      justify-content: stretch;
    }

    @media print,screen and (max-width:1216px) {
      .column {
        height: 400px;
      }
    }

    @media print,screen and (max-width:1024px) {
      .column {
        height: 300px;
      }
    }

    @media print,screen and (max-width:768px) {
      .column {
        height: 500px;
      }
    }

    @media print,screen and (max-width:600px) {
      .column {
        height: 400px;
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

const BlogPage = ({data, location}) => {

  const { edges: posts } = data.allMarkdownRemark
  var searchPrefill = ""
  if (typeof location.state != "undefined") {
    searchPrefill = location.state.search;
  }

  /* Function to automatically fill in the search box for the user
  function tagSearch(term) {
    let searchForm = document.querySelector("#blog-search > input");
    searchForm.value = term;
    // (the search form is set to search on input and on focus,
    //  so this will perform the search after filling in the field)
    searchForm.focus();
  }*/

  return (
    <Layout pageType="blog">
      <div className="container">
        <BlogHeader>
          <h1>Marketing Blog</h1>
       {/*<ul id="tags-filter">
            <li><a onClick={tagSearch.bind(this, "Branding")} >Branding</a></li>
            <li><a onClick={tagSearch.bind(this, "Marketing")}>Marketing</a></li>
            <li><a onClick={tagSearch.bind(this, "Strategy")} >Strategy</a></li>
            <li><a onClick={tagSearch.bind(this, "Design")}   >Design</a></li>
            <li><a onClick={tagSearch.bind(this, "Business")} >Business</a></li>
          </ul>*/}
        </BlogHeader>
        <BlogSection>
          {/* Blog section for searches */}
          <Search searchIndex={data.siteSearchIndex.index} id="blog-search" prefill={searchPrefill} />
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
    siteSearchIndex {
      index
    }
  }
`
