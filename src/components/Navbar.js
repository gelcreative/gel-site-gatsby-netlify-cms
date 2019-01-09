import React from 'react'
import { Link } from 'gatsby'
import github from '../img/github-icon.svg'
import logo from '../img/gel-logo-header.svg'

const Navbar = class extends React.Component {

  componentDidMount() {
    // Get all "navbar-burger" elements
   const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
   if ($navbarBurgers.length > 0) {
 
     // Add a click event on each of them
     $navbarBurgers.forEach( el => {
       el.addEventListener('click', () => {
 
         // Get the target from the "data-target" attribute
         const target = el.dataset.target;
         // Need to select the navbar too, for some Gel styles
         const navBar = document.querySelector('.navbar');
         const $target = document.getElementById(target);
 
         // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
         el.classList.toggle('is-active');
         $target.classList.toggle('is-active');
         // Toggle this class so we can select it and position it
         navBar.classList.toggle('gel-nav-active');
 
       });
     });
   }
 }
 
 render() {
   return (
  
  <nav className="navbar is-transparent" role="navigation" aria-label="main-navigation">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" title="Logo">
          <img src={logo} alt="Gel" style={{ width: '150px' }} />
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
        <p>Learn <Link className="gel-navbar-item" to="/about">about</Link> Gel Marketing, take a look at our portfolio, get in <Link className="gel-navbar-item" to="/contact">contact</Link>, or read our blog.</p>
        </div>
      </div>
    </div>
  </nav>
  )}
}

export default Navbar
