import React from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';
import Logo from '../img/Gel Logo Circle Full Word-max-01.png';
import CallButton from '../components/CallButton';
import SocialIcons from './SocialIcons';
import NewsletterForm from './NewsletterForm';

const StyledHeader = styled.nav`
  padding: 5rem;

  .gel-header-logo-link {
    width: 118px;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }

  .navbar-brand {
    align-items: center;
    justify-content: flex-end;
  }

  .button.call {
    margin-left: auto;
  }

  .navbar-item:hover {
    text-decoration: none;
    background-color: ${props => props.theme.white};
    color: ${props => props.theme.orange};
  }

  .navbar-burger {
    margin-left: 20px;

    background: url(/img/Group-704b.png) center no-repeat;
    background-size: contain;
  }

  .navbar-search {    
    position: relative;
    width: 3.25rem;
    height: 3.25rem;

    margin-left: 20px;

    background: url(/img/noun_Search_3122418b.png) center no-repeat;
    background-size: contain;

    cursor: pointer;
  }

  }

  @media (max-width: 1087px) {
    .gel-header-logo-link {
      width: 60px;
    }

    .navbar-item {
      font-size: 2rem;
      padding-top: 0.75em;
      padding-bottom: 0.75em;
    }
  }

  @media (max-width: 768px) {
    .button.call { display: none; }
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
              <img src="/img/Gel Logo Circle Full Word-max-01.png" alt="Gel Logo" />
            </Link>
            <CallButton />
            {/* Hamburger menu */}
            <div className="navbar-burger burger" data-target="navMenu"></div>
            <div className="navbar-search search"></div>
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
              <Link className="navbar-item" to="/blog">
                Blog
              </Link>
              <Link className="navbar-item" to="/contact">
                Connect
              </Link>
            </div>
          </div>
        </div>
      </StyledHeader>
    );
  }
};

export default Navbar;
