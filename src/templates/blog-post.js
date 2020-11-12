import React from 'react'
import PropTypes from 'prop-types'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { graphql, Link, navigate } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import Content, { HTMLContent } from '../components/Content'

import HomePageBlogFeatures from '../components/HomePageBlogFeatures';
import NewsletterForm from '../components/NewsletterForm'
import AvatarButton from '../components/AvatarButton'

const StyledBlogPost = styled.article`
  margin-top: 200px;

  .gel-blog-post-info {

    h1 {
      text-align: left;

      font-family: ${props => props.theme.secondaryFont};
      font-weight: lighter;
      font-size: 5.4rem;
    }

    .gel-blog-meta {
      font-family: ${props => props.theme.secondaryFont};
      font-weight: lighter;
      font-size: 2.4rem;
      color: ${props => props.theme.typeGrey};

      .gatsby-image-wrapper {
        width: 56px;
        float: left;
        margin: 0 10px 0 0;
      }

      p { margin: 0; }
      p ~ p { font-size: 1.6rem; }

      span {
        margin-left: 6px;
        color: ${props => props.theme.typeGrey};
        font-weight: lighter;
        
        cursor: pointer;
        transition: 300ms;

        :hover {
          text-decoration: none;
          color: ${props => props.theme.black};
          text-shadow: 0px 0px 0px ${props => props.theme.black};
        }
      }
    }
  }

  .gel-blog-content {
    font-family: ${props => props.theme.regularFont};
    font-weight: lighter;
    font-size: 2.4rem;

    h1, h2, h3, h4, h5, h6 {
      font-family: ${props => props.theme.secondaryFont};
      font-weight: lighter;
    }

    blockquote {
      margin: 4rem auto !important;
      text-align: center;
      line-height: normal;

      font-family: ${props => props.theme.secondaryFont};
      font-weight: bold;
      font-size: 0;
      color: ${props => props.theme.orange};

      background: none;
      border: none;

      p, ::before, ::after { font-size: 2.8rem; }

      p { display: inline; }

      ::before { content: '"' } 
      ::after { content: '"' } 
    }
  }

  .gatsby-image-wrapper {
    margin-top: 4rem;
    margin-bottom: 4rem;

    &.gel-blog-banner { margin-top: 0; }
  }

  .gel-blog-moreposts-section {
    background: url(/img/blu_background-02-02.png) top center / cover no-repeat;
    padding: 175px 0 0;
    color: ${props => props.theme.white};

    > h2 {
      margin-bottom: 40px;

      font-family: ${props => props.theme.secondaryFont};
      font-style: lighter;
      font-size: 4.5rem;
    }

    > p {
      font-size: 1.6rem;
    }

    > div {
      justify-content: space-between;

      margin: 30px auto 0;

      a {
        color: ${props => props.theme.white};

        :hover {
          color: ${props => props.theme.white};
        }
      }
    }
  }

  .blog-newsletter-form-section {
    background: ${props => props.theme.darkBlue};
    padding: 175px 0 0;
    color: ${props => props.theme.white};

    h2 { font-family:  ${props => props.theme.secondaryFont}; }
    h2 + h2::after {
      content: "";
      display: block;
      width: 5%;
      height: 4px;
      
      margin: 20px auto 50px;
      background: ${props => props.theme.white};
    }

    p {
      max-width: 75rem;
      margin: 10px auto 20px;
      font-family:  ${props => props.theme.secondaryFont};
    }

    .gel-newsletter-form {
      display: flex;
      justify-content: space-between;
      max-width: 550px;
      margin: 0 auto;

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
        background-color: ${props => props.theme.orange};
        font-family: ${props => props.theme.secondaryFont};
        font-size: 2.4rem;
        width: 100%;
      }
    
      [type="email"] {
        max-width: 380px;
        padding: 2px 10px;
        margin: 0 0 10px;
    
        font-family: ${props => props.theme.secondaryFont};
        font-size: 2.4rem;
        color: ${props => props.theme.white};
    
        border: 1px solid ${props => props.theme.white};
        border-radius: 0;
        background: none;

        ::placeholder { color: ${props => props.theme.white}; }
      }
    }
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
  authorPic,
  date,
  bannerImage,
  avatarButton,
  helmet,
}) => {
  const PostContent = contentComponent || Content;

  let avatarButtonElement = ``;
  if (avatarButton) {
    avatarButtonElement = <section className="gel-blog-avatar has-text-centered">
                            <AvatarButton />
                            <hr />
                          </section>;
  }

  return (
    <StyledBlogPost className="section">
      {helmet || ''}
      <div className="container content">
        <section className="columns">
          <div className="column is-10 is-offset-1 has-text-left">
            <div className="gel-blog-post-info">
              <h1 className="title">
                {title}
              </h1>
              <aside className="gel-blog-meta">
                <PreviewCompatibleImage imageInfo={authorPic} />
                <p>By {author}</p>
                {tags && tags.length ? (
                  <>
                    <p>Category:
                      <span key={tags[0] + `tag`} onClick={event => {
                        // Navigate to blog page and pass tag to pre-fill search box
                        event.preventDefault()
                        navigate("/blog/", {state: {search: tags[0]}})
                      }}>{tags[0]}</span>
                    </p>
                  </>
                ) : null}
                
                {/*<p>Date: {date}</p> */}
              </aside>
            </div>
          </div>
        </section>
        <PreviewCompatibleImage imageInfo={bannerImage} className="gel-blog-banner" />
        <section className="columns">
          <div className="column is-10 is-offset-1 gel-blog-content">
            <p className="gel-blog-post-description">{description}</p>
            <PostContent content={content} />
            
          </div>
        </section>
        {avatarButtonElement}
        <section className="gel-blog-back has-text-centered">
          <Link to="/blog/" className="button gel-button-2">Back to Blog</Link>
        </section>
      </div>
      <section className="gel-blog-moreposts-section">
        <h2 className="has-text-centered">Recent Blog Posts</h2>
        <div className="container columns">
          <HomePageBlogFeatures current={id} />
        </div>
      </section>
      <section className="blog-newsletter-form-section is-centered">
        <div className="container has-text-centered">
          <p>Sign up now to receive our blog posts straight to your inbox. You’ll be first to know of promos 
             and early access to new branding masterclasses and marketing challenges.</p>
          <NewsletterForm layout="alt" />
        </div>
      </section>
    </StyledBlogPost>
  )
}

BlogPostTemplate.propTypes = {
  id: PropTypes.string,
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const BlogPost = ({ data }) => {
  const { id } = data.markdownRemark
  const { html } = data.markdownRemark
  const { frontmatter } = data.markdownRemark

  return (
    <Layout pageType="blog-post">
      <BlogPostTemplate
        id={id}
        content={html}
        contentComponent={HTMLContent}
        description={frontmatter.description}
        helmet={
          <Helmet
            titleTemplate="%s | Blog"
          >
            <title>{`${frontmatter.title}`}</title>
            <meta name="description" content={`${frontmatter.description}`} />
          </Helmet>
        }
        tags={frontmatter.tags}
        title={frontmatter.title}
        author={frontmatter.author}
        authorPic={frontmatter.authorPic}
        date={frontmatter.date}
        bannerImage={frontmatter.banner_image}
        avatarButton={frontmatter.avatarButton}
      />
    </Layout>
  )
}

BlogPost.propTypes = {
  data: PropTypes.shape({
    id: PropTypes.string,
    html: PropTypes.node.isRequired,
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
        authorPic {
          alt
          image {
            childImageSharp {
              fluid(maxWidth: 56, quality: 100) {
                ...GatsbyImageSharpFluid_tracedSVG
              }
            }
          }
        }
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
        avatarButton
      }
    }
  }
`
