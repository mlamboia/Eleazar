import React from 'react';
import { NavLink, LinkText } from '../assets/style/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import '../assets/icon/icons';

const Link = (props) =>{
  return(
    <NavLink>
      <FontAwesomeIcon 
      icon={props.icon}
      style={{ 
        color: props.color, 
        fontSize: props.size
      }}/>
      <LinkText style={{ color: props.color}}>
        { props.title }
      </LinkText>
    </NavLink>
  )
}

export default Link