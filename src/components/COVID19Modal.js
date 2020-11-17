import React from 'react';
import styled from 'styled-components'
import cookie from 'cookie'

const C19Modal = styled.div`
  position: fixed;
  top: 0;
  
  display: grid;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-content: center;

  background: rgba(0, 0, 0, 0.35);

  opacity: 0;
  transition: opacity 0.5s;

  pointer-events: none;
  z-index: 900;

  img {
    max-height: 100%;
    height: 739px;
    margin: 0 auto;

    cursor: pointer;
  }

  &.active { opacity: 1; pointer-events: auto; }
`

class COVID19Modal extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      active: false
    }
  }

  componentDidMount() {
    setTimeout(() => {
      // Grab cookies.
      var cookies = cookie.parse(document.cookie);

      // If we can't find the popup cookie, create and show the popup.
      if (typeof(cookies.c19modal) == "undefined") {
        this.setState({active: true});
      }

    }, 2000);
  }

  hide = () => {
    // Set expiry for cookie.
    var exDays = 7; // Expires in 7 days
    var expiry = new Date();
    expiry.setTime(expiry.getTime() + (exDays * 24 * 60 * 60 * 1000));

    // Set cookie so it doesn't pop up again until expiry.
    document.cookie = "c19modal=closed;expires=" + expiry.toUTCString() + ";path=/";
    this.setState({active: false});
  }

  render() {
    return (
      <C19Modal id="gel-c19modal" className={`${this.state.active ? "active" : "inactive"}`} onClick={this.hide.bind(this)}>
        <img
          src='/img/2020_gel_popup-01-01.jpg'
          alt='Gel is Open. To our valued partners, we hope that you and your family are healthy and safe during this trying time. Life and business have been disrupted by the pandemic and we understand this firsthand. We are committed to serving you. We understand that advancing your business - even in a time of uncertainty - is important. We are open. Working remotely to serve you. Looking forward to working through this together. -Tom and Shannon'
        />
      </C19Modal>
    )
  }

}

export default COVID19Modal