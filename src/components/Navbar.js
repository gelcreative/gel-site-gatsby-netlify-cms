import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

import CallButton from '../components/CallButton';
import SocialIcons from './SocialIcons';
import NewsletterForm from './NewsletterForm';
import Copyright from './Copyright';

const StyledHeader = styled.nav`
  padding: 3rem;

  .gel-header-logo-link {
    width:  80px;
    height: 80px;
    
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);

    z-index: 999;

    @media (max-width: 1087px) {
      width:  60px;
      height: 60px;
    }

    img { position: absolute; transition: opacity 0.4s, filter 0.3s; }
    .logo-light { opacity: 0; pointer-events: none; }
    img.logo-dark:hover  { filter: brightness(175%); }
    img.logo-light:hover { filter: brightness(85%); }
  }

  .navbar-brand {
    align-items: center;
    justify-content: flex-end;
  }

  .button.call {
    margin-left: auto;

    @media (max-width: 768px) {
      display: none;
    }
  }

  .navbar-burger {
    margin-left: 20px;

    background: url(/img/Group-704b.png) center / contain no-repeat;

    transition: filter 0.3s;

    :hover {
      background-color: unset;
      filter: blur(.75px);
    }
  }

  .navbar-search {    
    position: relative;
    width: 3.25rem;
    height: 3.25rem;

    margin-left: 20px;

    background: url(/img/noun_Search_3122418b.png) center / contain no-repeat;

    cursor: pointer;
    transition: filter 0.3s;

    :hover {
      background-color: unset;
      filter: blur(.75px);
    }
  }

  .navbar-menu.is-active { transform: translateY(0%); }

  .navbar-menu {
    display: flex !important;
    max-height: unset !important;
    padding: 175px 4% 0;

    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;

    background: ${props => props.theme.lightGrey};

    transform: translateY(-100%);
    transition: transform 0.4s;

    .gel-header-logo-link { top: 3rem; }

    .delete {
      position: absolute;
      top: 40px;
      right: 80px;

      width:  100px;
        max-width:  100px;
      height: 100px;
        max-height: 100px;
      
      font-size: 0;
      cursor: pointer;

      background-color: unset;
      :before, :after { background-color: ${props => props.theme.black}; transition: height 0.3s, width 0.3s; }
    }

    .navbar-start {
      flex-basis: 45%;

      > ul {
        margin-bottom: 4%;

        .navbar-item {
          @media (max-width: 1087px) {
            font-size: 2rem;
            padding-top: 0.75em;
            padding-bottom: 0.75em;
          }
        }

        .navbar-item a {
          position: relative;
          padding: 0 5px;

          font-family: ${props => props.theme.secondaryFont};
          font-weight: lighter;
          font-size: 4.2rem;
          color: ${props => props.theme.typeGrey};

          ::after {
            content: " ";

            position: absolute;
            top: 50%;
            left: 0;
            bottom: 0;
            right: 0;

            background: ${props => props.theme.lightGrey};
            transition: 0.2s;
            z-index: -1;
          }

          :hover {
            text-decoration: none;

            &::after { background: ${props => props.theme.orange}; }
          }
        }

        .navbar-item a[aria-current="page"] {
          font-weight: bold;
          text-decoration: underline;

          :hover {
            cursor: default;

            &::after { background: ${props => props.theme.lightGrey}; }
          }
        }
      }

      > ul.socialicons {
        justify-content: flex-start;
      }

      > form.gel-newsletter-form {
        display: flex;
        align-items: center;
        margin-bottom: 4%;

        div.email-input {
          margin-bottom: 0;

          input#email {
            max-width: 380px;
            padding: 10px;
        
            font-family: ${props => props.theme.regularFont};
            font-size: 2.4rem;
        
            border: 1px solid ${props => props.theme.black};
            background: none;
          }
        }

        div.send-button {
          margin-top: -17px;
          margin-left: 20px;

          .gel-button-1.is-dark:hover {
            color: ${props => props.theme.white};
            background-color: ${props => props.theme.darkOrange};
          }
        }
      }
    }

    .navbar-end {
      flex-basis: 55%;

      > img {
        display: block;
        margin-left: auto;
      }

      > img#showoff {
        max-height: 66%;
        margin-bottom: 4%;
      }

      > img.stayintouch {
        max-height: 60px;
        margin-bottom: 10px;
      }

      a {
        color: ${props => props.theme.typeGrey};

        :hover {
          color: ${props => props.theme.orange};
          text-decoration: none;
        }
      }
    }

    .copyright {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
    }

  }

  /* Make logo bigger when at the top of the page //
  // or when the nav menu is open                 */
  &.gel-nav-active, &:not(.scrolled) {
    .gel-header-logo-link {
      width: 118px;
      height: 118px;
    }
  }

  /* Homepage styles */
  &[data-page-type="home"]:not(.gel-nav-active):not(.scrolled) {
    .gel-header-logo-link .logo-light { opacity: 1; pointer-events: all; }
    .gel-header-logo-link .logo-dark  { opacity: 0; }
  }

  &[data-page-type="home"]:not(.scrolled) {
    background-color: unset;

    .navbar-brand .button.call {
      background-color: ${props => props.theme.white};
      a { color: ${props => props.theme.orange}; }

      :hover { background-color: ${props => props.theme.lightGrey} !important; }
      a:hover { color: ${props => props.theme.darkOrange}; }
    }

    .navbar-burger { background-image: url(/img/Group-704.png); }
    .navbar-search { background-image: url(/img/noun_Search_3122418.png); }
  }
`;

const StyledAddress = styled.address`
  font-style: normal;
`;

const Navbar = class extends React.Component {
  componentDidMount() {
    this.navBarBurger();
    this.navBarScroll();
  }

  navBarScroll() {
    window.addEventListener('scroll', function() {
      const scrollFromTop = this.scrollY;
      const theNavbar = document.querySelector('.navbar');
      if (scrollFromTop > 250) {
        theNavbar.classList.add('scrolled');
        // theNavbar.classList.add('is-fixed-top');
      } else {
        theNavbar.classList.remove('scrolled');
        // theNavbar.classList.remove('is-fixed-top');
      }
    });
  }

  navBarBurger() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-burger'),
      0,
    );
    // Need to select the navbar too, for some Gel styles
    const navBar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.navbar-menu');
    const navBurger = document.querySelector('.navbar-burger');
    const navClose = document.querySelector('.delete');

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
      // Add a click event on each of them
      $navbarBurgers.forEach(el => {
        el.addEventListener('click', () => {
          // Get the target from the "data-target" attribute
          const target = el.dataset.target;
          const $target = document.getElementById(target);

          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
          $target.setAttribute("aria-hidden", "false");
          // Toggle this class so we can select it and position it
          navBar.classList.toggle('gel-nav-active');
        });
      });
    }

    // Close menu if user hits ESC
    window.addEventListener('keyup', e => {
      if (e.keyCode === 27) {
        if (navMenu.classList.contains('is-active')) {
          navMenu.classList.toggle('is-active');
          navMenu.setAttribute("aria-hidden", "true");
          navBurger.classList.toggle('is-active');
          navBar.classList.toggle('gel-nav-active');
        }
      }
    });

    // Close the menu if user clicks on the Close button
    window.addEventListener('click', e => {
      if (e.target === navClose) {
        navMenu.classList.toggle('is-active');
        navMenu.setAttribute("aria-hidden", "true");
        navBurger.classList.toggle('is-active');
        navBar.classList.toggle('gel-nav-active');
      }
    });

    // Close menu if user clicks on a nav link
    const navLinks = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-start a'),
    );

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
          navMenu.classList.toggle('is-active');
          navMenu.setAttribute("aria-hidden", "true");
          navBurger.classList.toggle('is-active');
          navBar.classList.toggle('gel-nav-active');
      });
    });

    // Close menu if user clicks on a nav link for the page they are already on
    /* This script is prob overwrought, as you could prob just close the
    menu if you click on any of the links, but I wanted to try it out
    // 1. Select nav links
    const navLinks = Array.prototype.slice.call(
      document.querySelectorAll('.navbar-start a'),
    );
    // 2. Add event listener to nav links
    navLinks.forEach(link => {
      const theLinkHref = link.href;
      link.addEventListener('click', () => {
        const windowLocationHref = window.location.href;
        // 4. If nav link and slug are the same, close the nav
        if (theLinkHref === windowLocationHref) {
          navMenu.classList.toggle('is-active');
          navBar.classList.toggle('gel-nav-active');
        }
      });
    });*/
  }

  render() {
    return (
      <StyledHeader
        className="navbar is-fixed-top"
        role="navigation"
        aria-label="main-navigation"
        data-page-type={this.props.pageType}
      >
        <div className="container">
          <div className="navbar-brand">
            <Link className="gel-header-logo-link" to="/" title="Logo">
              <img className="logo-dark" src="/img/Gel-Logo-Circle-Full-Word-max-01.png" alt="Gel Logo Dark" />
              <img className="logo-light" src="/img/Gel-Logo-Circle-Full-Word-max-01-white.png" alt="Gel Logo Light" />
            </Link>
            <CallButton />
            {/* Hamburger menu */}
            <div className="navbar-burger burger" data-target="navMenu"></div>
            <Link className="navbar-search search" to="/blog/"></Link>
          </div>
          <div id="navMenu" className="navbar-menu" aria-hidden="true">
            <a className="delete">X</a>
            <div className="navbar-start has-text-left">
              <ul>
                <li className="navbar-item">
                  <Link to="/">           Home          </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/about">      About         </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/services">   Services      </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/portfolio">  Our Work      </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/blog">       Blog          </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/contact">    Contact       </Link>
                </li>
              </ul>

              <SocialIcons />
           {/*<NewsletterForm />*/}
              <CallButton />
            </div>

            <div className="navbar-end has-text-right">
              <img src="/img/2020_OBIAA_website_mockup_macbook2.jpg" id="showoff" alt="OBIAA Website Mockup Showoff" />
              <img src="/img/stay in touch.png" className="fancytext stayintouch" alt="Stay In Touch" />
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
            </div>
            <Copyright />
          </div>
        </div>
      </StyledHeader>
    );
  }
};

export default Navbar;
