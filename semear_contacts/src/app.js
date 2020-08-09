import React from 'react'
import NavBar from './components/navbar'
import { 
	BrowserRouter as Router,
	Route, 
	Switch
} from 'react-router-dom'
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
				<Route exact path='/' component={ListContacts}/>
				<Route path='/add_contact' component={AddContact}/>
				<Route path='/menu' component={UpdateContact}/>
				<Route path='/dishes' component={AddContact}/>
				<Route exact path='*' component={ListContacts}/>
			</Switch>
		</Router>
	)
}

export default App