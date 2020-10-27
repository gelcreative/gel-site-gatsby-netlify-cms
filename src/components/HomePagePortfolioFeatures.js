import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import PreviewCompatibleImage from './PreviewCompatibleImage';

const StyledFeaturesSection = styled.div`
  max-width: 530px;
  flex-basis: 32%;

  a {
    display: block;
    color: ${props => props.theme.white};

    .gel-homepage-thumbnail-image { max-height: 320px }

    h2 {
      margin-top: 50px;

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
            frontmatter: { templateKey: { eq: "portfolio-entry" } }
          }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 3
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
    `}
    render={data => {
      const edges = data.allMarkdownRemark.edges;

      return edges.map(edge => {
        // Create services list
        let servicesList = edge.node.frontmatter.services.map((service, index) => {
          if (!index) { return <span>{service}</span> }
          else {        return <span> &#47;&#47; {service}</span> }
        })

        return (
          <StyledFeaturesSection
            key={edge.node.id}
            className="gel-homepage-featured"
          >
            <div className="">
              <Link
                to={edge.node.fields.slug}
                className="gel-homepage-featured-link"
              >
                <PreviewCompatibleImage
                  imageInfo={
                    edge.node.frontmatter.thumbnail_image
                  }
                  className="gel-homepage-thumbnail-image"
                />

                <div className="gel-homepage-featured-text-container">
                  <h2>{edge.node.frontmatter.title}</h2>
                  <p>{servicesList}</p>
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
