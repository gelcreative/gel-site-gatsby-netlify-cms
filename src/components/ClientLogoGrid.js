import { React } from 'react'
import Img from 'gatsby-image'
import { graphql, StaticQuery } from 'gatsby'
import styled from 'styled-components'

const StyledLogoGrid = styled.section`
  background: #fff;
`

const ClientLogoGrid = () =>  (
  <StaticQuery 
    query={graphql`
      query {
        allFile (filter: {relativeDirectory: {eq: "client-logos"}}) {
          edges {
            node {
              childImageSharp {
                fluid(maxWidth: 300, quality: 100) {
                  ...GatsbyImageSharpFluid
                }
              }
            }
          }
        }
      }`
    }
    render={ data => {
      const { edges: logos } = data.allFiles
      return (
        <StyledLogoGrid className="columns">
          <h2>Hiya</h2>
          <ul>
            {logos.map(logo => {
              return (
                <Img imageInfo={logo.node.childImageSharp.fluid} />  
              )
            })}
          </ul>
        </StyledLogoGrid>
      )
    }}
  />
)

export default ClientLogoGrid
