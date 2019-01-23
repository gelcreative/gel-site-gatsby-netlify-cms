import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import PortfolioGrid from '../components/PortfolioGrid'

const StyledPortfolioPage = styled.article`
  &.container {
    margin-top: 50px;
  }
  .gel-portfolio-intro {
    font-size: 2rem;
  }
`

export const PortfolioPageTemplate = ({
  title,
  portfolioIntro
}) => {
  return (
      <StyledPortfolioPage className="container">
        <section className="section columns is-centered">
          <div className="column has-text-centered is-10 is-offset-1">
            <h1 className="visually-hidden">{title}</h1>
            <p className="gel-portfolio-intro">{portfolioIntro}</p>
          </div>
        </section>
        <section className="section">
          <PortfolioGrid />
        </section>
      </StyledPortfolioPage>
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