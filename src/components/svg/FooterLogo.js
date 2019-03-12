import React, { Component } from 'react'
import styled from 'styled-components'
import Icon from '-!svg-react-loader?name=GelLogo!../../img/gel-logo-footer.svg'

const FooterLogoContainer = styled.div`
  .gel-footer-logo {
    width: 100px;
    transition: 300ms;
  }

  .gel-footer-logo:hover circle {
    animation: gelHoverColors;
    animation-duration: 2s;
    animation-fill-mode: forwards;
  }

  .gel-footer-logo:hover .gel-logo-letter {
    animation: gelLetterScale;
    animation-duration: 2s;
    animation-fill-mode: forwards;
    transform-origin: center;
  }

  @media (max-width: 768px) {
    .gel-footer-logo circle {
      animation: gelHoverColors;
      animation-duration: 2s;
    }

    .gel-footer-logo .gel-logo-letter {
      animation: gelLetterScale;
      animation-duration: 2s;
      transform-origin: center;
    }
  }
`

export default class FooterLogo extends Component {
  render() {
    return (
      <FooterLogoContainer className="gel-circle-logo">
        <Icon className="gel-footer-logo" />
      </FooterLogoContainer>
    )
  }
}