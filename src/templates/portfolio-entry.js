import React, { createElement } from 'react'
import Helmet from 'react-helmet'
import PropTypes from 'prop-types'
import { Link, graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../components/Layout'
import HomePagePortfolioFeatures from '../components/HomePagePortfolioFeatures';

import PreviewCompatibleImage from '../components/PreviewCompatibleImage'
import PortfolioEntryImages from '../components/PortfolioEntryImages'

const StyledPortfolioEntry = styled.article`
  > .container {
    margin-top: 150px;
    font-weight: lighter;
    font-size: 2.4rem;

    .gel-portfolio-entry-masthead {
      h1 {
        font-family: ${props => props.theme.secondaryFont};
        font-weight: lighter;
        font-size: 5.4rem;

        text-align: left;
        color: ${props => props.theme.black};
      }
    }

    .gel-project-intro-section {

      .columns { justify-content: space-between; }

      .project-info {
        max-width: 400px;

        h6 {
          margin: 30px 0 0px;
          color: ${props => props.theme.grey};
        }
      }

      .project-intro {
        max-width: 620px;

        p { margin-bottom: 20px;}
      }
    }

    .gel-portfolio-entry-main {
      padding-bottom: 250px;
      overflow: hidden;

      .columns {
        margin-bottom: 100px;
        justify-content: space-around;

        .column {
          max-width: 630px;

          p { margin-bottom: 20px; }
        }
      }

      .gel-portfolio-entry-main-images {
        position: relative;

        .gel-project-image-inner {
          width: 50%;
          position: relative;
          top: 100px;
          left: 50px;

          + .gel-project-image-inner {
            position: absolute;
            top: 0px;
            left: unset;
            right: 50px;
          }
        }
      }
    }

    .gel-portfolio-entry-secondary {
      p {
        position: relative;
        top: 50%;
        transform: translateY(-50%);
      }
    }

    .gel-portfolio-entry-testimonial {

      h2 {
        margin-bottom: 10px;

        font-family: ${props => props.theme.secondaryFont};
        font-weight: lighter;
        font-size: 3.6rem;
      }

      > p {
        max-width: 60rem;
        margin: 0 auto 20px;

        font-weight: regular;
        font-size: 2.0rem;

        ::before, ::after {
          content: '"'
        }
      }

      cite {
        font-family: ${props => props.theme.secondaryFont};
        font-style: normal;
        font-size: 1.8rem;

        p:first-of-type { font-size: 2.4rem; }
      }
    }

    .gel-portfolio-images-2 {
      display: flex;
      justify-content: space-between;

      margin: 50px auto;

      .gel-project-image-inner {
        flex-basis: 32%;
        
        .gatsby-image-wrapper { height: 320px; }
      }
    }

    section {
      margin: 3rem 0;
    }
  }

  .gel-portfolio-morework-section {
    background: url(/img/blu_background-02-02.png) top center / cover no-repeat;
    padding: 175px 0 0;
    color: ${props => props.theme.white};

    h2 {
      margin-bottom: 40px;

      font-family: ${props => props.theme.secondaryFont};
      font-style: lighter;
      font-size: 5.4rem;
    }

    > div {
      display: flex;
      justify-content: space-between;

      max-width: 1700px;
      margin: 0 auto;
    }
  }
`

export const PortfolioEntryTemplate = ({
  projectType,
  title,
  client,

  services,
  projectIntro,
  projectMain,
  projectSecondary,
  testimonial,

  featuredImage,
  logoImage,
  headerImage,
  websiteImages,
  brandImages,
  projectImages1,
  projectImages2,
  helmet,
}) => {

  // Assemble project type-specific content
  let mainImages = ""
  let testimonialContent = ""
  if (projectType == "website") {
    mainImages = <PortfolioEntryImages portfolioImages={websiteImages} />
    let testimonialCredit = testimonial.credit.map((credit, index) => <p key={index}>{credit}</p>)
    testimonialContent = (
      <section className="gel-portfolio-entry-testimonial has-text-centered">
        <h2>What our Customers Say</h2>
        <p>{testimonial.content}</p>
        <cite>{testimonialCredit}</cite>
      </section>
    )
  } else if (projectType == "brand") {
    mainImages = <PortfolioEntryImages portfolioImages={brandImages} />
    testimonialContent = ""
  }

  // Create services list
  let servicesList = services.map((service, index) => {
    return <li key={index}>{service}</li>
  })

  // Parse intro text as paragraphs
  let parsedIntro = projectIntro.map((paragraph, index) => {
    return <p key={index}>{paragraph}</p>
  })
  
  // Assemble project main text into two columns
  let mainColumns = "";
  if (projectMain !== null) {
    let content1 = []
    let content2 = []

    // Put the first half of the paragraphs into
    // the first column, and put the second half
    // into the second column.
    projectMain.map((paragraph, index) => {
      if ((index + 1) <= (projectMain.length / 2)) {
        content1.push(createElement("p", { key: index }, paragraph));
      } else {
        content2.push(createElement("p", { key: index }, paragraph));
      }
    })

    let col1 = createElement("div", { key: 'col1', className: 'column'}, content1)
    let col2 = createElement("div", { key: 'col2', className: 'column'}, content2)

    // Put the columns together into one div.
    mainColumns = createElement("div", { key: 'mainColumns', className: 'columns gel-portfolio-entry-main-text'}, [col1, col2])
  }

  return (
    <StyledPortfolioEntry className="section">
      { helmet || '' }
      <div className="container">
        <section className="section gel-portfolio-entry-masthead">
          <div className="columns is-centered">
            <div className="column has-text-left">
              <h1>{title}</h1>
              <PreviewCompatibleImage imageInfo={featuredImage} />
            </div>
          </div>
        </section>
        <section className="gel-project-intro-section">
          <div className="columns">
            <div className="column project-info">
              <img src={logoImage.image.childImageSharp.fluid.src} alt={logoImage.alt} />
              <h6>Client</h6>
              <p>{client}</p>
              <h6>Services</h6>
              <ul>{servicesList}</ul>
            </div>
            <div className="column project-intro">
              {parsedIntro}
            </div>
          </div>
        </section>
        <section className="gel-portfolio-featured-image">
          <PreviewCompatibleImage imageInfo={headerImage} />
        </section>
        <section className="gel-portfolio-entry-main">
          {mainColumns}
          <div className="gel-portfolio-entry-main-images">
            {mainImages}
          </div>
        </section>
        <section className="gel-portfolio-entry-secondary">
          <div className="columns">
            <div className="column gel-portfolio-images-1">
              <PortfolioEntryImages portfolioImages={projectImages1} />
            </div>
            <div className="column">
              <p>{projectSecondary}</p>
            </div>
          </div>
        </section>
        {testimonialContent}
        <section className="gel-portfolio-images-2">
          <PortfolioEntryImages portfolioImages={projectImages2} />
        </section>
      </div>
      <section className="gel-portfolio-morework-section is-centered has-text-centered">
        <h2>See More Work</h2>
        <div>
          <HomePagePortfolioFeatures />
        </div>
      </section>
    </StyledPortfolioEntry>
  )
}

PortfolioEntryTemplate.propTypes = {
  projectType: PropTypes.string,
  title: PropTypes.string,
  client: PropTypes.string,

  services: PropTypes.array,
  projectIntro: PropTypes.array,
  projectMain: PropTypes.array,
  projectSecondary: PropTypes.array,
  testimonial: PropTypes.oneOfType([PropTypes.string, PropTypes.array]),

  featuredImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  thumbnailImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  logoImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  headerImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  websiteImages: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  brandImages: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  projectImages1: PropTypes.array,
  projectImages2: PropTypes.array,
}

const PortfolioEntry = ({ data }) => {
  const { frontmatter } = data.markdownRemark
  return (
    <Layout pageType="portfolio-entry">
      <PortfolioEntryTemplate
        projectType={frontmatter.project_type}
        title={frontmatter.title}
        client={frontmatter.client}

        services={frontmatter.services}
        projectIntro={frontmatter.project_intro}
        projectMain={frontmatter.project_main}
        projectSecondary={frontmatter.project_secondary}
        testimonial={frontmatter.testimonial}

        featuredImage={frontmatter.featured_image}
        logoImage={frontmatter.logo_image}
        headerImage={frontmatter.header_image}
        websiteImages={frontmatter.website_images}
        brandImages={frontmatter.brand_images}
        projectImages1={frontmatter.project_images_1}
        projectImages2={frontmatter.project_images_2}
        helmet={
          <Helmet
            titleTemplate="%s | Gel Marketing"
          >
            <title>{`${frontmatter.title}`}</title>
            <meta name="description" content={`${frontmatter.project_intro}`} />
          </Helmet>
        }
      />
    </Layout>
  )
}

PortfolioEntry.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  })
}

export default PortfolioEntry

export const pageQuery = graphql`
  query PortfolioEntryByID($id: String!) {
    markdownRemark(id: {eq: $id}) {
    id
    frontmatter {
      project_type
      title
      client

      services
      project_intro
      project_main
      project_secondary
      testimonial {
        content
        credit
      }

      featured_image {
        image {
          childImageSharp {
            fluid (maxWidth: 500, quality: 100) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
      logo_image {
        image {
          childImageSharp {
            fluid (maxWidth: 500, quality: 100) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
      header_image {
        image {
          childImageSharp {
            fluid (maxWidth: 500, quality: 100) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
      website_images {
        image {
          id
          childImageSharp {
            fluid(maxWidth: 1920, quality: 100) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
      brand_images {
        image {
          id
          childImageSharp {
            fluid(maxWidth: 1920, quality: 100) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
      project_images_1 {
        image {
          id
          childImageSharp {
            fluid(maxWidth: 1920, quality: 100) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
      project_images_2 {
        image {
          id
          childImageSharp {
            fluid(maxWidth: 1920, quality: 100) {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    }
  }
  }
`;