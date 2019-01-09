import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export const PortfolioPageTemplate = ({}) => {
  return (
    <section className="section">
      <h1>Portfolio Page</h1>
    </section>
  )
}

PortfolioPageTemplate.PropTypes = {}

const PortfolioPage = ({ data }) => {
  return (
    <Layout>
      <PortfolioPageTemplate />
    </Layout>
  )
}

PortfolioPage.PropTypes = {}

export default PortfolioPage