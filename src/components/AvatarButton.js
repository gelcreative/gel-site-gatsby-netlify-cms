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

  // Function to find a react component to access its state.
  findReactComponent = (el) => {
    for (const key in el) {
      if (key.startsWith('__reactInternalInstance$')) {
        const fiberNode = el[key];
        // Don't ask why I had to do this... It works.
        return fiberNode.return.return.return.return.return.stateNode;
      }
    }
    
    return null;
  }

  // Function to summon the modal when the button is pressed.
  summonModal = () => {
    if (document.getElementById('gel-avatarmodal')) {
      let avatarModal = document.getElementById('gel-avatarmodal');
      let avatarModalComponent = this.findReactComponent(avatarModal);
      avatarModalComponent.setState({active: true, type: 'obnoxious'})
    }    
  }

  render() {
    return (
      <StyledAvatarButton className="button gel-button-2 is-primary" onClick={this.summonModal.bind(this)}>Download Customer Avatar Template Now</StyledAvatarButton>
    );
  }
};

export default AvatarButton;
