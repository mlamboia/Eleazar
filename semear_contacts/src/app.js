import React from 'react'
import NavBar from './components/navbar'
import { BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import {
    AddContact,
    UpdateContact,
    ListContacts
} from './pages/index';

function App() {
    return (
        <Router>
            <NavBar />
            <Switch>
                <Route path='/' exact component={ListContacts}/>
                <Route path='/add_contact' exact component={AddContact}/>
                <Route path='/menu' exact component={UpdateContact}/>
                <Route path='/dishes' exact component={AddContact}/>
            </Switch>
        </Router>
    )
}

export default App