import React, { Component } from 'react';
import { Link } from 'gatsby';
import styled from 'styled-components';

const StyledCopyright = styled.span`
  font-size: 14px;
  font-weight: light;
  font-family: ${props => props.theme.secondaryFont};
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
