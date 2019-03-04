import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import ScrollyDo from '../components/ScrollyDo'
import HomePagePortfolioFeatures from '../components/HomePagePortfolioFeatures'
import ClientLogoGrid from '../components/ClientLogoGrid'

const FullHeightSection = styled.section`
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
  &.gel-home-intro-text p {
      font-size: 2.5rem;
  }
  &.gel-home-masthead {
    svg {
      width: 90%;
      max-width: 500px;
    } 
  }

  @media (max-width: 450px) {
    &.gel-home-intro-text .column {
      max-width: 90%;
    }
    &.gel-home-intro-text p {
      font-size: 1.5rem;
    }
  }
`


export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props

    return (
      <Layout>
        <Helmet title={`${data.site.siteMetadata.title}`}>
          <meta name="description" content={`${data.site.siteMetadata.description}`} />
        </Helmet>
        <div className="container">
          <FullHeightSection className="gel-home-masthead columns is-centered">
            <div className="column has-text-centered">
              <img src="/img/Gel_Whimsical_Colour_550x350_White_Background.gif" alt="Gel Logo Animation" />
            </div>
          </FullHeightSection>
          <ScrollyDo socialIcons={true} fullHeight={true} targetId="gel-home-intro-section"></ScrollyDo>
          <FullHeightSection className="gel-home-intro-text has-text-centered" id="gel-home-intro-section">
            <div className="column has-text-centered">
              <p>You found us. Chances are you’re looking for an agency partner. Gel is a marketing communications agency fuelled by creative intelligence. It’s hard to explain why our clients choose us &mdash; we’re told it’s the way we make them feel. Huh?  Point is, it goes far beyond the work. It’s their realization that we get it. We’ve helped them unlock hidden value in their business. Through strategy, branding, and communications, we clarify their brand story and design the tools that empower our clients to tell it. </p>
            </div>
          </FullHeightSection>
          <HomePagePortfolioFeatures />
          <div className="columns is-centered">
            <h2 className="column has-text-centered">We've worked with &hellip;</h2>
          </div>
          <ClientLogoGrid />
        </div>        
      </Layout>
    )
  }
}

export const pageQuery = graphql`
  query HomePage {
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`
