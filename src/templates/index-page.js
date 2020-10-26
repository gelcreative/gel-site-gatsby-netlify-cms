import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/Layout';
//import ScrollyDo from '../components/ScrollyDo';
import HomePagePortfolioFeatures from '../components/HomePagePortfolioFeatures';
import HomePageBlogFeatures from '../components/HomePageBlogFeatures';
//import ClientLogoGrid from '../components/ClientLogoGrid';
//import GelServices from '../components/GelServices';
import CallButton from '../components/CallButton';

const StyledHomePage = styled.article`

  #gel-home-masthead {
    display: flex;
    flex-direction: column-reverse;
    
    height: 65vh;
    padding: 10rem 0;

    background: url(/img/5S0A7042.png) center / cover no-repeat;
  }

  #gel-home-masthead h1 {
  
    max-width: 12em;

    color: ${props => props.theme.white};
    text-align: left;
    letter-spacing: 1.63px;

    font-size: 6.5rem;
    font-weight: bold;
    font-family: ${props => props.theme.secondaryBoldFont};

    :before {
      content: "";
      display: block;
      width: 15%;
      height: 4px;
  
      margin-bottom: 20px;
      background: ${props => props.theme.white};
    }
  }

  #gel-home-intro-section {
    height: 35vh;
    padding-top: 3rem;

    h2 {
      margin-bottom: 15px;

      font-size: 5.4rem;
      font-weight: lighter;
      font-family: ${props => props.theme.secondaryFont};
    }

    p {
      max-width: 50rem;
      margin: auto;

      font-size: 2.0rem;
      font-family: ${props => props.theme.regularFont};

      :before {
        content: "";
        display: block;
        width: 15%;
        height: 4px;
    
        margin: 0 auto 20px;
        background: ${props => props.theme.black};
      }
    }
  }

  .columns.gel-home-featured-section {
    padding: 200px 0 350px;
    margin: 10px 0 -250px;

    background: url(/img/homepage_blue_background.png) center / cover no-repeat;
    color: ${props => props.theme.white};

    h2 {
      font-family: ${props => props.theme.secondaryFont};
      font-weight: lighter;
      font-size: 5.4rem;
    }

    .gel-portfolio-section, & + .gel-home-blog-section {
      display: flex;
      justify-content: space-between;

      max-width: 1700px;
      margin: 30px auto;
    }

    h3 {
      font-family: ${props => props.theme.secondaryFont};
      font-weight: bold;
      font-size: 3.2rem;
    }

    p {
      max-width: 65rem;
      margin: 30px auto;
      font-size: 2.0rem;

      + cite {
        font-family: ${props => props.theme.secondaryFont};
        font-weight: lighter;
        font-style: normal;
        font-size: 2.4rem;
  
        span { display: block; font-size: 1.8rem; }
      }
    }

    p + cite + h2 {
      font-family: ${props => props.theme.secondaryFont};
      font-weight: bold;
      font-size: 4.8rem;

      :before {
        content: "";
        display: block;
        width: 5%;
        height: 4px;
    
        margin: 75px auto 20px;
        background: ${props => props.theme.white};
      }

      + p { max-width: 25rem; }
    }
  }
  @media(max-width: 768px){
    .columns.gel-home-featured-section {
      h2 {
        margin-bottom:-2rem;                       
      }
    }
  }

  @media (max-width: 450px) {
    .gel-home-intro-text .column {
      max-width: 90%;
    }
    .gel-home-intro-text p {
      font-size: 1.8rem;
    }
  }
`;

export const IndexPageTemplate = ({
  helmet,
  title,
  intro1,
  intro2,
  featuredPortfolioTitle,
  featuredPortfolioTestimonialTitle,
  featuredPortfolioTestimonialContent1,
  featuredPortfolioTestimonialContent2,
  featuredPortfolioTestimonialAuthor1,
  featuredPortfolioTestimonialAuthor2,
  featuredPortfolioSubtitle,
  featuredPortfolioCTA,
}) => {
  return (
    <StyledHomePage className="section">
      {helmet || ''}
      <div>
        <section
          className="gel-home-masthead"
          id="gel-home-masthead"
        >
          <div className="column is-10 is-offset-1">
            <h1>{title}</h1>
          </div>
        </section>
        <section
          className="gel-home-intro-text has-text-centered"
          id="gel-home-intro-section"
        >
          <div className="column is-10 is-offset-1">
            <h2>{intro1}</h2>
            <p>{intro2}</p>
          </div>
        </section>
        <section className="columns is-centered gel-home-featured-section">
          <div className="column has-text-centered">
            <h2 className="has-text-centered">
              {featuredPortfolioTitle}
            </h2>
            <section className="gel-portfolio-section"><HomePagePortfolioFeatures /></section>
            <h3>{featuredPortfolioTestimonialTitle}</h3>
            <p className="has-text-left">{featuredPortfolioTestimonialContent1}</p>
            <p className="has-text-left">{featuredPortfolioTestimonialContent2}</p>
            <cite>
              {featuredPortfolioTestimonialAuthor1}
              <span>{featuredPortfolioTestimonialAuthor2}</span>
            </cite>

            <h2>{featuredPortfolioSubtitle}</h2>
            <p>{featuredPortfolioCTA}</p>
            <CallButton />
          </div>
        </section>
        <div className="columns is-centered gel-home-blog-section">
          <HomePageBlogFeatures />
        </div>
      </div>
    </StyledHomePage>
  );
};

IndexPageTemplate.propTypes = {
  helmet: PropTypes.object,
  title: PropTypes.string,
  services: PropTypes.array,
  intro1: PropTypes.string,
  intro2: PropTypes.string,
  featuredPortfolioTitle: PropTypes.string,
  featuredPortfolioTestimonialTitle: PropTypes.string,
  featuredPortfolioTestimonialContent1: PropTypes.string,
  featuredPortfolioTestimonialContent2: PropTypes.string,
  featuredPortfolioTestimonialAuthor1: PropTypes.string,
  featuredPortfolioTestimonialAuthor2: PropTypes.string,
  featuredPortfolioSubtitle: PropTypes.string,
  featuredPortfolioCTA: PropTypes.string,
};

const IndexPage = ({ data }) => {
  const { siteMetadata: metadata } = data.site;
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout pageType="home">
      <IndexPageTemplate
        helmet={
          <Helmet title={`${metadata.title}`}>
            <meta name="description" content={`${metadata.description}`} />
          </Helmet>
        }
        title={frontmatter.title}
        intro1={frontmatter.intro1}
        intro2={frontmatter.intro2}
        featuredPortfolioTitle={frontmatter.featuredPortfolioTitle}
        featuredPortfolioTestimonialTitle={frontmatter.featuredPortfolioTestimonialTitle}
        featuredPortfolioTestimonialContent1={frontmatter.featuredPortfolioTestimonialContent1}
        featuredPortfolioTestimonialContent2={frontmatter.featuredPortfolioTestimonialContent2}
        featuredPortfolioTestimonialAuthor1={frontmatter.featuredPortfolioTestimonialAuthor1}
        featuredPortfolioTestimonialAuthor2={frontmatter.featuredPortfolioTestimonialAuthor2}
        featuredPortfolioSubtitle={frontmatter.featuredPortfolioSubtitle}
        featuredPortfolioCTA={frontmatter.featuredPortfolioCTA}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default IndexPage;

export const indexPageQuery = graphql`
  query HomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        intro1
        intro2
        featuredPortfolioTitle
        featuredPortfolioTestimonialTitle
        featuredPortfolioTestimonialContent1
        featuredPortfolioTestimonialContent2
        featuredPortfolioTestimonialAuthor1
        featuredPortfolioTestimonialAuthor2
        featuredPortfolioSubtitle
        featuredPortfolioCTA
      }
    }
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
