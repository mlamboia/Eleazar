import React from 'react';
import { TableStyle } from './index';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';

const ReactBsTable = require('react-bootstrap-table');

const { BootstrapTable } = ReactBsTable;
const { TableHeaderColumn } = ReactBsTable;

function Table(data, columns) {
  return (
    <TableStyle>
      <BootstrapTable data={data} pagination>
        {columns.map((column) => (
          <TableHeaderColumn isKey={column.key} dataField={column.id}>
            {column.header}
          </TableHeaderColumn>
        ))}
      </BootstrapTable>
    </TableStyle>
  );
}

export default Table;
