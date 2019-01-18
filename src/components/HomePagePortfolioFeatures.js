import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { kebabCase } from 'lodash'
import styled from 'styled-components'
import PreviewCompatibleImage from './PreviewCompatibleImage'

const StyledFeaturesSection = styled.section`
    position: relative;

  .gel-homepage-featured-text-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      h2 {
      color: #ffffff;
      font-size: 3.5rem;
    }
  }

`

const HomePagePortfolioFeatures = () => (
  <StaticQuery
    query={graphql`
      query HomePagePortfolioFeatures {
        allMarkdownRemark (filter: {frontmatter: {home_page_featured: {is_featured: {eq: true}}}}) {
          edges {
            node {
              id
              frontmatter {
                title
                project_type
                home_page_featured {
                  featured_image {
                    image {
                      childImageSharp {
                        fluid (maxWidth: 1920, quality: 100) {
                          ...GatsbyImageSharpFluid
                        }
                      }
                    }
                    alt
                  }
                }
              }
            }
          }
        }
      }
    `}
    render={ data => {
      const edges = data.allMarkdownRemark.edges
      return (
        edges.map(edge => {
          return (
            <StyledFeaturesSection key={edge.node.id} className="gel-homepage-featured columns">
              <div className="column">
                <PreviewCompatibleImage imageInfo={edge.node.frontmatter.home_page_featured.featured_image} />
                <div className="gel-homepage-featured-text-container">
                  <h2>{edge.node.frontmatter.project_type}</h2>
                  <Link className="button gel-button-1 is-large is-dark" to={`/portfolio-entries/${kebabCase(edge.node.frontmatter.title)}`}>View Case Study</Link>
                </div>
              </div>
            </StyledFeaturesSection>
          )
        })
      )
    }}
  />
)

export default HomePagePortfolioFeatures