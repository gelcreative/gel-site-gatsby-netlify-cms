import React from 'react'
import PropTypes from 'prop-types'
import PreviewCompatibleImage from './PreviewCompatibleImage'

const PortfolioEntryImages = ({portfolioImages}) => {
  console.log()
  if(typeof portfolioImages[0].image === 'string') {
      return (
        portfolioImages.map(image => (
          <div key={image.image.id} className="gel-project-image-inner">
            <PreviewCompatibleImage imageInfo={image}/>
          </div>
        ))
      )
  };
  return null;
}

PortfolioEntryImages.propTypes = {
  portfolioImages: PropTypes.arrayOf(
    PropTypes.shape({
      image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
    }),
  ),
}

export default PortfolioEntryImages;
