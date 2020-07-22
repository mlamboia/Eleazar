import React, { Component } from 'react';
import { 
  Container, 
  Nav, 
  Link, 
  Logo 
} from './index';

class Navbar extends Component {
  render() {
    return (
      <Container>
        <Nav>
          <Logo
          title={'SEMEAR GRILLHALL'}
          icon={'dove'}
          color={'white'}
          size={50}
          />
          <Link
          title={'BUSCAR CONTATOS'}
          icon={'search'}
          color={'purple'}
          size={50}
          />
          <Link
          title={'ADICIONAR CONTATOS'}
          icon={'user-plus'}
          color={'red'}
          size={50}
          />
          <Link
          title={'EDITAR CONTATOS'}
          icon={'user-edit'}
          color={'yellow'}
          size={50}
          />
          <Link
          title={'CARDAPIO'}
          icon={'clipboard'}
          color={'green'}
          size={55}
          />
        </Nav>
      </Container>
    )
  }
}

export default Navbar;