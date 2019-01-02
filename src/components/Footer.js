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
  min-width: 30%;
  max-width: 300px;
  flex-grow: 1;
`

const StyledAddress = styled.address`
  font-style: normal;
`

const StyledFooterNav = styled.div`
  display: flex;
  justify-content: flex-start;
  div {
    margin: 0 30px;
  }
  @media (max-width: 440px) {
    justify-content: space-between;
    div {
      flex-grow: 1;
      flex-shrink: 1;
      margin: 0 30px 0 0;
    }
  }
`;

const SocialIconList = styled.ul`
  list-style-type: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  li {
    margin-right: 20px;
    a {
      display: inline-block;
      img {
        width: 30px;
      }
    }
  }
  @media (max-width: 899px) {
    justify-content: flex-start;
  }
`;

const Footer = () => (
  <div className="container">
    <StyledFooter>
      <FooterTop>
        <FooterItemContainer>
          <Link to="/" title="Logo">
            <img src={logo} alt="Gel" style={{ width: '100px' }} />
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
          <SocialIconList>
            <li><a href="https://www.instagram.com/gelcreative/" target="_blank" rel="noopener noreferrer"><img src="../img/instagram-simple.svg" alt="Gel Instagram" /></a></li>
            <li><a href="https://www.facebook.com/GelCreates/" target="_blank" rel="noopener noreferrer"><img src="../img/facebook-no-box.svg" alt="Gel Facebook" /></a></li>
            <li><a href="https://twitter.com/gelcreative" target="_blank" rel="noopener noreferrer"><img src="../img/twitter-silhouette.svg" alt="Gel Twitter" /></a></li>
            <li><a href="https://www.linkedin.com/company/gel-creative/?originalSubdomain=ca" target="_blank" rel="noopener noreferrer"><img src="../img/linkedin-logo.svg" alt="Gel LinkedIn" /></a></li>
          </SocialIconList>
        </FooterItemContainer>
      </StyledFooterInner>
    </StyledFooter>
  </div>
)

export default Footer;