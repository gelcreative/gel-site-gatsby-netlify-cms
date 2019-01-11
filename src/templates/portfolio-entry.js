import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const PortfolioEntryTemplate = ({
  title,
  headerImage,
  projectIntro,
  projectImages1,
  main,
  projectImages2,
}) => {
  return (
    <main role="main">
      <div className="container">
        <section className="section">
          <h1 className="visually-hidden">{title}</h1>
          <PreviewCompatibleImage imageInfo={headerImage} />
          <p>{projectIntro}</p>
        </section>
        <section className="section gel-portfolio-images-1">
          {projectImages1.map(image => {
            return (
              <div key={image.text} className="gel-project-image-inner">
                <PreviewCompatibleImage imageInfo={image} />
              </div>
            )
          })}
        </section>
        <section className="section gel-portfolio-entry-main">
          <div className="columns">
            <div className="column">
              <p>{main.detail_text}</p>
            </div>
            <div className="column">
              <PreviewCompatibleImage imageInfo={main.image} />
            </div>
          </div>
        </section>
        <section className="section gel-portfolio-images-2">
          {projectImages2.map(image => {
            return (
              <div key={image.text} className="gel-project-image-inner">
                <PreviewCompatibleImage imageInfo={image} />
              </div>
            )
          })}
        </section>
      </div>
    </main>
  )
}

PortfolioEntryTemplate.propTypes = {}

const PortfolioEntry = ({ data }) => {
  const { frontmatter: portfolioEntry } = data.markdownRemark
  return (
    <Layout>
      <PortfolioPageTemplate
        title={portfolioEntry.title}
        headerImage={portfolioEntry.header_image}
        projectIntro={portfolioEntry.project_intro}
        projectImages1={portfolioEntry.project_images_1}
        main={portfolioEntry.main}
        projectImages2={portfolioEntry.project_images_2}
      />
    </Layout>
  )
}

PortfolioEntry.propTypes = {}

export default PortfolioEntry

// export const portfolioQuery = graphql`
//   query PortfolioEntryByID($id: String!) {
//     markdownRemark(id: {eq: $id}) {
//     id
//     }
//   }
// `;

export const portfolioEntryQuery = graphql`
  query PortfolioEntryByID($id: String!) {
    markdownRemark(id: {eq: $id}) {
    id
    frontmatter {
      title
      header_image {
        image {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        alt
      }
      project_intro
      project_images_1 {
        image {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      main {
        detail_text
        image {
          childImageSharp {
            fluid(maxWidth: 900, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
      project_images_2 {
        image {
          childImageSharp {
            fluid(maxWidth: 1920, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
  }
`;