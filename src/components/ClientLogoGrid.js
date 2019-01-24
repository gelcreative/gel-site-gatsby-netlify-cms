import React from 'react'
import Img from 'gatsby-image'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'
import { lowerCase } from 'lodash'

const StyledLogoGrid = styled.section`
  background: #fff;
  flex-wrap: wrap;
`

const ClientLogoGrid = () =>  (
  <StaticQuery 
    query={graphql`
      query {
        allFile (filter: {relativeDirectory: {eq: "client-logos"}}) {
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
      const { edges: logos } = data.allFile
      return (
        <StyledLogoGrid className="columns">
            {logos.map(logo => {
              return (
                <div className="column is-one-quarter" key={logo.node.name} >
                  <Img fluid={logo.node.childImageSharp.fluid} alt={lowerCase(logo.node.name)} />  
                </div>
              )
            })}
        </StyledLogoGrid>
      )
    }}
  />
)

export default ClientLogoGrid
