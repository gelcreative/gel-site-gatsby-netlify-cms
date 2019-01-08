import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'
import PreviewCompatibleImage from '../components/PreviewCompatibleImage'

export const AboutPageTemplate = ({
  id,
  title,
  intro, 
  main,
  approach,
}) => {

  return (
    <section className="section section--gradient">
      <div className="container">
        <div className="columns">
          <div className="column is-10 is-offset-1">
            <div className="section">
              <h2 className="title is-size-3 has-text-weight-bold is-bold-light">
                {title}
              </h2>
              <p>ID: {id}</p>
              <ul>
                <li>{intro}</li>
                <li>{approach.heading}</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="columns">
          <div className="column">
            <PreviewCompatibleImage imageInfo={main.tom.image1} />
          </div>
          <div className="column">
            <p>{main.tom.tom_bio}</p>
          </div>
        </div>
      </div>
    </section>
  )
}

AboutPageTemplate.propTypes = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string,
  contentComponent: PropTypes.func,
}

const AboutPage = ({ data }) => {
  const { frontmatter, id } = data.markdownRemark

  return (
    <Layout>
      <AboutPageTemplate
        id={id}
        title={frontmatter.title}
        intro={frontmatter.about_intro}
        main={frontmatter.main}
        approach={frontmatter.approach}
      />
    </Layout>
  )
}

AboutPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default AboutPage

export const aboutPageQuery = graphql`
  query AboutPage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      frontmatter {
        title
        about_intro
        main {
          tom {
            image1 {
              image {
                childImageSharp {
                  fluid(maxWidth: 600, quality: 100) {
                    ...GatsbyImageSharpFluid
                  }
                }
              }
              alt
            }
            tom_bio
          }
        }
        approach {
          heading
          text
        }
      }
    }
  }
`
