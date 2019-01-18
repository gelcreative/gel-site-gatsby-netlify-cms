import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import ScrollyDo from '../components/ScrollyDo'
import HomePagePortfolioFeatures from '../components/HomePagePortfolioFeatures'

const FullHeightSection = styled.section`
  min-height: 100vh;

`


export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <Layout>
        <main role="main">
          <div className="container">
            <FullHeightSection className="gel-home-masthead columns is-centered">
              <div className="column has-text-centered">
                <img src="/img/gel-logo-footer.svg" title="Gel Logo" width="500" />
              </div>
            </FullHeightSection>
            <ScrollyDo socialIcons={true} fullHeight={true}></ScrollyDo>
            <FullHeightSection className="gel-home-intro-text has-text-centered">
              <p style={{fontSize: '2.5rem'}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed faucibus velit sed vestibulum consectetur. Nulla ornare metus in nunc congue facilisis. Nulla facilisi. Curabitur quis malesuada erat. Nam placerat pulvinar gravida. Aenean turpis augue, dictum et augue id, mattis aliquet orci. Fusce sed dapibus eros. Duis in rhoncus erat, ut viverra tortor. Fusce sed enim finibus.</p>
            </FullHeightSection>
            <HomePagePortfolioFeatures />
          </div>
        </main>
        
      </Layout>
    )
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] },
      filter: { frontmatter: { templateKey: { eq: "blog-post" } }}
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
          }
        }
      }
    }
  }
`
