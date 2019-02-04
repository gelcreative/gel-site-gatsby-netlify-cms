import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import PortfolioEntryImages from '../components/PortfolioEntryImages'

const StyledPortfolioEntry = styled.div`
    .gel-portfolio-entry-masthead {
      max-width: 600px;
      margin: 0 auto;
    }
    .gel-portfolio-entry-main-text {
      display: flex;
      justify-content: center;
      align-items: center
    }
`

export const PortfolioEntryTemplate = ({
  title,
  headerImage,
  projectIntro,
  projectImages1,
  main,
  projectImages2,
  helmet,
}) => {
  return (
      <StyledPortfolioEntry className="container">
        { helmet || '' }
        <section className="section gel-portfolio-entry-masthead">
          <div className="columns is-centered">
            <div className="column has-text-centered">
              <h1 className="visually-hidden">{title}</h1>
              <PreviewCompatibleImage imageInfo={headerImage} />
            </div>
          </div>
        </section>
        <section className="section has-text-centered">
          <p>{projectIntro}</p>
        </section>
        <section className="section gel-portfolio-images-1">
          <PortfolioEntryImages portfolioImages={projectImages1} />
        </section>
        <section className="section gel-portfolio-entry-main">
          <div className="columns">
            <div className="column gel-portfolio-entry-main-text">
              <p>{main.detail_text}</p>
            </div>
            <div className="column">
              <PreviewCompatibleImage imageInfo={main} />
            </div>
          </div>
        </section>
        <section className="section gel-portfolio-images-2">
          <PortfolioEntryImages portfolioImages={projectImages2} />
        </section>
      </StyledPortfolioEntry>
  )
}

PortfolioEntryTemplate.propTypes = {
  title: PropTypes.string,
  headerImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  projectIntro: PropTypes.string,
  projectImages1: PropTypes.array,
  main: PropTypes.shape({
    detail_text: PropTypes.string,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string])
  }),
  projectImages2: PropTypes.array,
}

const PortfolioEntry = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout>
      <PortfolioEntryTemplate
        title={frontmatter.title}
        headerImage={frontmatter.header_image}
        projectIntro={frontmatter.project_intro}
        projectImages1={frontmatter.project_images_1}
        main={frontmatter.main}
        projectImages2={frontmatter.project_images_2}
        helmet={
          <Helmet
            titleTemplate="%s | Gel Marketing"
          >
            <title>{`${frontmatter.title}`}</title>
            <meta name="description" content={`${frontmatter.project_intro}`} />
          </Helmet>
        }
      />
    </Layout>
  )
}

PortfolioEntry.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  })
}

export default PortfolioEntry

export const pageQuery = graphql`
  query PortfolioEntryByID($id: String!) {
    markdownRemark(id: {eq: $id}) {
    id
    frontmatter {
      title
      header_image {
        image {
          childImageSharp {
            fluid (maxWidth: 500, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
        alt
      }
      project_intro
      project_images_1 {
        image {
          id
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
          id
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