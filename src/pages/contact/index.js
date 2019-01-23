import React from "react";
import { navigate } from "gatsby-link";
import Img from 'gatsby-image'
import { graphql } from 'gatsby'
import styled from 'styled-components'
import Layout from '../../components/Layout'

const StyledContactPage = styled.section`
  background: #ffffff;
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

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

export default class Index extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isValidated: false };
  }

  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    const form = e.target;
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: encode({
        "form-name": form.getAttribute("name"),
        ...this.state
      })
    })
      .then(() => navigate(form.getAttribute("action")))
      .catch(error => alert(error));
  };

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
                <form
                  name="contact"
                  method="post"
                  action="/contact/thanks/"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={this.handleSubmit}
                  className="gel-newsletter-form"
                >
                  {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
                  <input type="hidden" name="form-name" value="contact" />
                  <div hidden>
                    <label>
                      Don’t fill this out:{" "}
                      <input name="bot-field" onChange={this.handleChange} />
                    </label>
                  </div>
                  <div className="field">
                    <label className="label visually-hidden" htmlFor={"email"}>Email</label>
                      <div className="control">
                        <input className="input" type={"email"} name={"email"} onChange={this.handleChange} id={"email"} placeholder={"Email Address"} required={true} />
                      </div>
                  </div>
                  <div className="field">
                    <button className="button is-dark is-large gel-button-1" type="submit">Send</button>
                  </div>
                </form>
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