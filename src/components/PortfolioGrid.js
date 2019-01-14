import React from 'react'
import PropTypes from 'prop-types'
import { Link, StaticQuery, graphql } from 'gatsby'
import { kebabCase } from 'lodash'
import PreviewCompatbleImage from '../components/PreviewCompatibleImage'

const PortfolioGrid = ({ data }) => {
  const edges = data.allMarkdownRemark.edges
  return (
    <div className="gel-portfolio-grid">
      {edges.map(edge => (
        <ul>
          <li>Title: {edge.node.frontmatter.title}</li>
          <li>Link: <Link to={`/portfolio/${kebabCase(edge.node.frontmatter.title)}`}>{edge.node.frontmatter.title}</Link></li>
        </ul>
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
    query={pageQuery}
    render={data=> <PortfolioGrid data={data} {...props} />}
  />
)

export const pageQuery = graphql`
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