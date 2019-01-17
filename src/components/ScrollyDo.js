import React, { Component } from 'react'
import styled, { css } from 'styled-components'
import PropTypes from 'prop-types'
import SocialIcons from './SocialIcons'
import { scrollIt } from '../util/scrollIt'

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
`

class ScrollyDo extends Component {
  componentDidMount() {
    const scrollyContainer = document.querySelector('.scrolly-container')
    const scrollLink = document.querySelector('.scrolly-container-inner > a')
    scrollLink.addEventListener('click', e => {
      e.preventDefault();
      const scrollyPosition = scrollyContainer.offsetTop;
      // window.scroll(0, scrollyPosition + 30);
      const targetPosition = scrollyPosition + 30;

      scrollIt(targetPosition, 1000, 'easeInOutQuint');
      
    })
    window.addEventListener('scroll', () => {
      const scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
      if(scrollTop >= 100) {
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
            <img src="/img/scrolly.gif" alt="" aria-hidden="true" />
          </a>
          {!!this.props.socialIcons && <SocialIcons />}
        </div>
      </ScrollyDoContainer>
    )
  }
}

ScrollyDo.propTypes = {
  socialIcons: PropTypes.bool,
  fullHeight: PropTypes.bool
}

export default ScrollyDo
