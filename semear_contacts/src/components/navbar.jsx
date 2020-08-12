import React, { Component } from 'react';
import { Nav, Link, Logo } from './index';

class Navbar extends Component {
  render() {
    return (
      <Nav>
        <Logo label={'SEMEAR GRILLHALL'} icon={'dove'} color={'white'} />
        <Link
          exact={true}
          to={'/'}
          label={'BUSCAR CONTATOS'}
          icon={'search'}
          color={'darkorchid'}
        />
        <Link
          to={'/add_contact'}
          label={'ADICIONAR CONTATOS'}
          icon={'user-plus'}
          color={'Brown'}
        />
        <Link
          to={'/menu'}
          label={'CARDAPIO'}
          icon={'edit'}
          color={'chocolate'}
        />
        <Link
          to={'/dishes'}
          label={'PRATOS DO DIA'}
          icon={'utensils'}
          color={'DodgerBlue'}
        />
      </Nav>
    );
  }
}

export default Navbar;
