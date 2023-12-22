import React, {Fragment, useState, useEffect} from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from 'axios';

const MyNavbar = () => {
	const [isAuthenticated, setIsAuthenticated] = useState(false);
	const navEffect = () => {
		console.log('navEffect');
		axios.get('http://127.0.0.1:8000/api/check/')
		.then(res => res.data)
		.then(data => {
			setIsAuthenticated(data.auth);
		});
	};

	useEffect(navEffect, []);

	const logout = () => {
		axios.post('http://127.0.0.1:8000/api/logout/')
		.then(res => {
			if(res.status === 200){
				setIsAuthenticated(false);
			}
		})
	};
  return (
  	<Navbar bg="dark" data-bs-theme="dark">
	    <Container>
	      <Navbar.Brand href="/">
	      	<span>Customer</span><br />
	      	<span>Relation Manager</span>
	      </Navbar.Brand>
	      <Nav className="me-auto">
	        {isAuthenticated? (
	        	<Fragment>
	        		<Nav.Link href="/create">Create Customer</Nav.Link>
	        		<Nav.Link onClick={logout}>Logout</Nav.Link>
	        	</Fragment>
	        ): (
	        	<Fragment>
	        		<Nav.Link href="/register">Register</Nav.Link>
	        		<Nav.Link href="/login">Login</Nav.Link>
	        	</Fragment>
	        )}
	      </Nav>
	    </Container>
	  </Navbar>
  );
};

export default MyNavbar;
/*
<Alert variant='danger' dismissible>
        (Try Another Username)
      </Alert>
*/