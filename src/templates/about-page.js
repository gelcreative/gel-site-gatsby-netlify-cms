import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/Layout';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';
import markdownToHtml from '../util/markdownToHtml';

const StyledAboutPage = styled.article`
  margin-top: 200px;

  .gel-about-intro-section {
    padding: 0 0 200px;
  }

  .gel-about-intro-text {
    color: ${props => props.theme.orange};
    font-weight: 700;
    /* font-style: italic; */
  }

  #gel-approach-section {
    margin-bottom: 100px;
  }

  #gel-bio-section {
    margin-bottom: 100px;
  }

  .gel-bio-row:nth-last-child(2) {
    margin-bottom: 10rem !important;
  }

  .gel-bio-text {
    display: flex;
    align-items: center;
  }

  .gel-about-intro-text {
    font-size: 2.5rem;
  }

  .gel-approach-section p {
    font-size: 2rem;
  }

  .gel-about-intro-section-text-container,
  .gel-approach-section-text {
    max-width: 1000px;
    width: 95%;
    margin: 0 auto;
  }

  .gel-approach-section-text > p {
    margin-bottom: 1em;
  }

  @media (max-width: 450px) {
    margin-top: 80px;
    .gel-about-intro-text {
      font-size: 1.8rem;
    }
    .gel-approach-section p {
      font-size: 1.8rem;
    }
  }

  @media (min-width: 769px) {
    .gel-bio-text .section {
      padding: 3rem 10%;
    }
  }
`;

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
      {helmet || ''}
      <div className="container">
        <section className="columns is-centered gel-about-intro-section gel-full-height-vert-align">
          <div className="column">
            <div className="gel-about-intro-section-text-container">
              <h1 className="visually-hidden">{title}</h1>
              <p className="gel-about-intro-text">{intro}</p>
            </div>
          </div>
        </section>
        <section id="gel-bio-section">
          <div className="columns gel-bio-row">
            <div className="column">
              <PreviewCompatibleImage imageInfo={main.tom.image1} />
            </div>
            <div className="column gel-bio-text">
              <div className="section">
                <h2>Meet Tom</h2>
                <p>{main.tom.tom_bio}</p>
              </div>
            </div>
          </div>
          <div className="columns gel-bio-row">
            <div className="column gel-bio-text push">
              <div className="section">
                <h2>Meet Shannon</h2>
                <p>{main.shannon.shannon_bio}</p>
              </div>
            </div>
            <div className="column pull">
              <PreviewCompatibleImage imageInfo={main.shannon.image2} />
            </div>
          </div>
          <div className="columns is-centered portfolio-link-row">
            <div className="column has-text-centered">
              <Link
                to="/portfolio/"
                className="button gel-button-1 gel-button-bigger is-dark is-large"
              >
                View our work
              </Link>
            </div>
          </div>
        </section>
        <section
          className="columns is-centered gel-approach-section content"
          id="gel-approach-section"
        >
          <div className="column">
            <div className="section">
              <h2 className="has-text-centered">{approach.heading}</h2>
              <div
                className="gel-approach-section-text"
                dangerouslySetInnerHTML={{
                  __html: markdownToHtml(approach.text),
                }}
              />
            </div>
          </div>
        </section>
      </div>
    </StyledAboutPage>
  );
};

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
};

const AboutPage = ({ data }) => {
  const { frontmatter, id } = data.markdownRemark;

  return (
    <Layout>
      <AboutPageTemplate
        id={id}
        title={frontmatter.title}
        intro={frontmatter.about_intro}
        main={frontmatter.main}
        approach={frontmatter.approach}
        helmet={
          <Helmet titleTemplate="%s | Gel Marketing">
            <title>{`${frontmatter.title}`}</title>
            <meta name="description" content={`${frontmatter.about_intro}`} />
          </Helmet>
        }
      />
    </Layout>
  );
};

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AboutPage;

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
                    ...GatsbyImageSharpFluid_tracedSVG
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
                    ...GatsbyImageSharpFluid_tracedSVG
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
`;
