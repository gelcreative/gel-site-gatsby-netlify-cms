import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { kebabCase } from 'lodash'
import styled from 'styled-components'
import PreviewCompatibleImage from './PreviewCompatibleImage'

const HomePagePortfolioFeatures = () => (
  <StaticQuery
    query={graphql`
      query HomePagePortfolioFeatures {
        allMarkdownRemark (filter: {frontmatter: {home_page_featured: {is_featured: {eq: true}}}}) {
          edges {
            node {
              frontmatter {
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
            <section className="gel-homepage-featured columns">
              <div className="column">  
                <PreviewCompatibleImage imageInfo={edge.node.frontmatter.home_page_featured.featured_image} />
              </div>
            </section>
          )
        })
      )
    }}
  />
)

export default HomePagePortfolioFeatures