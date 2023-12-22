import React, {useState} from 'react';
import MyNavbar from './MyNavbar';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import {Link, useNavigate} from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import {toast} from 'react-toastify';

const Register = (props) => {
	const [state, setState] = useState({
		username: '',
		password: ''
	});
	const {username, password} = state;
	const navigate = useNavigate();

	const onChange = e => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	};

	const onSubmit = e => {
		e.preventDefault();
		const config = {
			'headers': {
				'Content-Type': 'application/json',
				//'WWW-authenticate': 'Basic'
			}
		};
		const body = JSON.stringify({username, password});
		// console.log('Body: ', body)
		axios.post(
			'http://127.0.0.1:8000/api/register/',
			body,
			config
		).then(res => {
			if(res.status === 201){
				navigate('/');
			}
		}).catch(error => {
			toast("Try Another Username.", {
				position: "top-right",
				autoClose: 5000,
				hideProgressBar: false,
				closeOnClick: true,
				pauseOnHover: true,
				draggable: true,
				progress: undefined,
				theme: "light",
			});
		})
	};

	return(
		<div>
			<MyNavbar />
			<h1 className='display-2 m-5'>Sign Up</h1>
			<Form className='m-5' onSubmit={e => onSubmit(e)}>
	      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
	        <Form.Label column sm="2">
	          Username:
	        </Form.Label>
	        <Col sm="10">
	          <Form.Control
	          type='text'
	          placeholder='Enter Your Username'
	          name='username'
	          value={username}
	          onChange={e => onChange(e)} />
	        </Col>
	      </Form.Group>

	      <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
	        <Form.Label column sm="2">
	          Password:
	        </Form.Label>
	        <Col sm="10">
	          <Form.Control
	          type="password"
	          placeholder="Enter your Password"
	          name='password'
	          value={password}
	          onChange={e => onChange(e)} />
	        </Col>
	      </Form.Group>
	      <Form.Text muted>
	      	Already have an account? 
	      	<Link to='/login'>
	      		Log in.
	      	</Link><br />
	      </Form.Text>
	      <Button className='mt-3' variant="secondary" type="submit">
	        Submit
	      </Button>
	    </Form>
		</div>
	);
};

export default Register;
