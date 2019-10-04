import React from 'react'
import Img from 'gatsby-image'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'
import { lowerCase } from 'lodash'

const StyledLogoGrid = styled.section`
  background: #fff;
  flex-wrap: wrap;
  max-width: 1100px;
  margin: 0 auto!important;

  .gel-client-logos-container {
    position: relative;
  }

  [class^="gel-client-logo"] {
      transition: 300ms;
  }

  .gel-client-logo-color {
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      opacity: 0;
  }

  .gel-client-logo-grayscale {
      position: absolute !important;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: 0.75rem;
  }

  .gel-client-logos-container:hover .gel-client-logo-color {
      opacity: 1;
  }

  .gel-client-logos-container:hover .gel-client-logo-grayscale {
      opacity: 0;
  }
`

const ClientLogoGrid = () =>  (
  <StaticQuery 
    query={graphql`
      query {
        colorImageQuery: allFile (filter: {relativeDirectory: {eq: "client-logos"}}) {
          edges {
            node {
              name
              childImageSharp {
                fluid(maxWidth: 300, quality: 100) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
        grayscaleImageQuery: allFile (filter: {relativeDirectory: {eq: "client-logos"}}) {
          edges {
            node {
              name
              childImageSharp {
                fluid(maxWidth: 300, quality: 100, grayscale: true) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }`
    }
    render={ data => {
      const { edges: colorLogos } = data.colorImageQuery
      const { edges: grayscaleLogos } = data.grayscaleImageQuery
      return (
        <StyledLogoGrid className="columns">
            {colorLogos.map((colorLogo, i) => {
              const grayscaleLogo = grayscaleLogos[i]
              return (
                <div className="column is-one-quarter gel-client-logos-container" key={colorLogo.node.name} >
                  <Img className="gel-client-logo-color" fluid={colorLogo.node.childImageSharp.fluid} alt={lowerCase(colorLogo.node.name)} />
                  <Img className="gel-client-logo-grayscale" fluid={grayscaleLogo.node.childImageSharp.fluid} alt={grayscaleLogo.node.name} />
                </div>
              )
            })}
        </StyledLogoGrid>
      )
    }}
  />
)

export default ClientLogoGrid
