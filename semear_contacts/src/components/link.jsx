import React from 'react';
import { CustomNavLink, LinkText } from '../assets/style/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Link = (props) => {
  return (
    <CustomNavLink to={props.to} exact={props.exact}>
      <FontAwesomeIcon
        icon={props.icon}
        style={{
          color: props.color,
        }}
      />
      <LinkText style={{ color: props.color }}>{props.label}</LinkText>
    </CustomNavLink>
  );
};

export default Link;
