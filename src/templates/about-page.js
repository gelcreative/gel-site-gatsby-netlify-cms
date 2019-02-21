import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import ScrollyDo from '../components/ScrollyDo'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

const StyledAboutPage = styled.article`
  .gel-services-list {
    font-size: 4rem;
    display: flex;
    flex-wrap: wrap;
  }

  .gel-services-list li {
      padding: 0 1em;
      position: relative;
  }

  .gel-services-list li:nth-child(-n+2)::after {
      content: '//';
      color: ${props => props.theme.orange};
      position: absolute;
      right: 0;
      transform: translateX(50%);
  }
`

const FullHeightSection = styled.section`
  min-height: 100vh;
  padding-bottom: 200px;

  &.gel-full-height-vert-align {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .gel-about-intro-text {
      font-size: 2.5rem;
  }

  &.gel-approach-section p {
    font-size: 2rem;
  }

  .gel-bio-text {
    display: flex;
    align-items: center;
  }

  .gel-about-intro-section-text-container {
    max-width: 1000px;
    width: 90%;
    margin: 0 auto;
  }

  @media (max-width: 450px) {
    .gel-about-intro-text {
      font-size: 1.5rem;
    }
    &.gel-approach-section p {
      font-size: 1.5rem;
    }
  }

  @media(min-width: 769px) {
    .gel-bio-text .section {
      padding: 3rem 10%;
    }
  }
`

export const AboutPageTemplate = ({
  id,
  title,
  intro, 
  main,
  approach,
  services,
  helmet,
}) => {

  return (
    <StyledAboutPage className="section section--gradient">
      { helmet || '' }
      <div className="container">
        <FullHeightSection className="columns is-centered gel-about-intro-section gel-full-height-vert-align">
          <div className="column has-text-centered">
            <div className="gel-about-intro-section-text-container">
              <h1 className="visually-hidden">{title}</h1>
              <p className="gel-about-intro-text">{intro}</p>
            </div>
          </div>
        </FullHeightSection>
        <ScrollyDo targetId="gel-bio-section" fullHeight={true} />
        <section id="gel-bio-section">
          <div className="columns gel-bio-row">
            <div className="column">
              <PreviewCompatibleImage imageInfo={main.tom.image1} />
            </div>
            <div className="column gel-bio-text">
              <div className="section">
                <p>{main.tom.tom_bio}</p>
              </div>
            </div>
          </div>
          <div className="columns gel-bio-row">
            <div className="column gel-bio-text">
              <div className="section">
                <p>{main.shannon.shannon_bio}</p>
              </div>
            </div>
            <div className="column">
              <PreviewCompatibleImage imageInfo={main.shannon.image2} />
            </div>
          </div>
        </section>
        <section className="columns is-centered gel-approach-section gel-full-height-vert-align" id="gel-approach-section">
          <div className="column has-text-centered">
            <div className="section">
              <h2>{approach.heading}</h2>
              <p>{approach.text}</p>
            </div>
            <div className="columns is-centered">
              <div className="column is-narrow has-text-centered">
                <ul className="gel-services-list">
                  {services.map(service => {
                    return (
                      <li>{service}</li>
                    )
                  })}
                </ul>
              </div>
            </div>
          </div>
        </section>
      </div>
    </StyledAboutPage>
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
        services={frontmatter.services}
        helmet={
          <Helmet 
            titleTemplate="%s | Gel Marketing"
          >
            <title>{`${frontmatter.title}`}</title>
            <meta name="description" content={`${frontmatter.about_intro}`} />
          </Helmet>
        }
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
        services
      }
    }
  }
`
