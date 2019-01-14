import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PortfolioGrid from '../components/PortfolioGrid'

export const PortfolioPageTemplate = ({
  title
}) => {
  return (
    <main role="main">
      <div className="container">
        <section className="section">
          <h1>{title}</h1>
        </section>
      </div>
    </main>
  )
}

PortfolioPageTemplate.propTypes = {
  title: PropTypes.string.isRequired
}

const PortfolioPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout>
      <PortfolioPageTemplate
        title={frontmatter.title}
      />
    </Layout>
  )
}

PortfolioPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default PortfolioPage

export const portfolioPageQuery = graphql`
  query PortfolioPage($id: String!) {
    markdownRemark(id: {eq: $id}) {
      frontmatter {
        title
      }
    }
  }
`;