import React from "react";
import { navigate } from "gatsby-link";
import Img from 'gatsby-image';
import { graphql } from 'gatsby';
import styled from 'styled-components';
import Layout from '../../components/Layout';
import NewsletterForm from '../../components/NewsletterForm'

const StyledContactPage = styled.section`
  margin-top: 100px;
  address {
    font-style: normal;
    margin-top: 2rem;
  }
  .column {
    padding: 2rem;
  }
  .gel-contact-details-column {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .gel-contact-details {
    font-size: 2rem;
    margin-bottom: 2rem;
    line-height: 1.3;
  }
  .gel-contact-details h2 {
    font-size: 2rem;
    margin-bottom: 0;
  }

  .gel-newsletter-form [type="email"] {
    border: unset;
    box-shadow: unset;
    border-bottom: 1px solid ${props => props.theme.typeGrey};
    border-radius: 0;
    margin-bottom: 10px;
    font-size: 2rem;
    text-transform: uppercase;
    padding-left: 0;
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
          <div className="container">
            <div className="content">
            <div className="columns">
              <h1 className="visually-hidden">Contact Gel</h1>
              <div className="column">
                <Img fluid={data.file.childImageSharp.fluid} />
              </div>
              <div className="column gel-contact-details-column">
                <div className="gel-contact-details">
                  <h2>Become a client</h2>
                  <a href="mailto:connect@gelmarketing.ca">connect@gelmarketing.ca</a>
                </div>
                <div className="gel-contact-details">
                  <h2>Contact us</h2>
                  <a href="tel:+17057277980">705.727.7980</a>
                  <address>89 Collier Street, Suite 201 <br />Barrie, ON L4M 1H2</address>
                </div>
                <div className="gel-contact-details">
                  <h2>Get on the list</h2>
                  <p>Find out what we're working on, <br />get event invites, and other fun things.</p>
                </div>
                <NewsletterForm />
              </div>
            </div>
        </div>
        </div>
        </StyledContactPage>
      </Layout>
    );
  }
}

export const query = graphql`
  query {
    file(relativePath: {eq: "gel-contact-map.jpg"}) {
      childImageSharp {
        fluid(maxWidth: 900, quality: 100) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`