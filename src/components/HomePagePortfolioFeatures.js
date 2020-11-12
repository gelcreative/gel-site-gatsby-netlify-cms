import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import PreviewCompatibleImage from './PreviewCompatibleImage';

const StyledFeaturesSection = styled.div`
  padding: 0 20px !important;

  a {
    display: block;
    color: ${props => props.theme.white};

    .gel-homepage-thumbnail-image {
      height: 320px;
      transition: transform 300ms;

      :hover {
        transform: scale(1.1);
        z-index: 2;
      }
    }

    h2 {
      margin-top: 50px;

      font-family: ${props => props.theme.secondaryFont};
      font-weight: lighter;
      font-size: 3.8rem;
    }

    p {
      font-family: ${props => props.theme.regularFont};
      font-weight: lighter;
      font-size: 1.6rem;
    }

    :hover {
      text-decoration: none;
      color: ${props => props.theme.white};
    }
  }

  @media (max-width: 1024px) {
    a .gatsby-image-wrapper { height: 200px; }
  }

  @media (max-width: 768px) {
    :not(:last-of-type) {
      margin-bottom: 30px;
    }

    a .gatsby-image-wrapper { height: 400px; }
  }

  @media (max-width: 600px) {
    a .gatsby-image-wrapper { height: 320px; }
  }
`;

const HomePagePortfolioFeatures = props => (
  <StaticQuery
    query={graphql`
      query HomePagePortfolioFeatures {
        allMarkdownRemark(
          filter: {
            frontmatter: { templateKey: { eq: "portfolio-entry" } },
            id: { ne: "" }
          }
          sort: { fields: [frontmatter___date], order: DESC }
          limit: 4
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
      var skipped = false;

      return edges.map((edge, edgeIndex) => {
        // Create services list. Only use the first 3 tags
        let servicesList = edge.node.frontmatter.services.map((service, index) => {
          if (!index) { return <span key={index}>{service}</span> }
          else if (index <= 2) {        return <span key={index}> &#47;&#47; {service}</span> }
        })

        // Skip this post if it's the current post,
        // or if we're at the last one and haven't skipped one
        // (the query pulls 4 posts but only needs 3)
        if (edge.node.id == props.current || (skipped === false && edgeIndex > 2)) {
          skipped = true;
          return(null);
        } else {
          return (
            <StyledFeaturesSection
              key={edge.node.id}
              className="gel-homepage-featured column"
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
        }
      });
    }}
  />
);

export default HomePagePortfolioFeatures;
