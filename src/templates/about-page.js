import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/Layout';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';
import Instagram from '../components/svg/Instagram';
import LinkedIn from '../components/svg/LinkedIn';

const StyledAboutPage = styled.article`
  margin-top: 200px;

  .gel-about-intro-section {
    color: ${props => props.theme.typeGrey};

    h1 {
      font-size: 5.4rem;
      font-weight: 300;
      color: ${props => props.theme.typeGrey};

      :after {
        content: "";
        display: block;
        width: 15%;
        height: 4px;
    
        margin: 20px auto 50px;
        background: ${props => props.theme.black};
      }
    }

    p.gel-about-intro-text {
      margin: 20px auto;
      font-size: 2.0rem;
    }
  }

  .gel-bio-row {
    margin-bottom: 10rem !important;

    &#tom     { background: ${props => props.theme.blue}; }
    &#shannon { background: ${props => props.theme.orange}; }

    &#tom .gatsby-image-wrapper { transform: scale(1.12); }

    .gel-bio-text {
      display: flex;
      align-items: center;
  
      color: ${props => props.theme.white};
  
      h2 {
        font-family: ${props => props.theme.secondaryFont};
        letter-spacing: 1px;
  
        span { text-shadow: 1px  1px  0px ${props => props.theme.white},
                            1px -1px  0px ${props => props.theme.white},
                            -1px 1px  0px ${props => props.theme.white},
                            -1px -1px 0px ${props => props.theme.white}; }
      }

      .gel-bio-content { max-width: 40rem; }
  
      a {
        color: ${props => props.theme.white};
        font-weight: normal;
      }
  
      .button.gel-button-2 { margin-top: 20px; }
    }
  }  

  #tom     .gel-bio-text h2 > span { color: ${props => props.theme.blue} }
  #shannon .gel-bio-text h2 > span { color: ${props => props.theme.orange} }

  #shannon .gel-bio-text .button.gel-button-2 {
    background: ${props => props.theme.typeGrey};
  
    :hover { background: ${props => props.theme.darkGrey} !important; }
  }

  .gel-about-intro-section-text-container {
    max-width: 1000px;
    width: 95%;
    margin: 0 auto;
  }

  #gel-insta-section {
    margin-bottom: 0;
    padding: 0;

    h2 {
      margin: 0 auto 60px;
      font-family: ${props => props.theme.secondaryFont};

      a {
        display: inline-block;
        width: 25px;
        margin: 0 10px;

        :hover svg path,
        :hover svg circle {
          animation: gelHoverColors;
          animation-duration: 300ms;
          animation-fill-mode: forwards;
        }
      }
    }

    ul {
      display: flex;
      margin-left: 0;
      text-align: center;

      li {
        position: relative;
        flex-basis: 16.6%;
        height: 16.6vw;
        margin: 0;

        list-style: none;

        a {
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;

          display: block;
          font-size: 0;

          background: center / cover no-repeat;
          transition: transform 300ms;

          :hover {
            transform: scale(1.1);
            z-index: 2;
          }
        }
      }
    }
  }

  @media (max-width: 1024px) {
    #gel-insta-section ul { flex-wrap: wrap; }
    #gel-insta-section ul li {
      flex-basis: 33.3%;
      height: 33.3vw;
    }
  }

  @media (max-width: 768px) {
    #gel-insta-section ul li {
      flex-basis: 50%;
      height: 50vw;
    }
  }
`;

export const AboutPageTemplate = ({
  id,
  title,
  intro1,
  intro2,
  intro3,
  main,
  insta,
  helmet,
  allInstaNodeEdges,
}) => {

  const instaFeed = allInstaNodeEdges.map((edge) =>
    <li key={edge.node.id}>
      <a href={`https://www.instagram.com/p/${edge.node.id}/`} target="_blank" rel="noopener noreferrer" style={{backgroundImage: 'url(' + edge.node.preview + ')'}}>Gel Instagram Post</a>
    </li>
  );

  return (
    <StyledAboutPage className="section section--gradient">
      {helmet || ''}
      <div className="container">
        <section className="columns is-centered gel-about-intro-section gel-full-height-vert-align">
          <div className="column">
            <div className="gel-about-intro-section-text-container">
              <h1>{title}</h1>
              <p className="gel-about-intro-text">{intro1}</p>
              <p className="gel-about-intro-text">{intro2}</p>
              <p className="gel-about-intro-text">{intro3}</p>
            </div>
          </div>
        </section>
        <section id="gel-bio-section">
          <div className="columns gel-bio-row" id="tom">
            <div className="column">
              <PreviewCompatibleImage imageInfo={main.tom.image1} />
            </div>
            <div className="column gel-bio-text">
              <div className="section">
                <h2><span>Meet</span> Tom</h2>
                <p className="gel-bio-content">{main.tom.tom_bio}</p>
              {/*<p><a href={main.tom.tom_website} target="_blank" rel="noopener noreferrer">{main.tom.tom_website_name}</a></p>*/}
                <p><a className="button gel-button-2" href={main.tom.tom_linkedin} target="_blank" rel="noopener noreferrer">Follow me on Linkedin</a></p>
              </div>
            </div>
          </div>
          <div className="columns gel-bio-row" id="shannon">
            <div className="column gel-bio-text push">
              <div className="section">
                <h2><span>Meet</span> Shannon</h2>
                <p className="gel-bio-content">{main.shannon.shannon_bio}</p>
                <p><a href={main.shannon.shannon_website} target="_blank" rel="noopener noreferrer">{main.shannon.shannon_website_name}</a></p>
                <p><a className="button gel-button-2" href={main.shannon.shannon_linkedin} target="_blank" rel="noopener noreferrer">Follow me on Linkedin</a></p>
              </div>
            </div>
            <div className="column">
              <PreviewCompatibleImage imageInfo={main.shannon.image2} />
            </div>
          </div>
        </section>
      </div>
      <section className="is-centered gel-insta-section content" id="gel-insta-section">
        <h2 className="has-text-centered">Follow us on
          <a  href="https://www.instagram.com/gelagency/"
            target="_blank"
            rel="noopener noreferrer"
            title="Gel on Instagram">
            <Instagram />
          </a>
          and
          <a  href="https://www.linkedin.com/company/gel-creative/?originalSubdomain=ca"
            target="_blank"
            rel="noopener noreferrer"
            title="Gel on Linkedin">
            <LinkedIn />
          </a>
        </h2>
        <ul className="gel-insta-section-feed">{instaFeed}</ul>
      </section>
    </StyledAboutPage>
  );
};

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  about_intro1: PropTypes.string,
  about_intro2: PropTypes.string,
  about_intro3: PropTypes.string,
  main: PropTypes.shape({
    tom: PropTypes.shape({
      image1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      tom_bio: PropTypes.string,
      tom_website: PropTypes.string,
      tom_website_name: PropTypes.string,
      tom_linkedin: PropTypes.string,
    }),
    shannon: PropTypes.shape({
      image2: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      shannon_bio: PropTypes.string,
      shannon_website: PropTypes.string,
      shannon_website_name: PropTypes.string,
      shannon_linkedin: PropTypes.string,
    }),
    insta: PropTypes.shape({
      heading: PropTypes.string,
    }),
  allInstaNodeEdges: PropTypes.object,
  }),
};

const AboutPage = ({ data }) => {
  const { markdownRemark, allInstaNode } = data;

  return (
    <Layout>
      <AboutPageTemplate
        id={markdownRemark.id}
        title={markdownRemark.frontmatter.title}
        intro1={markdownRemark.frontmatter.about_intro1}
        intro2={markdownRemark.frontmatter.about_intro2}
        intro3={markdownRemark.frontmatter.about_intro3}
        main={markdownRemark.frontmatter.main}
        insta={markdownRemark.frontmatter.insta}
        helmet={
          <Helmet titleTemplate="%s | Gel Marketing">
            <title>{`${markdownRemark.frontmatter.title}`}</title>
            <meta name="description" content={`${markdownRemark.frontmatter.about_intro1} ${markdownRemark.frontmatter.about_intro2} ${markdownRemark.frontmatter.about_intro3}`} />
          </Helmet>
        }
        allInstaNodeEdges={allInstaNode.edges}
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
        about_intro1
        about_intro2
        about_intro3
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
            tom_website
            tom_website_name
            tom_linkedin
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
            shannon_website
            shannon_website_name
            shannon_linkedin
          }
        }
        insta {
          heading
        }
      }
    }
    allInstaNode(limit: 6) {
      edges {
        node {
          caption
          id
          preview
        }
      }
    }
  }
`;
