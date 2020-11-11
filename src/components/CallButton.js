import React, { Component } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const StyledCallButton = styled.span`
  &.alt > a::after {
    content: " ";
    display: inline-block;
    margin-left: 5px;
    height: 20px;
    width: 20px;

    background: url(/img/icon-phone2.png) center / contain no-repeat;
    vertical-align: sub;
  }

  > a {
    font-size: 1.8rem;
    color: ${props => props.theme.white};

    :hover {
      color: ${props => props.theme.white};
    }
  }

  > a.make { display: none; }

  @media (max-width: 768px) {
    > a.book { display: none; }
    > a.make { display: initial; }
  }
`;

const CallButton = class extends Component {
  constructor(props) {
    super(props);
    this.state = {
      layout: props.layout,
    };
  }

  render() {
    // Handle layout here
    let buttonText = "Contact Us"
    let buttonClasses = "button gel-button-2 is-primary call"
    if (this.state.layout === "alt") {
      buttonText = "Call Now";
      buttonClasses = "button gel-button-2 is-primary call alt";
    }

    return (
      <StyledCallButton className={buttonClasses}>
        <Link to="/contact/" className="book">{buttonText}</Link>
        <a href="tel:+1705.727.7980" className="make">{buttonText}</a>
      </StyledCallButton>
    );
  }
};

export default CallButton;
