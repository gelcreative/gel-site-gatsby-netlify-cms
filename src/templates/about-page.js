import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import ScrollyDo from '../components/ScrollyDo'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const FullHeightSection = styled.section`
  min-height: 100vh;
  padding-bottom: 200px;
  .column {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .gel-about-intro-section-text-container {
    width: 1000px;
    max-width: 90%;
    margin: 0 auto;
  }
  .gel-about-intro-text {
    font-size: 2.5rem;
  }
  .gel-approach-section h2 {
    font-size: 2.5rem;
  }
  .gel-approach-section p {
    font-size: 2rem;
  }
`

export const AboutPageTemplate = ({
  id,
  title,
  intro, 
  main,
  approach,
}) => {

  return (
    <section className="section section--gradient">
      <div className="container">
        <FullHeightSection className="columns is-centered gel-about-intro-section">
          <div className="column has-text-centered">
            <div className="gel-about-intro-section-text-container">
              <h1 className="visually-hidden">{title}</h1>
              <p className="gel-about-intro-text">{intro}</p>
            </div>
          </div>
        </FullHeightSection>
        <ScrollyDo targetId="gel-bio-section" fullHeight={true} />
        <FullHeightSection id="gel-bio-section">
          <div className="columns gel-bio-row">
            <div className="column">
              <PreviewCompatibleImage imageInfo={main.tom.image1} />
            </div>
            <div className="column">
              <div className="section">
                <p>{main.tom.tom_bio}</p>
              </div>
            </div>
          </div>
          <div className="columns gel-bio-row">
            <div className="column">
              <div className="section">
                <p>{main.shannon.shannon_bio}</p>
              </div>
            </div>
            <div className="column">
              <PreviewCompatibleImage imageInfo={main.shannon.image2} />
            </div>
          </div>
        </FullHeightSection>
        <ScrollyDo targetId="gel-approach-section"/>
        <FullHeightSection className="columns is-centered gel-approach-section" id="gel-approach-section">
          <div className="column has-text-centered">
            <div className="section">
              <h2>{approach.heading}</h2>
              <p>{approach.text}</p>
            </div>
          </div>
        </FullHeightSection>
      </div>
    </section>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  about_intro: PropTypes.string,
  main: PropTypes.shape({
    tom: PropTypes.shape({
      image1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      tom_bio: PropTypes.string,
    }),
    shannon: PropTypes.shape({
      image2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      shannon_bio: PropTypes.string,
    }),
    approach: PropTypes.shape({
      heading: PropTypes.string,
      text: PropTypes.string,
    }),
  }),
}

const AboutPage = ({ data }) => {
  const { frontmatter, id } = data.markdownRemark

  return (
    <Layout>
      <AboutPageTemplate
        id={id}
        title={frontmatter.title}
        intro={frontmatter.about_intro}
        main={frontmatter.main}
        approach={frontmatter.approach}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        about_intro
        main {
          tom {
            image1 {
              image {
                childImageSharp {
                  fluid(maxWidth: 600, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              alt
            }
            tom_bio
          }
          shannon {
            image2 {
              image {
                childImageSharp {
                  fluid(maxWidth: 600, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              alt
            }
            shannon_bio
          }
        }
        approach {
          heading
          text
        }
      }
    }
  }
`
