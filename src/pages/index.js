import React from 'react'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import ScrollyDo from '../components/ScrollyDo'
import HomePagePortfolioFeatures from '../components/HomePagePortfolioFeatures'
import ClientLogoGrid from '../components/ClientLogoGrid'
import FooterLogo from '../img/gel-logo-footer.svg'

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
    margin-top: 50px;
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
              <FooterLogo title="Gel Logo" alt="gel logo" />
            </div>
          </FullHeightSection>
          <ScrollyDo socialIcons={true} fullHeight={true} targetId="gel-home-intro-section"></ScrollyDo>
          <FullHeightSection className="gel-home-intro-text has-text-centered" id="gel-home-intro-section">
            <div className="column has-text-centered">
              <p>Great! You found us. You’re looking for an agency partner. So you already know we’re a marketing communications agency. What you may not know is that our approach is different. It’s grounded in creative intelligence. It’s marketing with purpose. Get a sense of our capabilities &mdash; to see if we’re the right fit for you. When it fits, we Gel.</p>
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
