import React, { Component } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const StyledCopyright = styled.span`


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

const Copyright = class extends Component {
  render() {
    return (
      <StyledCopyright className="copyright">
        &copy; Copyright 2020 GelAgency | Privacy Policy
      </StyledCopyright>
    );
  }
};

export default Copyright;
