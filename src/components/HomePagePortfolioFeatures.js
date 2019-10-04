import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import PreviewCompatibleImage from './PreviewCompatibleImage';

const StyledFeaturesSection = styled.div`
  position: relative;
  margin-bottom: 50px !important;
  overflow: hidden;
  
  .gel-homepage-featured-text-container > button {
    // transform: translateY(100%);
    opacity: 1;
  }

  > .column {
    position: relative;
    padding: 0;
    // &:hover {
    //   .gel-homepage-featured-reveal-overlay {
    //     transform: translateX(-13%) skewX(-30deg);
    //     opacity: 0.7;
    //   }
    //   .gel-homepage-featured-text-container {
    //     transform: scale(1.05);
    //   }
    //   button {
    //     transform: translateY(0);
    //     opacity: 1;
    //   }
    // }
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

  &:nth-child(2){ 
    .gel-homepage-featured-text-container{
      background: ${props => props.theme.orange};
      left: 0;
      &:after {
        background: ${props => props.theme.orange};
        z-index: -1;
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right:-2em;
        width:4em;
        -webkit-transform: skew(3deg);
        -moz-transform: skew(3deg);
        -o-transform: skew(3deg);
      }
      h2 {
        color: ${props => props.theme.darkOrange};
      }
      > .link {
        color: ${props => props.theme.darkOrange};
      }
    }
  }
  &:nth-child(3){
    .gel-homepage-featured-text-container{
      // left:50%;
      background: ${props => props.theme.yellow};
      right: 0;
      &:before {
        background: ${props => props.theme.yellow};
        z-index: -1;
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        left:-2em;
        width:4em;
        -webkit-transform: skew(-3deg);
        -moz-transform: skew(-3deg);
        -o-transform: skew(-3deg);
      }
      h2 {
        color: ${props => props.theme.darkYellow};
      }
      > .link {
        color: ${props => props.theme.darkYellow};
      }
    }
  }
  
  &:nth-child(4){
    .gel-homepage-featured-text-container{
      background: ${props => props.theme.blue};
      left: 0;
      &:after {
        background: ${props => props.theme.blue};
        z-index: -1;
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right:-2em;
        width:4em;
        -webkit-transform: skew(3deg);
        -moz-transform: skew(3deg);
        -o-transform: skew(3deg);
      }
      h2 {
        color: ${props => props.theme.lightBlue};
      }
      > .link {
        color: ${props => props.theme.lightBlue};
      }
    }
  }
  .gel-homepage-featured-text-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: absolute;
    padding: 50px;
    box-sizing:border-box;
    top: 0;
    // right: 0;
    bottom: 0;
    // left: 0;
    width: 40em;
    max-width: 50%;
    transform: scale(1);
    transition: 300ms ease-in-out;
    transition-delay: 200ms;
    h2 {      
      font-size: 2.5rem;
      font-weight: 500;
      margin-bottom: 4em;
      text-align: center;
      line-height: 1.3;
      span {
        font-size: 7rem;
        // color: #ffffff;
        font-weight: 700;
        display:block;
        margin-top:2em;
      }
    }
    > .link {
      font-size:2.5rem;
      text-decoration:underline;
    }
  }

  .gel-homepage-featured-contrast-overlay {
    /*background-color: rgba(28, 29, 37, 0.7);*/
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
    background: -moz-linear-gradient(
      left,
      #101b3b 0%,
      #143358 35%,
      #143358 35%
    ); /* FF3.6-15 */
    background: -webkit-linear-gradient(
      left,
      #101b3b 0%,
      #143358 35%,
      #143358 35%
    ); /* Chrome10-25,Safari5.1-6 */
    background: linear-gradient(
      to right,
      #101b3b 0%,
      #143358 35%,
      #143358 35%
    ); /* W3C, IE10+, FF16+, Chrome26+, Opera12+, Safari7+ */
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
      padding:20px;
      width: 30em;
      h2 {
        margin-bottom: 1em;
        font-size:2rem;
        span {
          margin-top:.5em;
          font-size:3rem;
        }
      } 
      > .link {
        font-size:2rem;
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
      font-size: 2rem;
      span {
        font-size:3rem;
      }
    }
    > .link {
      font-size:2rem;
    }
  }
`;

const HomePagePortfolioFeatures = () => (
  <StaticQuery
    query={graphql`
      query HomePagePortfolioFeatures {
        allMarkdownRemark(
          filter: {
            frontmatter: { home_page_featured: { is_featured: { eq: true } } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
        ) {
          edges {
            node {
              id
              fields {
                slug
              }
              frontmatter {
                title
                project_type
                home_page_featured {
                  featured_image {
                    image {
                      childImageSharp {
                        fluid(maxWidth: 1920, quality: 100) {
                          ...GatsbyImageSharpFluid_tracedSVG
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
    render={data => {
      const edges = data.allMarkdownRemark.edges;
      return edges.map(edge => {
        return (
          <StyledFeaturesSection
            key={edge.node.id}
            className="gel-homepage-featured columns"
          >
            <div className="column">
              <PreviewCompatibleImage
                imageInfo={
                  edge.node.frontmatter.home_page_featured.featured_image
                }
                className="gel-homepage-featured-image"
              />
              <Link
                to={edge.node.fields.slug}
                className="gel-homepage-featured-link"
              >
                <div className="gel-homepage-featured-text-container">
                  <h2>
                    {edge.node.frontmatter.project_type}{' '}
                    <span className="visually-hidden">for </span>
                    <br />
                    <span>{edge.node.frontmatter.title}</span>
                  </h2>
                  <a className="link">
                    View Case Study
                  </a>
                </div>
              </Link>
            </div>
          </StyledFeaturesSection>
        );
      });
    }}
  />
);

export default HomePagePortfolioFeatures;
