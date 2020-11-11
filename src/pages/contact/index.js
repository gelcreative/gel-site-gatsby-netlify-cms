import React from "react";
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import styled from 'styled-components';

import Layout from '../../components/Layout';
import NewsletterForm from '../../components/NewsletterForm'
import ContactForm from '../../components/ContactForm'
import GelMap from '../../components/GelMap'

const StyledContactPage = styled.section`
  margin-top: 200px;
  padding-left: 0 !important;
  padding-right: 0 !important;

  .content {

    h1 {
      margin-bottom: 0;
      font-size: 5.4rem;
      font-weight: lighter;
    
      + h1 {
        margin-top: 10px;

        :after {
          content: "";
          display: block;
          width: 5%;
          height: 4px;
      
          margin: 30px auto 50px;
          background: ${props => props.theme.black};
        }
      }
    }
  }

  .gel-newsletter {
    padding-top: 175px;
    background: url(/img/orange_background-01.png) center top no-repeat;

    color: ${props => props.theme.white};
    text-align: center;

    h2 {
      color: ${props => props.theme.white};
      font-family: ${props => props.theme.secondaryFont};
      font-weight: lighter;
      font-size: 4.1rem;
    }

    p {
      max-width: 45rem;
      margin: auto;
      font-size: 2.0rem;
    }

    .gel-newsletter-form {
      max-width: 60rem;
      margin: 20px auto 0;
    
      [type="email"] {
        border: unset;
        box-shadow: unset;
        margin-bottom: 10px;
        font-size: 2rem;
      }

      button {
        color: ${props => props.theme.orange};
        text-transform: uppercase;
        font-size: 1.8rem;

        background: ${props => props.theme.white};
        border-radius: 6px;

        :hover {
          background: ${props => props.theme.lightGrey};
        }
      }
    }
  }

  .gel-newsletter:after {
    content: "";
    display: block;
    width: 100%;
    height: 50px;

    background: ${props => props.theme.neonOrange};
  }

  .gel-map {
    position: relative;
    z-index: 0;
  }

  @media (max-width: 768px) {
    .gel-contact-image-row img {
      margin-top: 3rem;
    }
  }

  @media (min-width: 769px) {
    .columns.gel-map-row {
      margin-bottom: 10rem;
    }
  }
`

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  render() {
    const {data} = this.props

    return (
      <Layout>
        <StyledContactPage className="section">
          <div className="content container">
            <h1>Looking to grow your business?</h1>
            <h1>We can help.</h1>
            <ContactForm />
          </div>
          <div className="gel-newsletter">
            <h2>Because Marketing Matters.</h2>
            <p>Sign up for marketing insights, early access to coaching programs and online courses, and a bevvie for anyone who drops by the office!</p>
            <NewsletterForm />
          </div>
          <div className="gel-map">
            <GelMap />
          </div>
        </StyledContactPage>
      </Layout>
    );
  }
}

export const query = graphql`
  query {
    file(relativePath: {eq: "gel-boardroom.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 900, quality: 100) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`