import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import SocialIcons from './SocialIcons';

const StyledFooter = styled.footer`
  position: relative;
  padding-bottom: 50px;
  padding-top: 100px;

  div.inner {
    display: flex;
    align-items: last baseline;
    flex-wrap: wrap;

    div.footerItem {
      margin: 1em;

      &:first-of-type { margin-right: 4em; }

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

      address { font-style: normal; }

      div.footerNav {
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

      &#footer-container-social { margin-left: auto; }
      &#footer-logo-small {
        position: absolute;
        bottom: -20px;
        left: 50%;
        transform: translateX(-50%);


        text-align: center;
        img { max-width: 40px; }
      }
    }
  }

  &[data-page-type="blog-post"],
  &[data-page-type="portfolio-entry"] {
    background: ${props => props.theme.darkBlue};
    color: ${props => props.theme.white};

    a {
      color: ${props => props.theme.white} !important;

      :hover { color: ${props => props.theme.grey} !important; }
    }

    svg path,       svg circle       { fill: ${props => props.theme.white} !important; }
    svg:hover path, svg:hover circle { fill: ${props => props.theme.grey} !important; }
  }
`;

const Footer = class extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <StyledFooter data-page-type={this.props.pageType}>
        <div className="container">
          <div className="inner">
            <div className="footerItem">
              <div className="footerNav">
                <ul>
                  <li>
                    <Link to="/">           home          </Link>
                  </li>
                  <li>
                    <Link to="/about/">     about         </Link>
                  </li>
                  <li>
                    <Link to="/services/">  services      </Link>
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
            </div>
            <div className="footerItem">
              <address>
                <a
                  href="https://www.google.com/maps/place/89+Collier+St,+Barrie,+ON+L4M+1H2/@44.3902458,-79.6868214,17z/data=!3m1!4b1!4m5!3m4!1s0x882aa32e300f8edf:0x696f3192d7cd8c25!8m2!3d44.3902458!4d-79.6846327"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  89 Collier Street, Suite 201 <br />
                  Barrie, ON L4M 1H2
                </a>
              </address>
              <div>
                <a href="mailto:info@gelagency.com">info@gelagency.com</a>
              </div>
              <div>
                <a href="tel:+17057277980">705.727.7980</a>
              </div>
            </div>
            <div className="footerItem" id="footer-container-social">
              <SocialIcons />
            </div>
         {/*<div className="footerItem" id="footer-logo-small">
              <img src="/img/Gel-Logo-G-Circle-01.png" alt="Gel Logo" />
              <p>Designed by Gel</p>
            </div>*/}
          </div>
        </div>
    </StyledFooter>
    )
  }
}

export default Footer;
