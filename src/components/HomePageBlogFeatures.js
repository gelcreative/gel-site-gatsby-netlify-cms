import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import PreviewCompatibleImage from './PreviewCompatibleImage';

const StyledPostsSection = styled.div`
  position: relative;
  padding: 0 50px !important;

  a {
    display: block;
    color: ${props => props.theme.typeGrey};

    .gatsby-image-wrapper {
      height: 300px;
      transition: transform 300ms;

      :hover {
        transform: scale(1.1);
        z-index: 2;
      }
    }

    h2 {
      margin: 20px 0 0;
      font-family: ${props => props.theme.secondaryFont};
      font-weight: bold;
      font-size: 3.6rem;
      line-height: 4.2rem;
    }
  
    h6 {
      margin: 10px 0 30px;
      font-family: ${props => props.theme.regularFont};
      font-weight: regular;
      font-size: 1.6rem;
      letter-spacing: 1.5px;
    }
  
    p {
      max-width: 65rem;
      margin: 30px auto 0;
      padding-bottom: 75px;
      font-family: ${props => props.theme.regularFont};
      font-weight: lighter;
      font-size: 1.6rem;
    }
  
    button {
      position: absolute;
      bottom: 1rem;
    }

    :hover {
      text-decoration: none;
      color: ${props => props.theme.typeGrey};
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

const HomePageBlogFeatures = props => (
  <StaticQuery
    query={graphql`
      query HomePageBlogFeatures {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] },
          filter: { frontmatter: { templateKey: { eq: "blog-post" } }},
          limit: 4
        ) {
          edges {
            node {
              id
              frontmatter {
                thumbnail_image {
                  image {
                    childImageSharp {
                      fluid(maxWidth: 1920, quality: 100) {
                        ...GatsbyImageSharpFluid_tracedSVG
                      }
                    }
                  }
                }
                date(formatString: "MMMM D, YYYY")
                description
                title
              }
              fields {
                slug
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

        // Skip this post if it's the current post,
        // or if we're at the last one and haven't skipped one
        // (the query pulls 4 posts but only needs 3)
        if (edge.node.id === props.current || (skipped === false && edgeIndex > 2)) {
          skipped = true;
          return(null);
        } else {
          return (
            <StyledPostsSection
              key={edge.node.id}
              className="gel-homepage-post column"
            >
              <Link
                  to={edge.node.fields.slug}
                  className="gel-homepage-featured-link"
                >
                <PreviewCompatibleImage
                  imageInfo={
                    edge.node.frontmatter.thumbnail_image
                  }
                  className="gel-homepage-featured-image"
                />

                <div className="gel-homepage-featured-text-container">
                  <h2>{edge.node.frontmatter.title}</h2>
               {/*<h6>{edge.node.frontmatter.date}</h6>*/}
                  <p>{edge.node.frontmatter.description}</p>
                  <button className="button gel-button-2 is-primary">Read More</button>
                </div>
              </Link>
            </StyledPostsSection>
          );
        }
      });
    }}
  />
);

export default HomePageBlogFeatures;
