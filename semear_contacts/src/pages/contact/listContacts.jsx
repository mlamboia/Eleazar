import React, { Component } from 'react';
import { 
  api,
  Container,
} from '../index';
import { Table } from '../index';
import useFetch from '../../api/useFetch'

function ListContacts(){
  const { data } = useFetch(`/contacts`);

  if(!data){
    return <p>Carregando...</p>
  }

  const columns = [
    {
      header: 'Nome',
      id: 'nome',
      key: true,
      filterable: true
    },
    {
      header: 'Bairro',
      id: 'bairro',
      filterable: true
    },
    {
      header: 'Endereço',
      id: 'endereco',
      filterable: true
    },
    {
      header: 'Entrega',
      id: 'entrega',
      filterable: true
    },
    {
      header: 'Telefone',
      id: 'telefone',
      filterable: true
    }
  ];

  return(
    <Container>
      <Table columns={columns} data={data.data}/>
    </Container>
  )
}

export default ListContacts