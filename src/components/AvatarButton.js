import React, { Component } from 'react';
import styled from 'styled-components';

const StyledAvatarButton = styled.span`
  
`;

const AvatarButton = class extends Component {
  constructor(props) {
    super(props);
    this.state = {

    };
  }

  findReactComponent = (el) => {
    for (const key in el) {
      if (key.startsWith('__reactInternalInstance$')) {
        const fiberNode = el[key];
        // Don't ask...
        return fiberNode.return.return.return.return.return.stateNode;
      }
    }
    
    return null;
  }

  summonModal = () => {
    if (document.getElementById('gel-avatarmodal')) {
      let avatarModal = document.getElementById('gel-avatarmodal');
      let avatarModalComp = this.findReactComponent(avatarModal);
      avatarModalComp.setState({active: true, type: 'obnoxious'})
    }    
  }

  render() {
    return (
      <StyledAvatarButton className="button gel-button-2 is-primary" onClick={this.summonModal.bind(this)}>Get Template</StyledAvatarButton>
    );
  }
};

export default AvatarButton;
