import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import logo from '../img/gel-logo-footer.svg'

const StyledFooter = styled.footer`
  margin-bottom: 50px;
`;

const FooterTop = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  @media (max-width: 400px) {
    justify-content: center;
  }
`
const StyledFooterInner = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`
const FooterItemContainer = styled.div`
  margin: 1em;
  min-width: 33%;
  max-width: 300px;
  flex-grow: 1;
`

const StyledAddress = styled.address`
  font-style: normal;
`

const StyledFooterNav = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Footer = () => (
  <StyledFooter>
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
        <div><a href="mailto:connect@gelmarketing.ca">connect@gelmarketing.ca</a></div>
        <div><a href="tel:+17057277980">705.727.7980</a></div>
      </FooterItemContainer>
      <FooterItemContainer>
        <StyledFooterNav>
          <div>
            <ul>
              <li>home</li>
              <li>portfolio</li>
              <li>about</li>
            </ul>
          </div>
          <div>
            <ul>
              <li>blog</li>
              <li>contact</li>
            </ul>
          </div>
        </StyledFooterNav>
      </FooterItemContainer>
      <FooterItemContainer>

      </FooterItemContainer>
    </StyledFooterInner>
  </StyledFooter>
)

export default Footer;