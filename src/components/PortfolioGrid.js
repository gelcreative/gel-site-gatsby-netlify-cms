import React, { createElement } from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import styled from 'styled-components'
import { create } from 'lodash'
import PreviewCompatibleImage from './PreviewCompatibleImage';

const StyledPortfolioGrid = styled.section`
  .gel-portfolio-grid {
    justify-content: space-between;

    .column {
      flex-grow: 0;
      flex-shrink: 0;

      .gel-portfolio-grid-item {
        margin: 0 auto 60px;

        a {
          color: ${props => props.theme.black};

          h2 {
            margin: 25px 0 0;
            font-family: ${props => props.theme.secondaryFont};
            font-weight: lighter;
            font-size: 3.8rem;
          }

          p {
            font-weight: lighter;
            font-size: 2.0rem;
          }

          :hover {
            text-decoration: none;
          }
        }

        .gel-portfolio-item-image {
          transition: transform 300ms;
        }

        .gel-portfolio-item-image:hover {
          transform: scale(1.1);
          z-index: 2;
        }
      }
      
      &.wide {
        flex-basis: 55%;

        .gel-portfolio-item-image { height: 420px; }
      }

      &.thin {
        flex-basis: 40%;

        .gel-portfolio-item-image { height: 660px; }
      }
    }
  }

  @media (max-width: 768px) {
    .gel-portfolio-grid .column.thin,
    .gel-portfolio-grid .column.wide {
      .gel-portfolio-item-image { height: 400px; }
    }
  }

  @media (max-width: 600px) {
    .gel-portfolio-grid .column.thin,
    .gel-portfolio-grid .column.wide {
      .gel-portfolio-item-image { height: 300px; }
    }
  }
`

const PortfolioGrid = () => (
  <StaticQuery
    query={graphql`
      query {
        mainPortfolioQuery: allMarkdownRemark (
            filter: {frontmatter: {templateKey: {eq: "portfolio-entry"}}}, 
            sort: {order: DESC, fields: [frontmatter___date]}
          ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                services
                thumbnail_image {
                  image {
                    childImageSharp {
                      fluid(maxWidth: 900, quality: 100) {
                        ...GatsbyImageSharpFluid_tracedSVG
                      }
                    }
                  }
                }
              }
            }
          }
        }
        allFile(filter: {name: {regex: "/gel-logo-circle/"}}) {
          edges {
            node {
              childImageSharp {
                fluid(maxWidth: 900, quality: 100) {
                  ...GatsbyImageSharpFluid_tracedSVG
                }
              }
            }
          }
        }
      }`
    }
    render={data=> {
      const { edges: portfolioEntries } = data.mainPortfolioQuery
      const defaults = data.allFile.edges

      let columnCounter = 1

      let columnListWide = [];
      let columnListThin = [];

      return (
        <StyledPortfolioGrid>
          <div className="gel-portfolio-grid columns">
            {portfolioEntries.map((portfolioEntry, i) => {

              // Create services list
              let servicesList = portfolioEntry.node.frontmatter.services.map((service, index) => {
                if (!index) { return <span>{service}</span> }
                else {        return <span> &#47;&#47; {service}</span> }
              })

              let gridItem = (
                <div key={portfolioEntry.node.id} className={`gel-portfolio-grid-item`}>
                  <div className="gel-portfolio-item-inner">
                    <Link to={portfolioEntry.node.fields.slug}>
                      <PreviewCompatibleImage
                        imageInfo={
                          portfolioEntry.node.frontmatter.thumbnail_image
                        }
                        className="gel-portfolio-item-image"
                      />
                    
                      <div className="gel-portfolio-item-text-container">
                        <h2>{portfolioEntry.node.frontmatter.title}</h2>
                        <p>{servicesList}</p>
                      </div>
                    </Link>
                  </div>
                </div>
              )

              // This will alternate columns, until it reaches 5,
              // where it will add an extra post to the wide column
              // to keep the layout even
              if (columnCounter == 0 || columnCounter % 2) {
                columnListWide.push(gridItem);
              } else {
                columnListThin.push(gridItem);
              }

              if(columnCounter >= 5) {
                columnCounter = 0
              }

              columnCounter++

            })}
            <section className="column wide">{columnListWide}</section>
            <section className="column thin">{columnListThin}</section>
          </div>
        </StyledPortfolioGrid>
      )
    }}
  />
)

export default PortfolioGrid
