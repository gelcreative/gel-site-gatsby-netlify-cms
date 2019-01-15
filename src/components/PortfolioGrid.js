import React from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
import { kebabCase } from 'lodash'
import styled from 'styled-components'

const StyledPortfolioGrid = styled.section`
  .gel-portfolio-grid-item {
    min-height: 700px;
  }

  .gel-portfolio-grid-item-inner {
    position: relative;
    height: 100%;
    width: 100%;
    vertical-align: middle;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .gel-portfolio-grid-item-colour-image {
    opacity: 0;
    transition: opacity 300ms;
  }

  .gel-portfolio-grid-item:hover .gel-portfolio-grid-item-colour-image {
    opacity: 1;
  }

  .gel-portfolio-grid-item-inner .gel-portfolio-grid-item-colour-image,
  .gel-portfolio-grid-item-inner a {
    display: inline-block;
    height: 100%;
    width: 100%;
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    text-align: center;
    vertical-align: middle;
  }

  .column.is-half.gel-portfolio-grid-item div {
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
  }

  .gel-portfolio-grid-item-inner a {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .gel-portfolio-item-text-container {
    background-color: rgba(255, 255, 255, 0.9);
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: 300ms ease-in-out;
    opacity: 0;
  }

  .gel-portfolio-grid-item:hover .gel-portfolio-item-text-container {
    width: 70%;
    height: 70%;
    border-radius: 50%;
    opacity: 1;
  }

  .gel-portfolio-grid-item-inner a {
    text-decoration: none;
  }

  .gel-portfolio-grid-item-inner a p {
    font-size: 3rem;
  }
`

const PortfolioGrid = ({ data }) => {
  const edges = data.allMarkdownRemark.edges
  return (
    <StyledPortfolioGrid>
      <div className="gel-portfolio-grid columns">
        {edges.map(edge => {
          return (
            <div key={edge.node.id} className="column is-half gel-portfolio-grid-item">
              <div className="gel-portfolio-grid-item-inner" style={{backgroundImage: `url(${edge.node.frontmatter.bw_grid_image.childImageSharp ? edge.node.frontmatter.bw_grid_image.childImageSharp.fluid.src : edge.node.frontmatter.bw_grid_image})`}}>
                <div className="gel-portfolio-grid-item-colour-image" style={{backgroundImage: `url(${edge.node.frontmatter.colour_grid_image.childImageSharp ? edge.node.frontmatter.colour_grid_image.childImageSharp.fluid.src : edge.node.frontmatter.colour_grid_image})`}}></div>
                <Link to={`/portfolio-entries/${kebabCase(edge.node.frontmatter.title)}`}>
                  <div className="gel-portfolio-item-text-container">
                    <p>{edge.node.frontmatter.project_type} for <br />{edge.node.frontmatter.title}</p>
                  </div>
                </Link>
              </div>
            </div>
          )
        })}
      </div>
    </StyledPortfolioGrid>
  )
}

PortfolioGrid.propTypes = {
  data: PropTypes.object,
}

export default props => (
  <StaticQuery
    query={portfolioGridQuery}
    render={data=> <PortfolioGrid data={data} {...props} />}
  />
)

export const portfolioGridQuery = graphql`
  query PortfolioGrid {
    allMarkdownRemark (filter: {frontmatter: {templateKey: {eq: "portfolio-entry"}}}) {
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
          bw_grid_image {
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
}
`;