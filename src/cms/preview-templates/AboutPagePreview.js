import React from 'react'
import PropTypes from 'prop-types'
import { AboutPageTemplate } from '../../templates/about-page'

const AboutPagePreview = ({ entry, getAsset }) => {

  return (
    <AboutPageTemplate
      title={entry.getIn(['data', 'title'])}
      intro={entry.getIn(['data', 'about_intro'])}
      main={{
        tom: {
          image1: {
            image: getAsset(entry.getIn(['data', 'main', 'tom', 'image1', 'image'])),
            alt: entry.getIn(['data', 'main', 'tom', 'image1', 'alt']),
          },
          tom_bio: entry.getIn(['data','main', 'tom', 'tom_bio']),
        },
        shannon: {
          image2: {
            image: getAsset(entry.getIn(['data', 'main', 'shannon', 'image2', 'image'])),
            alt: entry.getIn(['data', 'main', 'shannon', 'image1', 'alt']),
          },
          shannon_bio: entry.getIn(['data','main', 'shannon', 'shannon_bio']),
        }
      }}
      approach={{
        heading: entry.getIn(['data', 'approach', 'heading']),
        text: entry.getIn(['data', 'approach', 'text']),
      }}
    />
  )
}

AboutPagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
}

export default AboutPagePreview
