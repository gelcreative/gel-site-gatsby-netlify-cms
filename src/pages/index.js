import React from 'react'
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

    return (
      <Layout>
        <div className="container">
          <FullHeightSection className="gel-home-masthead columns is-centered">
            <div className="column has-text-centered">
              <img src="/img/gel-logo-footer.svg" title="Gel Logo" width="500" />
            </div>
          </FullHeightSection>
          <ScrollyDo socialIcons={true} fullHeight={true} targetId="gel-home-intro-section"></ScrollyDo>
          <FullHeightSection className="gel-home-intro-text has-text-centered" id="gel-home-intro-section">
            <div className="column has-text-centered">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus velit sed vestibulum consectetur. Nulla ornare metus in nunc congue facilisis. Nulla facilisi. Curabitur quis malesuada erat. Nam placerat pulvinar gravida. Aenean turpis augue, dictum et augue id, mattis aliquet orci. Fusce sed dapibus eros. Duis in rhoncus erat, ut viverra tortor. Fusce sed enim finibus.</p>
            </div>
          </FullHeightSection>
          <HomePagePortfolioFeatures />
          <ClientLogoGrid />
        </div>        
      </Layout>
    )
  }
}
