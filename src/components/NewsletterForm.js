import React from 'react';
import { navigate } from "gatsby-link";
import styled from 'styled-components'

const StyledContactForm = styled.form`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  
  max-width: 550px;
  margin: 0 auto;

  .field {
    display: inline-block;
  }

  .name-input,
  .email-input {
    margin: 5px;
  }

  .name-input {
    display: flex !important;
    justify-content: space-between;

    > * { flex-basis: 48%; }
  }

  .email-input {
    flex-grow: 2;
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

  [type="text"],
  [type="email"] {
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

  [name="opt-in"] {
    margin-right: 0.5em;
    vertical-align: middle;
  }

  @media screen and (max-width: 768px) {
    .email-input,
    .send-button {
      flex-grow: initial;
      flex-basis: 100%;
  }
`

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class NewsletterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isValidated: false,
      layout: props.layout,
    };
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
    // Handle layout here
  /*let emailOrder = 0;
    if (this.state.layout === "alt") emailOrder = 1;*/
    let submitText = "Subscribe"
    if (this.state.layout === "alt") submitText = "Sign me up!";

    return (
      <StyledContactForm
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
        <div className="field name-input">
          <label className="label visually-hidden" htmlFor={"fname"}>Name</label>
            <div className="control">
              <label htmlFor={"fname"} className="visually-hidden">Your First Name</label>
              <input className="input" type={"text"} name={"fname"} onChange={this.handleChange} id={"fname"} placeholder={"First Name"} required={true} />
            </div>
            <div className="control">
              <label htmlFor={"lname"} className="visually-hidden">Your Last Name</label>
              <input className="input" type={"text"} name={"lname"} onChange={this.handleChange} id={"lname"} placeholder={"Last Name"} required={true} />
            </div>
        </div>
        <div className="field email-input">
          <label className="label visually-hidden" htmlFor={"email"}>Email</label>
            <div className="control">
              <label htmlFor={"email"} className="visually-hidden">Your Email Address</label>
              <input className="input" type={"email"} name={"email"} onChange={this.handleChange} id={"email"} placeholder={"Email Address"} required={true} />
              <div className="gel-checkbox-container">
                <input type={"checkbox"} value={"true"} name={"opt-in"} onChange={this.handleChange} id={"opt-in"} required={true} />
                <label htmlFor={"opt-in"} className="gel-optin-label"><small>By checking this box, I consent to receiving email communication from Gel Agency.</small></label>
              </div>
            </div>
        </div>
        <div className="field send-button">
          <button className="button is-dark is-large gel-button-1" type="submit">{submitText}</button>
        </div>
      </StyledContactForm>
    )
  }

}

export default NewsletterForm