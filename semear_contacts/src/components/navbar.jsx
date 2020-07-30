import React, { Component } from 'react';
import { 
  Nav, 
  Link, 
  Logo 
} from './index';

class Navbar extends Component {
  render() {
    return (
      <Nav>
        <Logo
        title={'SEMEAR GRILLHALL'}
        icon={'dove'}
        color={'white'}
        />
        <Link 
        to={'/'}
        title={'BUSCAR CONTATOS'}
        icon={'search'}
        color={'darkorchid'}
        />
        <Link
        to={'/add_contact'}
        title={'ADICIONAR CONTATOS'}
        icon={'user-plus'}
        color={'Brown'}
        />
        <Link
        to={'/menu'}
        title={'CARDAPIO'}
        icon={'edit'}
        color={'chocolate'}
        />
        <Link
        to={'/dishes'}
        title={'PRATOS DO DIA'}
        icon={'utensils'}
        color={'DodgerBlue'}
        />
      </Nav>
    )
  }
}

export default Navbar;