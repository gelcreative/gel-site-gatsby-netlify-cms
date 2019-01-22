import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'

import FooterLogo from './svg/FooterLogo'
import SocialIcons from './SocialIcons'

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
  justify-content: space-between;
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


const Footer = () => (
    <StyledFooter>
      <div className="container">
        <FooterTop>
          <FooterItemContainer>
            <Link to="/" title="Home Page">
              <FooterLogo alt="Gel" style={{ width: '100px' }} />
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
            <SocialIcons />
          </FooterItemContainer>
        </StyledFooterInner>
      </div>

    </StyledFooter>
)

export default Footer;