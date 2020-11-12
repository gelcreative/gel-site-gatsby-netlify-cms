import React, { createElement } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/Layout';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';
//import markdownToHtml from '../util/markdownToHtml';

const StyledServicesPage = styled.article`
  margin-top: 200px;

  .gel-services-intro-section {
    color: ${props => props.theme.typeGrey};

    h1 {
      font-size: 5.4rem;
      font-weight: 300;
      color: ${props => props.theme.typeGrey};

      :after {
        content: "";
        display: block;
        width: 10%;
        height: 4px;
    
        margin: 30px auto 50px;
        background: ${props => props.theme.black};
      }

      span {
        display: block;
        font-weight: bold;
      }

      + h1 {
        margin-bottom: 50px;
        line-height: 6.4rem;

        :after { content: none; }
      }
    }

    p.gel-services-intro-text {
      margin: 20px auto;
      font-size: 2.0rem;
    }
  }

  #gel-services-section {

    .columns {
      margin-bottom: 150px;

      .column {
        padding-right: 4rem;

        + .column { padding-left: 4rem; }

        .titleimg {
          margin-bottom: 20px;
        }

        p {

        }

        ul { margin-top: 20px; }
      }

      .column .titleimg { max-width: 22rem; }
      + .columns .column .titleimg { max-width: 35rem; }
    }
  }

  #gel-masterclass {
    padding: 250px 0 350px;
    background: url(/img/Untitled-7-01.png) center / cover repeat-y;

    text-align: center;

    h1 {
      margin: 0 auto;
      line-height: 5.4rem;

      color: ${props => props.theme.white};
      font-size: 5.4rem;
      font-weight: lighter;

      + h1 { margin-bottom: 15px; }
    }

    h2 {
      margin: 30px auto 10px;
      line-height: 5.4rem;

      color: ${props => props.theme.white};
      font-size: 4.4rem;
      font-weight: lighter;
      font-family: ${props => props.theme.secondaryFont};
    }

    p {
      max-width: 75rem;
      margin: 10px auto;
      color: ${props => props.theme.white};
      font-family: ${props => props.theme.secondaryFont};
    }

    a {
      margin-top: 30px;
      text-transform: uppercase;
    }
  }

  #gel-onlinecourses {
    text-align: center;
    color: ${props => props.theme.orange};
    
    font-family: ${props => props.theme.secondaryFont};
    font-weight: lighter;

    h1 {
      margin: 0 auto 30px;

      color: ${props => props.theme.orange};
      font-weight: bold;
      font-size: 4.4rem;
    }

    h2 {
      margin: 0 auto;
      text-align: center;
      line-height: 3.9rem;

      font-family: ${props => props.theme.secondaryFont};
      font-weight: lighter;
      font-size: 4.4rem;
    }

    .columns {
      max-width: 75rem;
      margin: auto;
      flex-wrap: wrap;

      p, ul {
        text-align: left;
        font-size: 2.0rem;
      }

      p { flex-basis: 100%; }

      ul {
        flex-basis: 27.5%;
        padding-left: 40px;
        list-style-image: url(/img/Path-2442.png);
      }
    }

    a {
      margin-top: 40px;
      text-transform: uppercase;
      font-family: ${props => props.theme.regularFont};
    }
  }

  @media (max-width: 769px) {
    #gel-services-section .columns {
      display: flex;
      flex-direction: column;

      .services-content { order: 2; }
    }
  }
`;

export const ServicesPageTemplate = ({
  id,
  title,
  subtitle1,
  subtitle2,
  main,
  helmet,
}) => {

  function tagsLoop(tagsArray) {
    var tagsList = [];
    for (let i = 0; i < tagsArray.length; i++) {
      tagsList.push(createElement("li", "", tagsArray[i]));
    }
    return createElement("ul", "", tagsList);
  }

  return (
    <StyledServicesPage className="section section--gradient">
      {helmet || ''}
      <div className="container">
        <section className="columns is-centered gel-services-intro-section gel-full-height-vert-align">
          <div className="column">
            <div className="gel-services-intro-section-text-container">
              <h1>{title}</h1>
              <h1>{subtitle1} <span>{subtitle2}</span></h1>
            </div>
          </div>
        </section>
        <section id="gel-services-section">
          <div className="columns">
            <div className="column services-image">
              <PreviewCompatibleImage imageInfo={main.section1.image1} />
            </div>
            <div className="column services-content">
              <div className="section">
                <PreviewCompatibleImage className="titleimg" imageInfo={main.section1.titleimg} />
                <p>{main.section1.content}</p>
                {tagsLoop(main.section1.tags)}
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column services-content">
              <div className="section">
                <PreviewCompatibleImage className="titleimg" imageInfo={main.section2.titleimg} />
                <p>{main.section2.content}</p>
                {tagsLoop(main.section2.tags)}
              </div>
            </div>
            <div className="column services-image">
              <PreviewCompatibleImage imageInfo={main.section2.image1} />
            </div>
          </div>
          <div className="columns">
            <div className="column services-image">
              <PreviewCompatibleImage imageInfo={main.section3.image1} />
            </div>
            <div className="column services-content">
              <div className="section">
                <PreviewCompatibleImage className="titleimg" imageInfo={main.section3.titleimg} />
                <p>{main.section3.content}</p>
                {tagsLoop(main.section3.tags)}
              </div>
            </div>
          </div>
          <div className="columns">
            <div className="column services-content">
              <div className="section">
                <PreviewCompatibleImage className="titleimg" imageInfo={main.section4.titleimg} />
                <p>{main.section4.content}</p>
                {tagsLoop(main.section4.tags)}
              </div>
            </div>
            <div className="column services-image">
              <PreviewCompatibleImage imageInfo={main.section4.image1} />
            </div>
          </div>
        </section>
      </div>
      <div id="gel-masterclass">
        <h1>Brand Builder</h1>
        <h1>Masterclass</h1>
        <p>If you have a business idea you want to launch, but aren’t sure how to build, you’ve come to the right place.
           Branding can get a little overwhelming if you’re just starting out. We feel your pain! That’s why we created
           this 4-week Branding Masterclass. We’ll guide you through the brand discovery — the most difficult part of the
           brand building process. You’ll come away with clarity and you’ll be one step closer to bringing your brand to market!</p>
        <p>Course Launches February 2020.</p>
        <h2>Sign up for course details, promos, and early access</h2>
        <a className="button gel-button-2">Join the Waitlist!</a>
      </div>
      <div className="container">
        <div id="gel-onlinecourses">
          <h1>Online Marketing Fundamentals Course</h1>
          <div className="columns">
            <p className="column">Get the knowledge you need to grow your business faster with over 10+ hours of video instruction on digital marketing covering:</p>
            <ul className="column">
              <li>Marketing Strategy</li>
              <li>Social Media Marketing</li>
              <li>Digital Marketing</li>
              <li>Email Marketing</li>
            </ul>
            <ul className="column">
              <li>Website</li>
              <li>Content Marketing</li>
              <li>SEO</li>
            </ul>
          </div>
          <a className="button gel-button-2">Get Early Access</a>
        </div>
      </div>
    </StyledServicesPage>
  );
};

ServicesPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle1: PropTypes.string.isRequired,
  subtitle2: PropTypes.string.isRequired,
  main: PropTypes.shape({
    section1: PropTypes.shape({
      image1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      titleimg: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      content: PropTypes.string,
      tags: PropTypes.object,
    }),
    section2: PropTypes.shape({
      image1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      titleimg: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      content: PropTypes.string,
      tags: PropTypes.object,
    }),
    section3: PropTypes.shape({
      image1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      titleimg: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      content: PropTypes.string,
      tags: PropTypes.object,
    }),
    section4: PropTypes.shape({
      image1: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      titleimg: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
      content: PropTypes.string,
      tags: PropTypes.object,
    }),
  }),
};

const ServicesPage = ({ data }) => {
  const { markdownRemark, allInstaNode } = data;

  return (
    <Layout>
      <ServicesPageTemplate
        id={markdownRemark.id}
        title={markdownRemark.frontmatter.title}
        subtitle1={markdownRemark.frontmatter.subtitle1}
        subtitle2={markdownRemark.frontmatter.subtitle2}
        main={markdownRemark.frontmatter.main}
        helmet={
          <Helmet titleTemplate="%s | Gel Marketing">
            <title>{`${markdownRemark.frontmatter.title}`}</title>
            <meta name="description" content={`${markdownRemark.frontmatter.services_intro1} ${markdownRemark.frontmatter.services_intro2} ${markdownRemark.frontmatter.services_intro3}`} />
          </Helmet>
        }
      />
    </Layout>
  );
};

ServicesPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default ServicesPage;

export const servicesPageQuery = graphql`
  query ServicesPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        subtitle1
        subtitle2
        main {
          section1 {
            image1 {
              alt
              image {
                childImageSharp {
                  fluid(maxWidth: 600, quality: 100) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
            titleimg {
              alt
              image {
                childImageSharp {
                  fluid(maxWidth: 600, quality: 100) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
            content
            tags
          }
          section2 {
            image1 {
              alt
              image {
                childImageSharp {
                  fluid(maxWidth: 600, quality: 100) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
            titleimg {
              alt
              image {
                childImageSharp {
                  fluid(maxWidth: 600, quality: 100) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
            content
            tags
          }
          section3 {
            image1 {
              alt
              image {
                childImageSharp {
                  fluid(maxWidth: 600, quality: 100) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
            titleimg {
              alt
              image {
                childImageSharp {
                  fluid(maxWidth: 600, quality: 100) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
            content
            tags
          }
          section4 {
            image1 {
              alt
              image {
                childImageSharp {
                  fluid(maxWidth: 600, quality: 100) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
            titleimg {
              alt
              image {
                childImageSharp {
                  fluid(maxWidth: 600, quality: 100) {
                    ...GatsbyImageSharpFluid_tracedSVG
                  }
                }
              }
            }
            content
            tags
          }
        }
      }
    }
  }
`;
