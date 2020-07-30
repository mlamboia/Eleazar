import React, { Component } from 'react';
import { 
  Container,
  ReactTableStyle
} from './index';
import api from '../api/index'

class ListContacts extends Component {
  constructor(props){
    super(props)
    this.state = {
      contacts: [],
      isLoading: false
    }
  }

  componentDidMount = async () => {
    this.setState({ isLoading: true })

    await api.getAllContacts().then(contacts => {
      this.setState({
          contacts: contacts.data.data,
          isLoading: false
      })
    })
  }

  render(){
    const { contacts, isLoading } = this.state;

    const columns = [
      {
        Header: 'Nome',
        accessor: 'nome',
        filterable: true
      },
      {
        Header: 'Endereço',
        accessor: 'endereco',
        filterable: true
      },
      {
        Header: 'Entrega',
        accessor: 'entrega',
        filterable: true
      },
      {
        Header: 'Telefone',
        accessor: 'telefone',
        filterable: true
      }
    ];

    let showTable = true;
    if(!contacts.length){
      showTable = false
    }

    console.log(contacts)

    return(
      <Container>

      </Container>
    )
  }
}

export default ListContacts