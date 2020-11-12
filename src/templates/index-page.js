import React, { createElement } from 'react';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../components/Layout';
//import ScrollyDo from '../components/ScrollyDo';
import HomePagePortfolioFeatures from '../components/HomePagePortfolioFeatures';
import HomePageBlogFeatures from '../components/HomePageBlogFeatures';
//import ClientLogoGrid from '../components/ClientLogoGrid';
//import GelServices from '../components/GelServices';
import CallButton from '../components/CallButton';
import NewsletterForm from '../components/NewsletterForm'

const StyledHomePage = styled.article`

  #gel-home-masthead {
    display: flex;
    flex-direction: column-reverse;
    
    height: 65vh;
    padding: 10rem 0;

    background: url(/img/5S0A7042.png) center / cover no-repeat;
  }

  #gel-home-masthead h1 {
  
    max-width: 12em;

    color: ${props => props.theme.white};
    text-align: left;
    letter-spacing: 1.63px;
    line-height: 7.5rem;

    font-size: 6.5rem;
    font-weight: bold;
    font-family: ${props => props.theme.secondaryBoldFont};

    :before {
      content: "";
      display: block;
      width: 15%;
      height: 4px;
  
      margin-bottom: 20px;
      background: ${props => props.theme.white};
    }
  }

  #gel-home-intro-section {
    height: 35vh;
    padding-top: 3rem;

    h2 {
      margin-bottom: 15px;

      font-size: 5.4rem;
      font-weight: lighter;
      font-family: ${props => props.theme.secondaryFont};
    }

    p {
      max-width: 50rem;
      margin: auto;

      font-size: 2.0rem;
      font-family: ${props => props.theme.regularFont};

      :before {
        content: "";
        display: block;
        width: 15%;
        height: 4px;
    
        margin: 0 auto 20px;
        background: ${props => props.theme.black};
      }
    }
  }

  .gel-home-featured-section {
    padding: 300px 0 300px;
    margin: 10px 0 -50px;

    background: url(/img/homepage_blue_background.png) center / cover no-repeat;
    color: ${props => props.theme.white};

    h2 {
      font-family: ${props => props.theme.secondaryFont};
      font-weight: lighter;
      font-size: 4.5rem;
    }

    .gel-portfolio-section {
      justify-content: space-between;

      margin: 30px auto 0;
    }

    .gel-testimonial-section {


      h3 {
        font-family: ${props => props.theme.secondaryFont};
        font-weight: bold;
        font-size: 3.2rem;
      }

      .gel-testimonial-item {
        position: relative;
        height: 0px;
        transition: 0.4s ease-out;
        overflow: hidden;

        &.active { height: 500px; }

        p {
          max-width: 65rem;
          margin: 30px auto;
          font-size: 1.6rem;
    
        }
    
        cite p {
          margin: 5px auto;
          font-family: ${props => props.theme.secondaryFont};
          font-weight: lighter;
          font-style: normal;
          font-size: 2.4rem;
    
          & + p { font-size: 1.8rem; }
        }
      }

      #gel-testimonial-controls {
        display: flex;
        justify-content: space-between;
        width: 90%;
        max-width: 75rem;
        margin: 0 auto -22px;

        button {
          width: 40px;
          height: 40px;

          border: none;
          background: url(/img/icon_arrow_left2.png) center / contain no-repeat;

          + button { background-image: url(/img/icon_arrow_right2.png); }
        }
      }

      #gel-testimonial-timebar {
        width: 90%;
        max-width: 75rem;
        height: 3px;
        border: 50px solid ${props => props.theme.darkBlue};
        border-top: 0px;
        border-bottom: 0px;
        margin: 0 auto 0;

        background: ${props => props.theme.typeGrey} url(/img/orange.png) center / 0% 100% no-repeat;
        animation: timebar 15s linear;
      }

      @keyframes timebar {
        from { background-size: 100% 100%; }
        to   { background-size: 0% 100%; }
      }
    }

    .gel-testimonial-section + h2 {
      font-family: ${props => props.theme.secondaryFont};
      font-weight: bold;
      font-size: 4.8rem;

      :before {
        content: "";
        display: block;
        width: 5%;
        height: 4px;
    
        margin: 75px auto 20px;
        background: ${props => props.theme.white};
      }

      + p { max-width: 25rem; margin: 10px auto 30px; }
    }
  }

  .gel-home-blog {
    
    > h2 {
      font-family: ${props => props.theme.secondaryFont};
      font-weight: lighter;
      font-size: 4.5rem;
    }

    .gel-home-blog-section {
      justify-content: space-between;

      margin: 30px auto 0;
    }
  }

  .gel-newsletter-form-section {
    background: url(/img/blu_background-02-02.png) top center / cover no-repeat;
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

  @media(max-width: 768px){
    .gel-home-featured-section {
      h2 {
        margin-bottom:-2rem;                       
      }
    }
  }

  @media (max-width: 450px) {
    .gel-home-intro-text .column {
      max-width: 90%;
    }
    .gel-home-intro-text p {
      font-size: 1.8rem;
    }
  }
`;

export const IndexPageTemplate = ({
  helmet,
  title,
  intro1,
  intro2,
  featuredPortfolioTitle,
  featuredPortfolioTestimonialTitle,
  featuredPortfolioTestimonialContent1,
  featuredPortfolioTestimonialAuthor1,
  featuredPortfolioTestimonialContent2,
  featuredPortfolioTestimonialAuthor2,
  featuredPortfolioTestimonialContent3,
  featuredPortfolioTestimonialAuthor3,
  featuredPortfolioSubtitle,
  featuredPortfolioCTA,
}) => {

  // Parse testimonial content
  // Testimonial 1
  let testimonialContent1 = featuredPortfolioTestimonialContent1.map((paragraph, index) => {
    return <p key={index} className="has-text-left">{paragraph}</p>
  })
  let testimonialAuthor1Titles = featuredPortfolioTestimonialAuthor1.map((paragraph, index) => {
    return <p key={index}>{paragraph}</p>
  })
  let testimonialAuthor1 = createElement("cite", { key: 'author1'}, testimonialAuthor1Titles)

  // Testimonial 2
  let testimonialContent2 = featuredPortfolioTestimonialContent2.map((paragraph, index) => {
    return <p key={index} className="has-text-left">{paragraph}</p>
  })
  let testimonialAuthor2Titles = featuredPortfolioTestimonialAuthor2.map((paragraph, index) => {
    return <p key={index}>{paragraph}</p>
  })
  let testimonialAuthor2 = createElement("cite", { key: 'author2'}, testimonialAuthor2Titles)

  // Testimonial 3
  let testimonialContent3 = featuredPortfolioTestimonialContent3.map((paragraph, index) => {
    return <p key={index} className="has-text-left">{paragraph}</p>
  })
  let testimonialAuthor3Titles = featuredPortfolioTestimonialAuthor3.map((paragraph, index) => {
    return <p key={index}>{paragraph}</p>
  })
  let testimonialAuthor3 = createElement("cite", { key: 'author3'}, testimonialAuthor3Titles)

  // Assemble testimonials.
  let testimonialAssembled1 = createElement("div", { key: 'testimonial1', id: 'testimonial1', className: 'gel-testimonial-item' }, [testimonialContent1, testimonialAuthor1])
  let testimonialAssembled2 = createElement("div", { key: 'testimonial2', id: 'testimonial2', className: 'gel-testimonial-item' }, [testimonialContent2, testimonialAuthor2])
  let testimonialAssembled3 = createElement("div", { key: 'testimonial3', id: 'testimonial3', className: 'gel-testimonial-item' }, [testimonialContent3, testimonialAuthor3])

  // Create testimonial timer. (make sure it's not already running)
  clearInterval(testimonialTimer);
  let testimonialTimer = setTimeout(testimonialSwap, 1);

  // Track which testimonial is currently displayed.
  let testimonialIndex = 0;

  // Create timebar element.
  let testimonialTimebar = document.createElement("aside");
  testimonialTimebar.id = "gel-testimonial-timebar";

  function testimonialSwap (reverse = false) {
    if (document.querySelector('#testimonial1') != null) {
      // Stop timer if it's still running (just in case).
      clearTimeout(testimonialTimer);

      // Remove class from the current testimonial (if there is one).
      if (testimonialIndex) {
        document.querySelector('#testimonial' + testimonialIndex).classList.remove("active");
      }

      // Check which direction we're going in (used by control buttons)
      if (reverse) {
        if (testimonialIndex > 1) testimonialIndex -= 1;
          else testimonialIndex = 3;
      } else {
        if (testimonialIndex < 3) testimonialIndex += 1;
          else testimonialIndex = 1;
      }

      // Add class to the next testimonial.
      document.querySelector('#testimonial' + testimonialIndex).classList.add("active");

      // Remove and re-create the timebar. This will cleanly reset the animation.
      document.querySelector('.gel-testimonial-section > #gel-testimonial-timebar').remove();
      document.querySelector('.gel-testimonial-section').append(testimonialTimebar);

      // Reset timer.
      testimonialTimer = setTimeout(testimonialSwap, 15000);
    }
  }

  return (
    <StyledHomePage className="section">
      {helmet || ''}
      <div>
        <section
          className="gel-home-masthead"
          id="gel-home-masthead"
        >
          <div className="column is-10 is-offset-1">
            <h1>{title}</h1>
          </div>
        </section>
        <section
          className="gel-home-intro-text has-text-centered"
          id="gel-home-intro-section"
        >
          <div className="column is-10 is-offset-1">
            <h2>{intro1}</h2>
            <p>{intro2}</p>
          </div>
        </section>
        <section className="is-centered has-text-centered gel-home-featured-section">
          <h2 className="has-text-centered">
            {featuredPortfolioTitle}
          </h2>
          <section className="gel-portfolio-section container columns"><HomePagePortfolioFeatures /></section>
          <section className="gel-testimonial-section container ">
            <h3>{featuredPortfolioTestimonialTitle}</h3>
            {testimonialAssembled1}
            {testimonialAssembled2}
            {testimonialAssembled3}
            <aside id="gel-testimonial-controls">
              <button id="gel-testimonial-control-back"    onClick={testimonialSwap.bind(this, true)}></button>
              <button id="gel-testimonial-control-forward" onClick={testimonialSwap.bind(this, false)}></button>
            </aside>
            <aside id="gel-testimonial-timebar"></aside>
          </section>
          <h2>{featuredPortfolioSubtitle}</h2>
          <p>{featuredPortfolioCTA}</p>
          <CallButton layout="alt" />
        </section>
        <section className="gel-home-blog has-text-centered">
          <h2>Featured Blog Posts</h2>
          <div className="gel-home-blog-section container columns is-centered has-text-left"><HomePageBlogFeatures /></div>
        </section>
        <section className="gel-newsletter-form-section is-centered">
        <div className="container has-text-centered">
          <p>Sign up now to receive our blog posts straight to your inbox. You’ll be first to know of promos 
             and early access to new branding masterclasses and marketing challenges.</p>
          <NewsletterForm layout="alt" />
        </div>
      </section>
      </div>
    </StyledHomePage>
  );
};

IndexPageTemplate.propTypes = {
  helmet: PropTypes.object,
  title: PropTypes.string,
  services: PropTypes.array,
  intro1: PropTypes.string,
  intro2: PropTypes.string,
  featuredPortfolioTitle: PropTypes.string,
  featuredPortfolioTestimonialTitle: PropTypes.string,
  featuredPortfolioTestimonialContent1: PropTypes.array,
  featuredPortfolioTestimonialAuthor1: PropTypes.array,
  featuredPortfolioTestimonialContent2: PropTypes.array,
  featuredPortfolioTestimonialAuthor2: PropTypes.array,
  featuredPortfolioTestimonialContent3: PropTypes.array,
  featuredPortfolioTestimonialAuthor3: PropTypes.array,
  featuredPortfolioSubtitle: PropTypes.string,
  featuredPortfolioCTA: PropTypes.string,
};

const IndexPage = ({ data }) => {
  const { siteMetadata: metadata } = data.site;
  const { frontmatter } = data.markdownRemark;

  return (
    <Layout pageType="home">
      <IndexPageTemplate
        helmet={
          <Helmet title={`${metadata.title}`}>
            <meta name="description" content={`${metadata.description}`} />
          </Helmet>
        }
        title={frontmatter.title}
        intro1={frontmatter.intro1}
        intro2={frontmatter.intro2}
        featuredPortfolioTitle={frontmatter.featuredPortfolioTitle}
        featuredPortfolioTestimonialTitle={frontmatter.featuredPortfolioTestimonialTitle}
        featuredPortfolioTestimonialContent1={frontmatter.featuredPortfolioTestimonialContent1}
        featuredPortfolioTestimonialAuthor1={frontmatter.featuredPortfolioTestimonialAuthor1}
        featuredPortfolioTestimonialContent2={frontmatter.featuredPortfolioTestimonialContent2}
        featuredPortfolioTestimonialAuthor2={frontmatter.featuredPortfolioTestimonialAuthor2}
        featuredPortfolioTestimonialContent3={frontmatter.featuredPortfolioTestimonialContent3}
        featuredPortfolioTestimonialAuthor3={frontmatter.featuredPortfolioTestimonialAuthor3}
        featuredPortfolioSubtitle={frontmatter.featuredPortfolioSubtitle}
        featuredPortfolioCTA={frontmatter.featuredPortfolioCTA}
      />
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
};

export default IndexPage;

export const indexPageQuery = graphql`
  query HomePage($id: String!) {
    markdownRemark(id: { eq: $id }) {
      frontmatter {
        title
        intro1
        intro2
        featuredPortfolioTitle
        featuredPortfolioTestimonialTitle
        featuredPortfolioTestimonialContent1
        featuredPortfolioTestimonialAuthor1
        featuredPortfolioTestimonialContent2
        featuredPortfolioTestimonialAuthor2
        featuredPortfolioTestimonialContent3
        featuredPortfolioTestimonialAuthor3
        featuredPortfolioSubtitle
        featuredPortfolioCTA
      }
    }
    site {
      siteMetadata {
        title
        description
      }
    }
  }
`;
