import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/navbar';

import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

function App() {
  return (
    <Router>
      <Navbar/>
    </Router>
  )
}

export default App