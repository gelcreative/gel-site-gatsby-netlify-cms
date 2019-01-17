import React, { Component } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import SocialIcons from './SocialIcons'

const ScrollyDoContainer = styled.div`
  display: block;
`

class ScrollyDo extends Component {
  componentDidMount() {
    console.log('scrollydo mounted!')
  }
  render () {
    return (
      <ScrollyDoContainer>
        <p>Social is {this.props.social ? 'boobies' : 'no boobies'}</p>
      </ScrollyDoContainer>
    )
  }
}

export default ScrollyDo
