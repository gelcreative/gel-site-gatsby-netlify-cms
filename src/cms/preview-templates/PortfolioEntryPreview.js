import React from 'react'
import PropTypes from 'prop-types'
import { PortfolioEntryTemplate } from '../../templates/portfolio-entry'

const PortfolioEntryPreview = ({ entry }) => {
  const entryProjectImages1 = entry.getIn(['data', 'project_images_1'])
  const projectImages1 = entryProjectImages1 ? entryProjectImages1.toJS() : []

  const entryProjectImages2 = entry.getIn(['data', 'project_images_2'])
  const projectImages2 = entryProjectImages2 ? entryProjectImages2.toJS() : []

  return (
    <PortfolioEntryTemplate
      title={entry.getIn(['data', 'title'])}
      headerImage={{
        image: entry.getIn(['data', 'header_image', 'image']),
        alt: entry.getIn(['data', 'header_image', 'alt'])
      }}
      projectIntro={entry.getIn(['data', 'project_intro'])}
      projectImages1={projectImages1}
      main={{
        detail_text: entry.getIn(['data','main','detail_text']),
        image: entry.getIn(['data', 'main', 'image']),
      }}
      projectImages2={projectImages2}
    />
  )
}

PortfolioEntryPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func
  }),
  getAsset: PropTypes.func,
}

export default PortfolioEntryPreview