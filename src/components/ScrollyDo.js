import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import SocialIcons from './SocialIcons'

const ScrollyDoContainer = styled.div`
  transition: opacity 500ms;
  background-color: white;

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
      window.scroll(0, scrollyPosition + 30);
      console.log(scrollyPosition)
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
      <ScrollyDoContainer className="scrolly-container" >
        <div className="scrolly-container-inner">
          <a href="#next" title="Scroll to the next section. 👇">
            <img src="/img/scrolly.gif" alt="" aria-hidden="true" />
          </a>
          <p>{this.props.social}</p>
        </div>
      </ScrollyDoContainer>
    )
  }
}

ScrollyDo.propTypes = {
  social: PropTypes.string,
}

export default ScrollyDo
