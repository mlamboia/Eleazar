import React from 'react';
import { CustomLogo, LinkText, LogoText } from '../assets/style/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/icon/icons';

const Logo = (props) =>{
  return(
    <CustomLogo>
      <FontAwesomeIcon 
      icon={props.icon}
      style={{
        color: props.color
      }}/>
      <LinkText>
        <LogoText>
          { props.label }
        </LogoText>
      </LinkText>
    </CustomLogo>
  )
}

export default Logo