import React, { Component } from 'react'
import styled from 'styled-components'

import Instagram from './svg/Instagram'
import Facebook from './svg/Facebook'
import Twitter from './svg/Twitter'
import LinkedIn from './svg/LinkedIn'


const SocialIconList = styled.ul`
  list-style: none !important;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-wrap: wrap;
  li {
    margin-right: 20px;
    a {
      display: inline-block;
      svg {
        width: 30px;
        transition: 300ms;
        path {
          transition: 300ms;
        }
      }
    }
  }
  li:hover svg path,
  li:hover svg circle {
    animation: gelHoverColors;
    animation-duration: 300ms;
    animation-fill-mode: forwards;
  }
  .social-hover svg {
    transform: scale(0.6);
  }
  @media (max-width: 899px) {
    justify-content: flex-start;
  }
`;

const SocialIcons = class extends Component {
  componentDidMount() {
    const socialListItems = Array.from(document.querySelectorAll('.gel-social-item'));
    socialListItems.forEach(item => {
      item.addEventListener('mouseover', () => {
        const thisItem = item;
        socialListItems.forEach(listitem => {
          if(listitem !== thisItem) {
            listitem.classList.add('social-hover')
          }
        })
      })
      item.addEventListener('mouseout', () => {
        socialListItems.forEach(listitem => {
            listitem.classList.remove('social-hover')
        })
      })
    })
  }
  render() {
    return (
      <SocialIconList>
        <li className="gel-social-item">
          <a href="https://www.instagram.com/gelagency/" target="_blank" rel="noopener noreferrer" title="Gel on Instagram">
            <Instagram />
          </a>
        </li>
        <li className="gel-social-item">
          <a href="https://www.facebook.com/GelCreates/" target="_blank" rel="noopener noreferrer" title="Gel on Facebook">
            <Facebook />
          </a>
        </li>
        <li className="gel-social-item">
          <a href="https://twitter.com/gelcreative" target="_blank" rel="noopener noreferrer" title="Gel on Twitter">
            <Twitter />
          </a>
        </li>
        <li className="gel-social-item">
          <a href="https://www.linkedin.com/company/gel-creative/?originalSubdomain=ca" target="_blank" rel="noopener noreferrer" title="Gel on LinkedIn">
            <LinkedIn />
          </a>
        </li>
      </SocialIconList>
    )
  }
}

export default SocialIcons;