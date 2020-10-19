import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import SocialIcons from './SocialIcons';

const StyledFooter = styled.footer`
  position: relative;
  margin-bottom: 50px;
  margin-top: 100px;
`;
// Removed this code for changes 9-27-19
// const FooterTop = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: flex-start;
//   @media (max-width: 400px) {
//     justify-content: center;
//   }
// `;
const StyledFooterInner = styled.div`
  display: flex;
  align-items: last baseline;
  flex-wrap: wrap;
`;
const FooterItemContainer = styled.div`
  margin: 1em;

  a {
    font-family: ${props => props.theme.secondaryFont};
    font-weight: normal;
    font-size: 1.7rem;
    color: ${props => props.theme.typeGrey};

    :hover {
      text-decoration: none;
    }
  }

  a[aria-current="page"] { color: ${props => props.theme.orange}; }

  &#footer-container-social { margin-left: auto; }
  &#footer-logo-small {
    position: absolute;
    bottom: -20px;
    left: 50%;
    transform: translateX(-50%);


    text-align: center;
    img { max-width: 40px; }
  }
`;

const StyledAddress = styled.address`
  font-style: normal;
`;

const StyledFooterNav = styled.div`
    a {
      padding: 0 5px; 
      font-size: 2.1rem;

      :hover {
        text-shadow: 0 0 1px ${props => props.theme.typeGrey};
      }
    }

    a[aria-current="page"]:hover {
      text-shadow: 0 0 1px ${props => props.theme.orange};
    }
  }
`;

const Footer = () => (
  <StyledFooter>
      <div className="container">
      <StyledFooterInner>
        <FooterItemContainer>
          <StyledFooterNav>
            <div>
              <ul>
                <li>
                  <Link to="/">           home          </Link>
                </li>
                <li>
                  <Link to="/about/">     about         </Link>
                </li>
                <li>
                  <Link to="/services/">  our services  </Link>
                </li>
                <li>
                  <Link to="/portfolio/"> our work      </Link>
                </li>
                <li>
                  <Link to="/blog/">      blog          </Link>
                </li>
                <li>
                  <Link to="/contact/">   contact       </Link>
                </li>
              </ul>
            </div>
          </StyledFooterNav>
        </FooterItemContainer>
        <FooterItemContainer>
          <StyledAddress>
            <a
              href="https://www.google.com/maps/place/89+Collier+St,+Barrie,+ON+L4M+1H2/@44.3902458,-79.6868214,17z/data=!3m1!4b1!4m5!3m4!1s0x882aa32e300f8edf:0x696f3192d7cd8c25!8m2!3d44.3902458!4d-79.6846327"
              target="_blank"
              rel="noopener noreferrer"
            >
              89 Collier Street, Suite 201 <br />
              Barrie, ON L4M 1H2
            </a>
          </StyledAddress>
          <div>
            <a href="mailto:info@gelcreative.ca">info@gelcreative.ca</a>
          </div>
          <div>
            <a href="tel:+17057277980">705.727.7980</a>
          </div>
        </FooterItemContainer>
        <FooterItemContainer id="footer-container-social">
          <SocialIcons />
        </FooterItemContainer>
        <FooterItemContainer id="footer-logo-small">
          <img src="/img/Gel-Logo-G-Circle-01.png" alt="Gel Logo" />
          <p>Designed by Gel</p>
        </FooterItemContainer>
      </StyledFooterInner>
      </div>
  </StyledFooter>
);

export default Footer;
