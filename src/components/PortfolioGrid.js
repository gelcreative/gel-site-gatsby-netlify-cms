import React from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
import { kebabCase } from 'lodash'
import PreviewCompatbleImage from '../components/PreviewCompatibleImage'

const PortfolioGrid = ({ data }) => {
  const edges = data.allMarkdownRemark.edges
  const counter = 0;
  return (
    <div className="gel-portfolio-grid columns">
      {edges.map(edge => (
        <div className="column gel-portfolio-grid-item">
          <div className="gel-portfolio-grid-item-inner" style={{backgroundImage: `url(${edge.frontmatter.bw_grid_image})`}}>
            <Link to={`/portfolio/${kebabCase(edge.node.frontmatter.title)}`}>
              <p>{edge.node.frontmatter.title}</p>
            </Link>
          </div>
        </div>
      ))
      }
    </div>
  )

}

PortfolioGrid.PropTypes = {
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
        }
      }
    }
  }
}
`;