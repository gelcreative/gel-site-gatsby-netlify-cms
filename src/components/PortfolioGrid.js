import React from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
import { kebabCase } from 'lodash'

const PortfolioGrid = ({ data }) => {
  const edges = data.allMarkdownRemark.edges
  return (
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