import React from 'react'
import styled from 'styled-components'

const StyledServices = styled.section`
  .gel-services-list {
    font-size: 4rem;
    display: flex;
    flex-wrap: wrap;
  }

  .gel-services-list li {
    padding: 0 1em;
    position: relative;
  }

  .gel-services-list li:nth-child(-n+2)::after {
    content: '//';
    color: ${props => props.theme.orange};
    position: absolute;
    right: 0;
    transform: translateX(50%);
  }
`

const GelServices = () => {
  return (
    <StyledServices className="columns is-centered gel-home-tags-section" id="gel-home-tags-section">
      <div className="column is-narrow has-text-centered">
        <ul className="gel-services-list">
          <li>strategy</li>
          <li>branding</li>
          <li>marketing</li>
        </ul>
      </div>
    </StyledServices>
  )
}

export default GelServices