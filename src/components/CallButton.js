import React, { Component } from 'react';
import styled from 'styled-components';

const CallButton = styled.span`
  display: inline-block;
  padding: 8px 30px;

  font-size: 20px;
  color: white;

  background: #E77252;
  border-radius: 6px;

  a { display: none; }

  @media (max-width: 899px) {
    Link { display: none; }
    a { display: initial; }
  }
`;

const CallButton = class extends Component {
  render() {
    return (
      <span class="button gel-button-2 call">
        <Link to="/contact/">Book A Call</Link>
        <a href="tel:+1705.727.7980">Make A Call</a>
      </span>
    );
  }
};

export default CallButton;
