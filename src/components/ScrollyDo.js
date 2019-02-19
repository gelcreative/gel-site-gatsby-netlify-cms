import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import SocialIcons from './SocialIcons'
import { scrollIt } from '../util/scrollIt'
import scrolly from '../img/scrolly.gif'

const ScrollyDoContainer = styled.div`
  transition: opacity 300ms;
  background-color: white;
  ${props => props.fullHeight && css`
    position: fixed;
    bottom: 0;
    right: 0;
    left: 0;
    max-width: 95%;
    margin: 0 auto;
    padding-bottom: 20px;`
  }

  .scrolly-container-inner {
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  a {
    width: 100%;
    text-align: center;
  }

  ul {
    position: absolute;
    right: 0;
    vertical-align: middle;
    top: 0;
    bottom: 0;
  }

  @media (max-width: 669px) {
    .scrolly-container-inner {
      flex-direction: column;
    }

    ul {
      position: relative;
    }
  }

  @media (max-width: 767px) {
    display: none;
  }
`

class ScrollyDo extends Component {

  componentDidMount() {
    const scrollyContainer = ReactDOM.findDOMNode(this)
    const scrollLink = scrollyContainer.querySelector('a')
    scrollLink.addEventListener('click', e => {
      e.preventDefault();
      const targetContainer = document.querySelector(`#${this.props.targetId}`);
      const targetPosition = targetContainer.offsetTop + 50;

      scrollIt(targetPosition, 1000, 'easeInOutQuint');
      
    })
    window.addEventListener('scroll', () => {
      const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      const scrollyDoPosition = scrollyContainer.offsetTop;
      const windowHeight = window.innerHeight;
      if((scrollTop + windowHeight) >= scrollyDoPosition + 400) {
        scrollyContainer.style.opacity = 0;
      } else {
        scrollyContainer.style.opacity = 1;
      }
    })
  }
  render () {
    return (
      <ScrollyDoContainer className="scrolly-container" fullHeight={this.props.fullHeight} >
        <div className="scrolly-container-inner">
          <a href="#next" title="Scroll to the next section. 👇">
            <img src={scrolly} alt="" aria-hidden="true" />
          </a>
          {!!this.props.socialIcons && <SocialIcons />}
        </div>
      </ScrollyDoContainer>
    )
  }
}

ScrollyDo.propTypes = {
  socialIcons: PropTypes.bool,
  fullHeight: PropTypes.bool,
  targetId: PropTypes.string.isRequired,
}

export default ScrollyDo
