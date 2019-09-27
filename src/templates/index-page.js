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
  #gel-home-intro-section {
    padding: 10rem 0;
  }

  .gel-home-masthead {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20vh 0 10vh;
    .column {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .gel-home-intro-text p {
    font-size: 1.9rem;
    line-height: 1.25em;
  }

  .columns.gel-home-featured-section {
    margin-bottom: 10rem;
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
  intro,
  featuredPortfolioTitle,
  clientListTitle,
}) => {
  return (
    <StyledHomePage className="section">
      {helmet || ''}
      <div className="container">
        <section className="gel-home-masthead columns is-centered">
          <div className="column has-text-centered">
            <h1 className="visually-hidden">{title}</h1>
            <img
              src="/img/Gel_Written_Whimsical_Colour_550x350_Transparent_Background.gif"
              alt="Gel Logo Animation"
            />
          </div>
        </section>
        <ScrollyDo
          socialIcons={true}
          fullHeight={true}
          targetId="gel-home-intro-section"
        ></ScrollyDo>
        <section
          className="gel-home-intro-text is-centered"
          id="gel-home-intro-section"
        >
          <div className="column is-10 is-offset-1">
            <p>{intro}</p>
          </div>
        </section>
        <GelServices />
        <section className="columns is-centered gel-home-featured-section">
          <div className="column has-text-centered">
            <h2 className="has-text-centered" style={{ marginBottom: '4rem' }}>
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
  intro: PropTypes.string,
  featuredPortfolioTitle: PropTypes.string,
  clientListTitle: PropTypes.string,
};

const IndexPage = ({ data }) => {
  const { siteMetadata: metadata } = data.site;
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout>
      <IndexPageTemplate
        helmet={
          <Helmet title={`${metadata.title}`}>
            <meta name="description" content={`${metadata.description}`} />
          </Helmet>
        }
        title={frontmatter.title}
        intro={frontmatter.intro}
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
        intro
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
