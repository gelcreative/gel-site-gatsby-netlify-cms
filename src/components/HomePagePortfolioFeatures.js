import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import PreviewCompatibleImage from './PreviewCompatibleImage';

const StyledFeaturesSection = styled.div`
  max-width: 530px;
  flex-basis: 32%;

  a {
    display: block;
    margin-top: 50px;

    color: ${props => props.theme.white};

    h2 {
      font-family: ${props => props.theme.secondaryFont};
      font-weight: lighter;
      font-size: 3.8rem;
    }

    p {
      font-family: ${props => props.theme.regularFont};
      font-weight: lighter;
      font-size: 2.4rem;
    }

    :hover {
      text-decoration: none;
      color: ${props => props.theme.white};
      text-shadow:  0.5px 0px 0px ${props => props.theme.white},
                   -0.5px 0px 0px ${props => props.theme.white};
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
            className="gel-homepage-featured"
          >
            <div className="">
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
                  <h2>{edge.node.frontmatter.title}</h2>
                  <p>{edge.node.frontmatter.project_type}</p>
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
