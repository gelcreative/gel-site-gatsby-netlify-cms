import React from 'react';
import { navigate } from "gatsby-link";
import styled from 'styled-components'

const StyledEnquiryForm = styled.form`
  [name="opt-in"] {
    margin-right: 0.5em;
    vertical-align: middle;
  }
`

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class EnquiryForm extends React.Component {
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
    return (
      <StyledEnquiryForm
        name="enquiry"
        method="post"
        action="/contact/thanks/"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        onSubmit={this.handleSubmit}
        className="gel-enquiry-form"
      >
        {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
        <input type="hidden" name="form-name" value="enquiry" />
        <div hidden>
          <label>
            Don’t fill this out:{" "}
            <input name="bot-field" onChange={this.handleChange} />
          </label>
        </div>
        <div className="field fname-input">
          <label className="label visually-hidden" htmlFor={"fname"}>First Name</label>
            <div className="control">
              <label htmlFor={"fname"} className="visually-hidden">Your First Name</label>
              <input className="input" type={"fname"} name={"fname"} onChange={this.handleChange} id={"fname"} placeholder={"First Name"} required={true} />
            </div>
        </div>
        <div className="field lname-input">
          <label className="label visually-hidden" htmlFor={"lname"}>Last Name</label>
            <div className="control">
              <label htmlFor={"lname"} className="visually-hidden">Your Last Name</label>
              <input className="input" type={"lname"} name={"lname"} onChange={this.handleChange} id={"lname"} placeholder={"Last Name"} required={true} />
            </div>
        </div>
        <div className="field email-input">
          <label className="label visually-hidden" htmlFor={"email"}>Email</label>
            <div className="control">
              <label htmlFor={"email"} className="visually-hidden">Your Email Address</label>
              <input className="input" type={"email"} name={"email"} onChange={this.handleChange} id={"email"} placeholder={"Email Address"} required={true} />
            </div>
        </div>
        <div className="field companyurl-input">
          <label className="label visually-hidden" htmlFor={"companyurl"}>Company URL</label>
            <div className="control">
              <label htmlFor={"companyurl"} className="visually-hidden">Your Company URL</label>
              <input className="input" type={"companyurl"} name={"companyurl"} onChange={this.handleChange} id={"companyurl"} placeholder={"Company URL"} required={true} />
            </div>
        </div>
        <div className="field message-input">
          <label className="label visually-hidden" htmlFor={"message"}>Message</label>
            <div className="control">
              <label htmlFor={"message"} className="visually-hidden">Your Message</label>
              <textarea className="input" type={"message"} name={"message"} onChange={this.handleChange} id={"message"} placeholder={"Ask us a question or tell us about your project here."} required={true} />
            </div>
        </div>
        <div className="field send-button">
          <button className="button is-dark is-large gel-button-1" type="submit">Submit</button>
        </div>
      </StyledEnquiryForm>
    )
  }

}

export default EnquiryForm