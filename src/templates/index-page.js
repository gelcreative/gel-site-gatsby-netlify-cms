import React from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/Layout';
import ScrollyDo from '../components/ScrollyDo';
import HomePagePortfolioFeatures from '../components/HomePagePortfolioFeatures';
import ClientLogoGrid from '../components/ClientLogoGrid';
import GelServices from '../components/GelServices';

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
    margin-bottom: 10rem;
    margin-top: 5rem;
    h2 {
      margin-bottom:-3rem;      
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
  clientListTitle,
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
        <GelServices />
        <section className="columns is-centered gel-home-featured-section">
          <div className="column has-text-centered">
            <h2 className="has-text-centered outlined">
              {featuredPortfolioTitle}
            </h2>
            <HomePagePortfolioFeatures />
            <Link
              to="/portfolio/"
              className="button is-dark is-large gel-button-1 gel-button-bigger"
            >
              See more work
            </Link>
          </div>
        </section>
        <div className="columns is-centered">
          <h2 className="column has-text-centered">{clientListTitle}</h2>
        </div>
        <ClientLogoGrid />
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
  clientListTitle: PropTypes.string,
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
        clientListTitle={frontmatter.clientListTitle}
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
        clientListTitle
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
