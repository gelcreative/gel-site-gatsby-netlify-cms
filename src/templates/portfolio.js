import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PortfolioGrid from '../components/PortfolioGrid'

export const PortfolioPageTemplate = ({
  title,
  portfolioIntro
}) => {
  return (
    <main role="main">
      <div className="container">
        <section className="section">
          <h1 className="visually-hidden">{title}</h1>
          <p>{portfolioIntro}</p>
        </section>
        <section className="section">
          <PortfolioGrid />
        </section>
      </div>
    </main>
  )
}

PortfolioPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  portfolioIntro: PropTypes.string,
}

const PortfolioPage = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout>
      <PortfolioPageTemplate
        title={frontmatter.title}
        portfolioIntro={frontmatter.portfolio_intro}
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
        portfolio_intro
      }
    }
  }
`;