import React from 'react'
import PropTypes from 'prop-types'
import { PortfolioPageTemplate } from '../../templates/portfolio'

const PortfolioPagePreview = ({ entry }) => {
  return (
    <PortfolioPageTemplate
      title={entry.getIn(['data', 'title'])}
      portfolioIntro={entry.getIn(['data', 'portfolio_intro'])}
    />
  )
}

PortfolioPagePreview.propType = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  })
}

export default PortfolioPagePreview
