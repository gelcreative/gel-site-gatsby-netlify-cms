import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'

const StyledPortfolioGrid = styled.section`
  .gel-portfolio-grid {
    flex-wrap: wrap;
  }

  .gel-portfolio-grid-item {
    position: relative;
  }

  .column:first-of-type {
    height: 640px;
  }

  .column {
    height: 420px;
    justify-content: stretch;
  }

  .gel-portfolio-item-inner {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    padding: 30px 3%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    transition: 300ms;
    overflow: hidden;
  }

  .gel-portfolio-item-image {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100%;
    width: 100%;
    padding: 30px 3%;
    background: center no-repeat;
    background-size: cover;
  }

  .column:nth-child(odd) .gel-portfolio-item-image {
    background-color: ${props => props.theme.typeGrey};
  }

  .column:nth-child(odd) .gel-portfolio-item-image:hover {
    background-color: ${props => props.theme.blue};
  }

  .column:nth-child(even) .gel-portfolio-item-image {
    background-color: ${props => props.theme.lightGrey};
  }

  .column:nth-child(even) .gel-portfolio-item-image:hover {
    background-color: ${props => props.theme.orange};
  }

  .gel-portfolio-grid-gel-portfolio-item-image:nth-of-type(2) {
      position: absolute !important;
      left: 0;
      right: 0;
      top: 0;
      transition: 300ms;
      opacity: 1;
  }

  .gel-portfolio-grid-item a {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }

  .gel-portfolio-item-text-container {
    background-color: rgba(28,29,37,.7);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 300ms;
    width: 100%;
    height: 100%;
    opacity: 1;
    padding: 15px;
  }

  .gel-portfolio-item-text-container span {
    font-size: 1.1em;
    font-weight: 700;
    color: #ffffff;
    transition: 300ms ease-in-out;
  }

  .gel-portfolio-item-text-container p {
    color: ${props => props.theme.orange};
    font-size: 3rem;
    text-align: center;
    line-height: 1.2;
    width: 80%;
    transition: 300ms ease-in-out;
  }

  .gel-portfolio-grid-item .gel-portfolio-item-colour-image {
      opacity: 1;
  }

  .gel-portfolio-grid-item:hover .gel-portfolio-item-colour-image {
      opacity: 0;
  }

  .gel-portfolio-grid-item:hover .gel-portfolio-item-text-container {
    transform: scale(1.1);
    p, span {
      color: #ffc857;
    }
  }
`

const PortfolioGrid = () => (
  <StaticQuery
    query={graphql`
      query {
        mainPortfolioQuery: allMarkdownRemark (
            filter: {frontmatter: {templateKey: {eq: "portfolio-entry"}}}, 
            sort: {order: DESC, fields: [frontmatter___date]}
          ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                project_type
                colour_grid_image {
                  childImageSharp {
                    fluid(maxWidth: 900, quality: 100) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        }
        grayscaleGridImageQuery: allMarkdownRemark (
            filter: {frontmatter: {templateKey: {eq: "portfolio-entry"}}}, 
            sort: {order: DESC, fields: [frontmatter___date]}
          ) {
          edges {
            node {
              frontmatter {
                colour_grid_image {
                  childImageSharp {
                    fluid(maxWidth: 900, quality: 100, grayscale: true) {
                      ...GatsbyImageSharpFluid
                    }
                  }
                }
              }
            }
          }
        } 
        allFile(filter: {name: {regex: "/gel-logo-circle/"}}) {
          edges {
            node {
              childImageSharp {
                fluid(maxWidth: 900, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }`
    }
    render={data=> {
      const { edges: portfolioEntries } = data.mainPortfolioQuery
      const { edges: grayscaleGridImages } = data.grayscaleGridImageQuery
      const defaults = data.allFile.edges

      let columnClass = ""
      let columnCounter = 1

      return (
        <StyledPortfolioGrid>
          <div className="gel-portfolio-grid columns">
            {portfolioEntries.map((portfolioEntry, i) => {

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
                <div key={portfolioEntry.node.id} className={`column gel-portfolio-grid-item${columnClass}`}>
                  <div className="gel-portfolio-item-inner">
                    <div 
                      className="gel-portfolio-item-grayscale-image gel-portfolio-item-image" 
                      style={{
                        backgroundImage: `url(${
                          grayscaleGridImages[i].node.frontmatter.colour_grid_image.childImageSharp
                            ? grayscaleGridImages[i].node.frontmatter.colour_grid_image.childImageSharp.fluid.src
                            : defaults[0].node
                        })`,
                    }}></div>
                    <div 
                      className="gel-portfolio-item-colour-image gel-portfolio-item-image" 
                      style={{
                        backgroundImage: `url(${
                          portfolioEntry.node.frontmatter.colour_grid_image.childImageSharp
                            ? portfolioEntry.node.frontmatter.colour_grid_image.childImageSharp.fluid.src
                            : defaults[1].node
                        })`,
                    }}></div>
                    <Link to={portfolioEntry.node.fields.slug}>
                      <div className="gel-portfolio-item-text-container">
                        <p>{portfolioEntry.node.frontmatter.project_type} <span className="visually-hidden">for </span><br /><span>{portfolioEntry.node.frontmatter.title}</span></p>
                      </div>
                    </Link>
                  </div>
                </div>
              )
            })}
          </div>
        </StyledPortfolioGrid>
      )
    }}
  />
)

export default PortfolioGrid
