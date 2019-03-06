import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { kebabCase } from 'lodash'
import styled from 'styled-components'
import PreviewCompatibleImage from './PreviewCompatibleImage';

const StyledPortfolioGrid = styled.section`
  .gel-portfolio-grid {
    flex-wrap: wrap;
  }

  .gel-portfolio-grid-item {
    position: relative;
  }

  .gel-portfolio-grid-item .gatsby-image-wrapper:nth-of-type(2) {
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
  }

  .gel-portfolio-item-text-container p {
    color: ${props => props.theme.orange};
    font-size: 3rem;
    text-align: center;
    line-height: 1.2;
    width: 80%;
  }

  @media (min-width: 769px) {
    .gel-portfolio-grid-item:hover .gatsby-image-wrapper:nth-of-type(2) {
        opacity: 0;
    }
  }

  @media (max-width: 768px) {
    .gel-portfolio-grid-item .gatsby-image-wrapper:nth-of-type(2) {
        opacity: 1;
    }
    .gel-portfolio-grid-item .gel-portfolio-item-text-container {
      width: 90%;
      height: 90%;
      border-radius: 50%;
      opacity: 1;
    }
  }
`

const PortfolioGrid = () => (
  <StaticQuery
    query={graphql`
      query {
        mainPortfolioQuery: allMarkdownRemark (filter: {frontmatter: {templateKey: {eq: "portfolio-entry"}}}) {
          edges {
            node {
              id
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
        grayscaleGridImageQuery: allMarkdownRemark (filter: {frontmatter: {templateKey: {eq: "portfolio-entry"}}}) {
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
      return (
        <StyledPortfolioGrid>
          <div className="gel-portfolio-grid columns is-gapless">
            {portfolioEntries.map((portfolioEntry, i) => {
              return (
                <div key={portfolioEntry.node.id} className="column is-half gel-portfolio-grid-item">
                  <PreviewCompatibleImage imageInfo={(grayscaleGridImages[i].node.frontmatter.colour_grid_image ? grayscaleGridImages[i].node.frontmatter.colour_grid_image : defaults[0].node)} />
                  <PreviewCompatibleImage imageInfo={(portfolioEntry.node.frontmatter.colour_grid_image ? portfolioEntry.node.frontmatter.colour_grid_image : defaults[1].node)} />
                  <Link to={`/portfolio-entries/${kebabCase(portfolioEntry.node.frontmatter.title)}`}>
                    <div className="gel-portfolio-item-text-container">
                      <p>{portfolioEntry.node.frontmatter.project_type} for <br /><span>{portfolioEntry.node.frontmatter.title}</span></p>
                    </div>
                  </Link>
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
