import React from 'react'
import PropTypes from 'prop-types'
import { IndexPageTemplate } from '../../templates/index-page'

const IndexPagePreview = ({ entry }) => {
  return (
    <IndexPageTemplate
      title={entry.getIn(['data','title'])}
      services={{services}}
      intro={entry.getIn(['data','intro'])}
      featuredPortfolioTitle={entry.getIn(['data','featuredPortfolioTitle'])}
      clientListTitle={entry.getIn(['data','clientListTitle'])}
    />
  )
}

IndexPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  })
}

export default IndexPagePreview
