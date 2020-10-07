import React, { Component } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const StyledCallButton = styled.span`


  > a {
    font-size: 18px;
    color: ${props => props.theme.white};
  }

  > a:hover { color: ${props => props.theme.white}; }

  > a.make { display: none; }

  @media (max-width: 768px) {
    > a.book { display: none; }
    > a.make { display: initial; }
  }
`;

const CallButton = class extends Component {
  render() {
    return (
      <StyledCallButton className="button gel-button-2 is-primary call">
        <Link to="/contact/" className="book">Book A Call</Link>
        <a href="tel:+1705.727.7980" class="make">Make A Call</a>
      </StyledCallButton>
    );
  }
};

export default CallButton;
