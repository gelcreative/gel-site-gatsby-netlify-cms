import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import HeaderLogo from './svg/HeaderLogo';
import FooterLogo from './svg/FooterLogo';

const StyledHeader = styled.nav`
  padding: 1rem;

  .gel-header-logo-link {
    display: flex;
    > div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  .gel-footer-logo {
    opacity: 0;
    width: 70px;
  }

  &.scrolled {
    .gel-header-logo {
      opacity: 0;
      width: 0;
    }

    .gel-footer-logo {
      opacity: 1;
    }
  }

  .navbar-brand {
    align-items: center;
  }

  .navbar-item:hover {
    text-decoration: none;
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.orange};
  }

  .navbar-burger {
    color: ${props => props.theme.black};
    span {
      height: 3px;
      width: 20px;
    }
  }

  @media (max-width: 1087px) {
    .gel-header-logo {
      width: 100px;
    }

    .navbar-item {
      font-size: 2rem;
      padding-top: 0.75em;
      padding-bottom: 0.75em;
    }
  }
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
          navBurger.classList.toggle('is-active');
          navBar.classList.toggle('gel-nav-active');
        }
      }
    });

    // Close the menu if user clicks on overlay
    window.addEventListener('click', e => {
      if (e.target === navMenu && navMenu.classList.contains('is-active')) {
        navMenu.classList.toggle('is-active');
        navBurger.classList.toggle('is-active');
        navBar.classList.toggle('gel-nav-active');
      }
    });

    // Close menu if user clicks on a nav link for the page they are already on
    /* This script is prob overwrought, as you could prob just close the
    menu if you click on any of the links, but I wanted to try it out */
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
    });
  }

  render() {
    return (
      <StyledHeader
        className="navbar is-fixed-top"
        role="navigation"
        aria-label="main-navigation"
      >
        <div className="container">
          <div className="navbar-brand">
            <Link className="gel-header-logo-link" to="/" title="Logo">
              <HeaderLogo />
              <FooterLogo />
            </Link>
            {/* Hamburger menu */}
            <div className="navbar-burger burger" data-target="navMenu">
              <span />
              <span />
              <span />
            </div>
          </div>
          <div id="navMenu" className="navbar-menu">
            <div className="navbar-start has-text-centered"></div>
            <div className="navbar-end has-text-centered">
              <Link className="navbar-item" to="/about">
                Our Story
              </Link>
              <Link className="navbar-item" to="/portfolio">
                Our Work
              </Link>
              <Link className="navbar-item" to="/contact">
                Connect
              </Link>
              <Link className="navbar-item" to="/blog">
                Blog
              </Link>
            </div>
          </div>
        </div>
      </StyledHeader>
    );
  }
};

export default Navbar;
