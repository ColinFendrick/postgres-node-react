import React from 'react';
import {
	Switch,
	Route,
	Link
} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import AddTutorial from './components/AddTutorial';
import Tutorial from './components/Tutorial';
import TutorialsList from './components/TutorialsList';
import AddUser from './components/AddUser';
import UserList from './components/UserList';
import User from './components/User';
import Uninsured from './components/Uninsured';
import Insured from './components/Insured';

const App = () => {
	return (
		<div>
			<nav className = 'navbar navbar-expand navbar-dark bg-dark'>
				<a href = '/tutorials' className = 'navbar-brand'>
      Postgres Tutorial </a>
				<div className = 'navbar-nav mr-auto'>
					<li className = 'nav-item'>
						<Link to = {'/tutorials'} className = 'nav-link'>
						Tutorials
						</Link>
					</li>
					<li className = 'nav-item'>
						<Link to = {'/add'} className = 'nav-link'>
							Add
						</Link>
					</li>
					<li className = 'nav-item'>
						<Link to ={'/adduser'} className = 'nav-link'>
							Add a User
						</Link>
					</li>
					<li className = 'nav-item'>
						<Link to ={'/users'} className = 'nav-link'>
							All Users
						</Link>
					</li>
					<li className = 'nav-item'>
						<Link to ={'/users/uninsured'} className = 'nav-link'>
							Uninsured
						</Link>
					</li>
					<li className = 'nav-item'>
						<Link to ={'/users/insured'} className = 'nav-link'>
							Insured
						</Link>
					</li>
				</div>
			</nav>

			<div className = 'container mt-3' >
				<Switch>
					<Route exact path={['/', '/tutorials']} component={TutorialsList} />
					<Route exact path='/add' component={AddTutorial} />
					<Route path='/tutorials/:id' component={Tutorial} />
					<Route exact path='/adduser' component={AddUser} />
					<Route exact path='/users' component={UserList} />
					<Route exact path='/users/uninsured' component={Uninsured} />
					<Route exact path='/users/insured' component={Insured} />
					<Route path='/users/:id' component={User} />
				</Switch>
			</div>
		</div>
	);
};

export default App;
