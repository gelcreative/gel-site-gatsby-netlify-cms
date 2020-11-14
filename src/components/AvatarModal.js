import React from 'react';
import { navigate } from "gatsby-link";
import styled from 'styled-components'
import cookie from 'cookie'

const StyledAvatarModal = styled.div`
  position: fixed;
  top: 0;
  
  display: grid;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-content: center;

  pointer-events: none;
  z-index: 900;

  &.obnoxious {
    background: rgba(0, 0, 0, 0.35);
    opacity: 0;
    transition: opacity 0.5s;
  }

  &.gentle {
    justify-content: end;
    z-index: 20;

    > div {
      pointer-events: auto;

      transition: margin 0.3s;
      margin-right: -100%;

      padding: 20px 50px 0;

      .delete { top: 0px; right: 0px; }

      h2 { font-size: 2.4rem; }

      p,
      form input,
      form button { font-size: 1.2rem; }

      img { display: none; }
    }
  }

  > div {
    position: relative;

    max-height: 100%;
    padding: 100px 100px 0;
    margin: 0 auto;

    background: ${props => props.theme.blue};
    color: ${props => props.theme.white};

    overflow: hidden;

    .delete {
      display: none;
      position: absolute;
      top: 25px;
      right: 25px;

      width:  50px;
        max-width:  50px;
      height: 50px;
        max-height: 50px;
      
      font-size: 0;

      background-color: unset;
      :before, :after { background-color: ${props => props.theme.white}; transition: height 0.3s, width 0.3s; }

      :hover :before { height: 3px; }
      :hover :after  { width: 3px; }
    }

    h2 {
      font-family: ${props => props.theme.secondaryFont};
      font-weight: lighter;
      font-size: 3.6rem;
    }

    p {
      font-weight: bold;
      font-size: 1.8rem;
    }

    form {
      margin: 30px auto;

      input {
        max-width: 375px;
        margin: 0 auto 15px;

        font-family: ${props => props.theme.secondaryFont};
        font-weight: normal;
        font-size: 1.8rem;
        color: ${props => props.theme.white};

        border: 1px solid ${props => props.theme.white};
        border-radius: 0;
        background: none;

        ::placeholder { color: ${props => props.theme.white}; }

        &[type=checkbox] {
          margin: 0 5px 0 0;
          vertical-align: sub;
        }
      }

      .button {
        font-weight: bold;
        font-size: 1.6rem;
        text-transform: uppercase;

        &.download::before {
          content: "";

          width: 30px;
          height: 20px;
          margin-right: 5px;
          background: url(/img/icon-cloud.png) center / contain no-repeat;
        }
      }
    }

    img { margin-bottom: -7px; }
  }

  &.active {

    .delete { display: initial; }

    &.obnoxious {
      opacity: 1;
      pointer-events: auto;
    }

    &.gentle {

      > div { margin-right: 0%; }
    }
  }

  @media (max-width: 767px) {
    &.active.gentle > div {
      margin-bottom: 0%;
    }

    &.gentle {
      justify-content: center;
      align-content: end;

      > div {
        margin-right: auto;
        margin-bottom: -100%;
      }
    }
  }
`

function encode(data) {
  return Object.keys(data)
    .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(data[key]))
    .join("&");
}

class AvatarModal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false,
      type: 'gentle',
      isValidated: false,
    }
    this.fadeTimerDur = 8000;
    this.initialTimerDur = 5000;
    this.cookieExpiry = 0.04166667; // Expires in 1 hour
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

    // Show thank you text and replace form with PDF download.
    document.querySelector("#gel-avatarmodal p").innerHTML = "Thank you for subscribing. Enjoy your template!";
    document.querySelector("#gel-avatarmodal form").innerHTML = "<a class='button gel-button-2 download' href='/files/2020_Gel_Customer_Avatar_Template.pdf' download='Gel Customer Avatar Template.pdf' target='_blank' rel='noopener noreferrer'>Download</a>";

    // Set expiry for cookie.
    var exDays = this.cookieExpiry; 
    var expiry = new Date();
    expiry.setTime(expiry.getTime() + (exDays * 24 * 60 * 60 * 1000));
    // Set cookie so it doesn't pop up again until expiry.
    document.cookie = "avatarmodal=closed;expires=" + expiry.toUTCString() + ";path=/";
  };

  componentDidMount() {
    // Run the initial timer when the user scrolls down.
    window.addEventListener("scroll", this.initialTimer);
  }

  // Timer for showing the modal automatically.
  initialTimer = () => {
    // Only do this on the home page or blog page.
    if (this.props.pageType === "home" || this.props.pageType === "blog") {
      setTimeout(() => {
        // Grab cookies.
        var cookies = cookie.parse(document.cookie);

        // If we can't find the 'closed' avatarmodal cookie, create and show the popup.
        if (typeof(cookies.avatarmodal) === "undefined") {
          this.setState({active: true});
          this.fadeTimer = setTimeout(() => {this.hide(false)}, this.fadeTimerDur);
        }

      }, this.initialTimerDur);
    }

    // Remove this event listener, so the timer only runs once
    // and doesn't make unnecessary calls.
    window.removeEventListener("scroll", this.initialTimer);
  }

  // Function to hide the modal.
  hide = (setCookie = true) => {
    // Set the cookie if it was requested, and the type is 'gentle'
    // (if the type is not 'gentle' then the user manually summoned it)
    if (setCookie && this.state.type === 'gentle') {
      // Set expiry for cookie.
      var exDays = this.cookieExpiry;
      var expiry = new Date();
      expiry.setTime(expiry.getTime() + (exDays * 24 * 60 * 60 * 1000));
      // Set cookie so it doesn't pop up again until expiry.
      document.cookie = "avatarmodal=closed;expires=" + expiry.toUTCString() + ";path=/";
    }

    this.setState({active: false});
    this.setState({type: 'gentle'});
  }

  // Function to fade the modal (close itself when not interacted with)
  fadeToggle = (reset = false) => {
    if (reset) {
      window.clearTimeout(this.fadeTimer);
    } else {
      this.fadeTimer = setTimeout(() => {this.hide(false)}, this.fadeTimerDur);
    }
  }

  render() {
    return (
      <StyledAvatarModal id="gel-avatarmodal" className={`has-text-centered ${this.state.type} ${this.state.active ? "active" : "inactive"}`} onMouseEnter={this.fadeToggle.bind(this, true)} onMouseLeave={this.fadeToggle.bind(this, false)} >
        <div>
          <button className="delete" onClick={this.hide.bind(this, true)}>X</button>
          <h2>Customer Avatar Template</h2>
          <p>Subscribe to our newsletter to get a free template!</p>
          <form
            name="contact"
            method="post"
            action="/"
            data-netlify="true"
            data-netlify-honeypot="bot-field"
            onSubmit={this.handleSubmit}
            className="gel-avatarmodal-form"
          >
            {/* The `form-name` hidden field is required to support form submissions without JavaScript */}
            <input type="hidden" name="form-name" value="contact" />
            <div hidden>
              <label>
                Don’t fill this out:{" "}
                <input name="bot-field" onChange={this.handleChange} />
              </label>
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
              <button className="button gel-button-2" type="submit">Opt In</button>
            </div>
          </form>
          <img src="/img/Shannon-Avatar.png" alt="Shannon Avatar" />
        </div>
      </StyledAvatarModal>
    )
  }

}

export default AvatarModal