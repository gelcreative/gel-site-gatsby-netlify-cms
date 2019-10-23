import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Content, { HTMLContent } from '../components/Content'
import NewsletterForm from '../components/NewsletterForm'

const StyledBlogPost = styled.article`
  margin-top: 200px;

  .gel-blog-post-info {
    margin-bottom: 4rem;
  }
  .gel-blog-meta span {
    font-family: ${props => props.theme.boldFont};
  }
  .styled-slashes {
    color: ${props => props.theme.orange};
    margin: 0 2%;
  }
  .gel-blog-post-description {
    font-size: 2.5rem;
    line-height: 1.5;
  }
  .gatsby-image-wrapper {
    margin-top: 4rem;
    margin-bottom: 4rem;
  }

  .blog-newsletter-form-section {
    margin-top: 50px;
    background-color: #e6e7e8;
    padding: 30px 7%;
  }

  .gel-newsletter-form {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    max-width: 500px;
    margin: 0 auto;
  }

  .field {
    display: inline-block;
  }

  .email-input {
    flex-grow: 2;
    margin: 5px;
  }

  .send-button {
    flex-grow: 1;
    margin: 5px;
  }

  .send-button button[type="submit"] {
    background-color: #00adc8;
    width: 100%;
  }

  [type="email"] {
    border-radius: 0;
    height: 40px;
    font-size: 1.6rem;
    color: #434244;
    text-transform: uppercase;
  }

  @media(min-width: 601px) {
    .gel-blog-meta br {
      display: none;
    }
  }
`

export const BlogPostTemplate = ({
  id,
  content,
  contentComponent,
  description,
  tags,
  title,
  author,
  date,
  bannerImage,
  helmet,
}) => {
  const PostContent = contentComponent || Content

  return (
    <StyledBlogPost className="section">
      {helmet || ''}
      <div className="container content">
        <section className="columns">
          <div className="column is-10 is-offset-1 has-text-centered">
            <div className="gel-blog-post-info">
              <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
                {title}
              </h1>
                <p className="gel-blog-meta">  
                  {tags && tags.length ? (
                    <>
                      <span>Category: </span>
                        <Link key={tags[0] + `tag`} to={`/tags/${kebabCase(tags[0])}/`}>{tags[0]}</Link>
                    </>
                  ) : null}
                  <span className="styled-slashes">&#47;&#47;</span>
                  <br />
                  <span>Author: </span>{author}
                  {/*<span className="styled-slashes">&#47;&#47;</span>
                  <br />
                   <span>Date </span>{date} */}
                </p>
            </div>
            <p className="gel-blog-post-description">{description}</p>
          </div>
        </section>
        <PreviewCompatibleImage imageInfo={bannerImage} />
        <section className="columns">
          <div className="column is-10 is-offset-1">
            <PostContent content={content} />
          </div>
        </section>
        <section className="columns blog-newsletter-form-section is-centered">
          <div className="column has-text-centered">
          <h2>Get our markteing blog post straight to your inbox.</h2>
            <NewsletterForm />
          </div>
        </section>
      </div>
    </StyledBlogPost>
  )
}

BlogPostTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { markdownRemark: post } = data

  return (
    <Layout>
      <BlogPostTemplate
        content={post.html}
        contentComponent={HTMLContent}
        description={post.frontmatter.description}
        helmet={
          <Helmet
            titleTemplate="%s | Blog"
          >
            <title>{`${post.frontmatter.title}`}</title>
            <meta name="description" content={`${post.frontmatter.description}`} />
          </Helmet>
        }
        tags={post.frontmatter.tags}
        title={post.frontmatter.title}
        author={post.frontmatter.author}
        date={post.frontmatter.date}
        bannerImage={post.frontmatter.banner_image}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default BlogPost

export const pageQuery = graphql`
  query BlogPostByID($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        date(formatString: "MM.DD.YY")
        title
        author
        banner_image {
          alt
          image {
            childImageSharp {
              fluid(maxWidth: 1920, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
        description
        tags
      }
    }
  }
`
