import React, { Component } from 'react';
import { TableStyle } from './index';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

var ReactBsTable  = require('react-bootstrap-table');
var BootstrapTable = ReactBsTable.BootstrapTable;
var TableHeaderColumn = ReactBsTable.TableHeaderColumn;



class Table extends Component {
  constructor(props){
    super(props);
    this.state = {
      data: this.props.data,
      columns: this.props.columns
    }
  }

  render() {
    const { columns } = this.state;
    const { data } = this.props
    return (
      <TableStyle>
        <BootstrapTable
          data={ data }
          pagination>
            { 
              columns.map((column) => {
                return(
                <TableHeaderColumn isKey={ column.key } dataField={ column.id }>
                    { column.header }
                </TableHeaderColumn>
                )
              })  
            }
        </BootstrapTable>
      </TableStyle>
    );
  }
}

export default Table;