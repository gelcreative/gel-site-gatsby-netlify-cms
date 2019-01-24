import CMS from 'netlify-cms'

import AboutPagePreview from './preview-templates/AboutPagePreview'
import BlogPostPreview from './preview-templates/BlogPostPreview'
import PortfolioEntryPreview from './preview-templates/PortfolioEntryPreview'

CMS.registerPreviewTemplate('about-page', AboutPagePreview)
CMS.registerPreviewTemplate('blog', BlogPostPreview)
CMS.registerPreviewTemplate('portfolio-entry', PortfolioEntryPreview)
