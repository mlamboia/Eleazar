import React from 'react';
import { api, Container, Table } from '../index';
import useFetch from '../../api/useFetch';
import BootstrapTable from 'react-bootstrap-table-next';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

function ListContacts() {
  const { data } = useFetch('/contacts');

  if (!data) {
    return <p>Carregando...</p>;
  }

  console.log(data.data);

  const columns = [
    {
      header: 'Nome',
      id: 'nome',
      sort: true,
    },
    {
      header: 'Bairro',
      id: 'bairro',
      sort: true,
    },
    {
      header: 'Endereço',
      id: 'endereco',
      sort: true,
    },
    {
      header: 'Entrega',
      id: 'entrega',
      sort: true,
    },
    {
      header: 'Telefone',
      id: 'telefone',
      sort: true,
    },
  ];

  return (
    <Container>
      <BootstrapTable keyField='nome' columns={columns} data={data} />
    </Container>
  );
}

export default ListContacts;
