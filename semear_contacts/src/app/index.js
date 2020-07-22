import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from '../components/navbar';

import 'bootstrap/dist/css/bootstrap.min.css'


function App() {
  return (
    <Router>
      <Navbar/>
    </Router>
  )
}

export default App