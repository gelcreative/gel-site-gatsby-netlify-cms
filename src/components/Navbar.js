import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import HeaderLogo from './svg/HeaderLogo'
import FooterLogo from './svg/FooterLogo'

const StyledHeader = styled.header`
  position: fixed;
  width: 100vw;
  background-color: #ffffff;

  /* .navbar-brand {
    z-index: 1;
  }

  .navbar {
    margin-top: 30px;
  }

  .navbar > .container {
    display: block;
  }

  .navbar-menu {
    height: 0;
    opacity: 0;
    overflow: hidden;
  }

  .navbar-menu.is-active {
    height: 100%;
    opacity: 1;
    transition: opacity 300ms;
  }
    
  .navbar-start {
    text-align: center;
    display: block;
  }

  .navbar-item {
    display: block;
  }

  .navbar-burger {
    display: block;
  }

  .navbar-burger span {
    height: 3px;
    width: 20px;
  }

  .navbar .container  {
    position: relative;
  }

  .gel-nav-active .navbar-brand {
    z-index: 1;
  }

  .navbar-menu.is-active  {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(255, 255, 255, 0.95);
  }

  .navbar-menu.is-active .navbar-start  {
    justify-content: center;
    margin-right: unset;
    width: 500px;
    max-width: 90%;
  }

  .gel-nav-active + div:first-of-type {
    margin-top: 90px;
  }

  .navbar p {
    font-size: 4rem;
    color: #9a989c;
    font-weight: 600;
    line-height: 1.2;
  }

  @media screen and (max-width: 1087px) {
    .navbar-brand {
      padding: 0 5%;
    }
  }

  @media screen and (min-width: 1088px) {
    .navbar-brand {
      max-width: 960px;
      width: 960px;
    }
  }

  @media screen and (min-width: 1280px) {
    .navbar-brand {
      max-width: 1152px;
      width: 1152px;
    }
  }

  @media screen and (min-width: 1472px) {
    .navbar-brand {
      max-width: 1344px;
      width: 1344px;
    }
  }
  */

  .gel-footer-logo {
    width: 70px;
  }

  &.scrolled {
    .gel-header-logo {
      opacity: 0;
      width: 0;
    }

    .gel-footer-logo {
      opacity: 1;
      width: 70px;
    }
  }

  @media (max-width: 769px) {
    .gel-word-logo {
      display: none;
    }
  }

  @media(min-width: 770px) {
    .gel-header-logo-link {
      position: relative;
    }

    .gel-circle-logo {
      position: absolute;
      top: 0;
    }

    .gel-footer-logo {
      opacity: 0;
      width: 0;
    }
  }
`

const Navbar = class extends React.Component {

  componentDidMount() {
    this.navBarBurger();
    this.navBarScroll();
  }

  navBarScroll() {
    window.addEventListener('scroll', function() {
      const scrollFromTop = this.scrollY;
      const theHeader = document.querySelector('header');
      if(scrollFromTop > 100) {
        theHeader.classList.add('scrolled');
      } else {
        theHeader.classList.remove('scrolled');
      }
    })
  }

  navBarBurger() {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Need to select the navbar too, for some Gel styles
    const navBar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.navbar-menu');
    const navBurger = document.querySelector('.navbar-burger');

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {

      // Add a click event on each of them
      $navbarBurgers.forEach( el => {
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
    window.addEventListener('keyup', (e) => {
      if(e.keyCode === 27) {
        if(navMenu.classList.contains('is-active')) {
          navMenu.classList.toggle('is-active');
          navBurger.classList.toggle('is-active');
          navBar.classList.toggle('gel-nav-active');
        }
      }
    })

    // Close the menu if user clicks on overlay
    window.addEventListener('click', (e) => {
      if(e.target === navMenu && navMenu.classList.contains('is-active')) {
        navMenu.classList.toggle('is-active');
        navBurger.classList.toggle('is-active');
        navBar.classList.toggle('gel-nav-active');
      }
    })

    // Close menu if user clicks on a nav link for the page they are already on
    /* This script is prob overwrought, as you could prob just close the 
    menu if you click on any of the links, but I wanted to try it out */
    // 1. Select nav links
    const navLinks = Array.prototype.slice.call(document.querySelectorAll('.navbar-start a'));
    // 2. Add event listener to nav links
    navLinks.forEach(link => {
      const theLinkHref = link.href;
      link.addEventListener('click', () => {
        const windowLocationHref = window.location.href;
        // 4. If nav link and slug are the same, close the nav
        if(theLinkHref === windowLocationHref) {
          navMenu.classList.toggle('is-active');
          navBar.classList.toggle('gel-nav-active');
        }
      })
    })
  }

  // render() {
  //   return (
  //     <StyledHeader>
  //       <nav className="navbar" role="navigation" aria-label="main-navigation">
  //         <div className="container">
  //           <div className="navbar-brand">
  //             <Link className="gel-header-logo-link" to="/" title="Logo">
  //               <HeaderLogo />
  //               <FooterLogo />
  //             </Link>
  //             {/* Hamburger menu */}
  //             <div className="navbar-burger burger" data-target="navMenu">
  //               <span></span>
  //               <span></span>
  //               <span></span>
  //             </div>
  //           </div>
  //           <div id="navMenu" className="navbar-menu">
  //             <div className="navbar-start has-text-centered">
  //             <p>Learn <Link to="/about">about</Link> Gel, consider our <Link to="/portfolio">work</Link>, <Link to="/contact">connect</Link> with us, and read our <Link to="/blog">blog</Link>.</p>
  //             </div>
  //           </div>
  //         </div>
  //       </nav>
  //     </StyledHeader>
  // )}

  render() {
    return (
      <StyledHeader>
        <nav
          className="navbar"
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
              <div className="navbar-start has-text-centered">
                <Link className="navbar-item" to="/about">
                  About
                </Link>
                <Link className="navbar-item" to="/products">
                  Products
                </Link>
                <Link className="navbar-item" to="/blog">
                  Blog
                </Link>
                <Link className="navbar-item" to="/contact">
                  Contact
                </Link>
                <Link className="navbar-item" to="/contact/examples">
                  Form Examples
                </Link>
              </div>
            </div>
          </div>
        </nav>
      </StyledHeader>
    )
  }
}

export default Navbar
