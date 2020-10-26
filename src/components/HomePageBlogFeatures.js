import React from 'react';
import { Link, StaticQuery, graphql } from 'gatsby';
import styled from 'styled-components';
import PreviewCompatibleImage from './PreviewCompatibleImage';

const StyledPostsSection = styled.div`
  max-width: 530px;
  flex-basis: 32%;


  h2 {
    font-family: ${props => props.theme.secondaryFont};
    font-weight: lighter;
    font-size: 3.8rem;
  }

  h6 {
    margin: 0 0 30px;
    font-family: ${props => props.theme.regularFont};
    font-weight: regular;
    font-size: 1.8rem;
    letter-spacing: 1.5px;
  }

  p {
    margin: 0 0 20px;
    font-family: ${props => props.theme.regularFont};
    font-weight: lighter;
    font-size: 1.8rem;
  }
`;

const HomePageBlogFeatures = () => (
  <StaticQuery
    query={graphql`
      query HomePageBlogFeatures {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] },
          filter: { frontmatter: { templateKey: { eq: "blog-post" } }},
          limit: 3
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
      return edges.map(edge => {
        return (
          <StyledPostsSection
            key={edge.node.id}
            className="gel-homepage-post"
          >
            <div className="">
              <PreviewCompatibleImage
                imageInfo={
                  edge.node.frontmatter.thumbnail_image
                }
                className="gel-homepage-featured-image"
              />

              <div className="gel-homepage-featured-text-container">
                <h2>{edge.node.frontmatter.title}</h2>
                <h6>{edge.node.frontmatter.date}</h6>
                <p>{edge.node.frontmatter.description}</p>
                <button className="button gel-button-2 is-primary"><Link to={edge.node.fields.slug}></Link>Read the Blog</button>
              </div>
            </div>
          </StyledPostsSection>
        );
      });
    }}
  />
);

export default HomePageBlogFeatures;
