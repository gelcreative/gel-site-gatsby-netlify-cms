import React from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'

import Layout from '../components/Layout'
import ScrollyDo from '../components/ScrollyDo'
import HomePagePortfolioFeatures from '../components/HomePagePortfolioFeatures'
import ClientLogoGrid from '../components/ClientLogoGrid'

const StyledHomePage = styled.article`
  #gel-home-intro-section {
    padding: 10rem 0;
  }

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

  .gel-home-masthead {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 150px;
    .column {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .gel-home-intro-text p {
    font-size: 2.5rem;
  }

  .columns.gel-home-featured-section {
    margin-bottom: 10rem;
  }

  @media (max-width: 450px) {
    .gel-home-intro-text .column {
      max-width: 90%;
    }
    .gel-home-intro-text p {
      font-size: 1.5rem;
    }
  }
`

export const IndexPageTemplate = ({
  helmet,
  title,
  services,
  intro,
  featuredPortfolioTitle,
  clientListTitle,
}) => {

  return (
    <StyledHomePage className="container">
      { helmet || '' }
      <section className="gel-home-masthead columns is-centered">
        <div className="column has-text-centered">
          <h1 className="visually-hidden">{title}</h1>
          <img src="/img/Gel_Whimsical_Colour_550x350_Transparent_Background.gif" alt="Gel Logo Animation" />
        </div>
      </section>
      <ScrollyDo socialIcons={true} fullHeight={true} targetId="gel-home-tags-section"></ScrollyDo>
      <section class="columns is-centered gel-home-tags-section" id="gel-home-tags-section">
        <div class="column is-narrow has-text-centered">
          <ul class="gel-services-list">
            {services.map(service => {
              return (
                <li key={service}>{service}</li>
              )
            })}
          </ul>
        </div>
      </section>
      <section className="gel-home-intro-text has-text-centered"  id="gel-home-intro-section">
        <div className="column has-text-centered">
          <p>{intro}</p>
        </div>
      </section>
      <section className="columns is-centered gel-home-featured-section">
        <div className="column has-text-centered">
          <h2 className="has-text-centered" style={{ marginBottom: '4rem' }}>{featuredPortfolioTitle}</h2>
          <HomePagePortfolioFeatures />
          <Link to="/portfolio/" className="button is-dark is-large gel-button-1 gel-button-bigger">See more of our work</Link>
        </div>
      </section>
      <div className="columns is-centered">
        <h2 className="column has-text-centered">{clientListTitle}</h2>
      </div>
      <ClientLogoGrid />
    </StyledHomePage>        
  )
}

IndexPageTemplate.propTypes = {
  helmet: PropTypes.object,
  title: PropTypes.string,
  services: PropTypes.array,
  intro: PropTypes.string,
  featuredPortfolioTitle: PropTypes.string,
  clientListTitle: PropTypes.string,
}


const IndexPage = ({data}) => {
  const { siteMetadata: metadata } = data.site
  const { frontmatter } = data.markdownRemark

  return (
    <Layout>
      <IndexPageTemplate 
        helmet={
          <Helmet title={`${metadata.title}`}>
            <meta name="description" content={`${metadata.description}`} />
          </Helmet>
        }
        title={frontmatter.title}
        services={frontmatter.services}
        intro={frontmatter.intro}
        featuredPortfolioTitle={frontmatter.featuredPortfolioTitle}
        clientListTitle={frontmatter.clientListTitle}
      />
    </Layout>
  )
}

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default IndexPage

export const indexPageQuery = graphql`
  query HomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        services
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
`
