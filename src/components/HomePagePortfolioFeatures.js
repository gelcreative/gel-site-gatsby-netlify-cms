import React from 'react'
import { Link, StaticQuery, graphql } from 'gatsby'
import { kebabCase } from 'lodash'
import styled from 'styled-components'
import PreviewCompatibleImage from './PreviewCompatibleImage'

const StyledFeaturesSection = styled.div`
  position: relative;
  margin-bottom: 50px !important;
  overflow: hidden;

  .gel-homepage-featured-text-container > button {
    transform: translateY(100%);
    opacity: 0;
  }

  > .column {
    position: relative;
    &:hover {
      .gel-homepage-featured-reveal-overlay {
        transform: translateX(-13%) skewX(-30deg);
        opacity: 0.7;
      }
      .gel-homepage-featured-text-container {
        transform: scale(1.05);
      }
      button {
        transform: translateY(0);
        opacity: 1;
      }
    } 
  }

  .gel-homepage-featured-link {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
  }

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
    width: 30em;
    max-width: 95%;
    margin: 0 auto;
    transform: scale(1);
    transition: 300ms ease-in-out;
    transition-delay: 200ms; 
    h2 {
      color: ${props => props.theme.orange};
      font-size: 3rem;
      font-weight: 500;
      margin-bottom: 2em;
      text-align: center;
      line-height: 1.3;
      span {
        font-size: 1.1em;
        color: #ffffff;
        font-weight: 700;
      }
    }
  }

  .gel-homepage-featured-contrast-overlay {
    background-color: rgba(28,29,37,.7);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    transition: 300ms;
  }

  .gel-homepage-featured-reveal-overlay {
    /* Permalink - use to edit and share this gradient: http://colorzilla.com/gradient-editor/#101b3b+0,143358+35,143358+35 */
    background: #101b3b; /* Old browsers */
    background: -moz-linear-gradient(left, #101b3b 0%, #143358 35%, #143358 35%); /* FF3.6-15 */
    background: -webkit-linear-gradient(left, #101b3b 0%,#143358 35%,#143358 35%); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(to right, #101b3b 0%,#143358 35%,#143358 35%); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
    filter: progid:DXImageTransform.Microsoft.gradient( startColorstr='#101b3b', endColorstr='#143358',GradientType=1 ); /* IE6-9 */
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    width: 135%;
    transition: 300ms ease-in-out;
    opacity: 0;
    transform: translateX(-100%) skewX(-30deg);
  }

  @media (max-width: 768px) {
    .gel-homepage-featured-text-container {
      h2 {
        margin-bottom: 1em;
      }
      
      button {
        opacity: 1;
        transform: translateY(0);
        font-size: 1.6rem;
      }
    }
}


  @media (max-width: 439px) {
    .gel-homepage-featured-text-container h2 {
      font-size: 2.5rem;
    }
  }
`

const HomePagePortfolioFeatures = () => (
  <StaticQuery
    query={graphql`
      query HomePagePortfolioFeatures {
        allMarkdownRemark (
          filter: {frontmatter: {home_page_featured: {is_featured: {eq: true}}}}
          sort: {fields: [frontmatter___date] order: DESC}
        ) {
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
                <PreviewCompatibleImage imageInfo={edge.node.frontmatter.home_page_featured.featured_image} className="gel-homepage-featured-image"/>
                <div className="gel-homepage-featured-contrast-overlay"></div>
                <div className="gel-homepage-featured-reveal-overlay"></div>
                <Link to={`/portfolio-entries/${kebabCase(edge.node.frontmatter.title)}`} className="gel-homepage-featured-link">
                  <div className="gel-homepage-featured-text-container">
                    <h2>{edge.node.frontmatter.project_type} <span className="visually-hidden">for </span><br/><span>{edge.node.frontmatter.title}</span></h2>
                    <button className="button gel-button-1 gel-button-bigger is-large is-light">See More</button>
                  </div>
                </Link>
              </div>
            </StyledFeaturesSection>
          )
        })
      )
    }}
  />
)

export default HomePagePortfolioFeatures