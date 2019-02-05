import React from 'react'
import { Link } from 'gatsby'
import styled from 'styled-components'
import HeaderLogo from './svg/HeaderLogo'

const StyledHeader = styled.header`
  .navbar-brand {
    position: fixed;
  }
`

const Navbar = class extends React.Component {

componentDidMount() {
    // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  // Need to select the navbar too, for some Gel styles
  const navBar = document.querySelector('.navbar');
  const navMenu = document.querySelector('.navbar-menu')

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
          navBar.classList.toggle('gel-nav-active');
        }
      }
    })

    // Close the menu if user clicks on overlay
    window.addEventListener('click', (e) => {
      if(e.target === navMenu && navMenu.classList.contains('is-active')) {
        navMenu.classList.toggle('is-active');
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
 
 render() {
   return (
    <StyledHeader>
      <nav className="navbar is-transparent" role="navigation" aria-label="main-navigation">
        <div className="container">
          <div className="navbar-brand">
            <Link to="/" title="Logo">
              <HeaderLogo />
            </Link>
            {/* Hamburger menu */}
            <div className="navbar-burger burger" data-target="navMenu">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
          <div id="navMenu" className="navbar-menu">
            <div className="navbar-start has-text-centered">
            <p>Learn <Link to="/about">about</Link> Gel, consider our <Link to="/portfolio">work</Link>, <Link to="/contact">connect</Link> with us, and read our <Link to="/blog">blog</Link>.</p>
            </div>
          </div>
        </div>
      </nav>
    </StyledHeader>
  )}
}

export default Navbar
