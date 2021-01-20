import React from 'react'
import PropTypes from 'prop-types'
import { BlogPostTemplate } from '../../templates/blog-post'

const BlogPostPreview = ({ entry, widgetFor, getAsset }) => (
  <BlogPostTemplate
    content={widgetFor('body')}
    description={entry.getIn(['data', 'description'])}
    tags={entry.getIn(['data', 'tags'])}
    title={entry.getIn(['data', 'title'])}
    author={entry.getIn(['data', 'author'])}
    authorPic={{
      image: getAsset(entry.getIn(['data', 'authorPic', 'image'])),
      alt: entry.getIn(['data', 'authorPic', 'alt']),
    }}
    bannerImage={{
      image: getAsset(entry.getIn(['data', 'banner_image', 'image'])),
      alt: entry.getIn(['data', 'banner_image', 'alt']),
    }}
  />
)

BlogPostPreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  widgetFor: PropTypes.func,
}

export default BlogPostPreview
