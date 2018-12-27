import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import logo from '../img/logo.svg'

const FooterTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 400px) {
    justify-content: center;
  }
`
const StyledFooterInner = styled.footer`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`
const FooterItemContainer = styled.div`
  margin: 1em;
`

const StyledAddress = styled.address`
  color: ${ props => props.theme.darkGrey };
`

const Footer = () => (
  <footer>
    <FooterTop>
      <FooterItemContainer>
        <Link to="/" className="navbar-item" title="Logo">
          <img src={logo} alt="Kaldi" style={{ width: '88px' }} />
        </Link>
      </FooterItemContainer>
    </FooterTop>
    <StyledFooterInner>
      <FooterItemContainer>
        <StyledAddress>
          89 Collier Street, Suite 201 <br />
          Barrie, ON L4M 1H2
        </StyledAddress>
      </FooterItemContainer>
      <FooterItemContainer>

      </FooterItemContainer>
      <FooterItemContainer>

      </FooterItemContainer>
    </StyledFooterInner>
  </footer>
)

export default Footer;