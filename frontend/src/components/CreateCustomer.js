import React, {useState} from 'react';
import MyNavbar from './MyNavbar';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {Link, useNavigate} from 'react-router-dom';
import axios from 'axios';

const CreateCustomer = () => {
	const [state, setState] = useState({
		"city": "",
    "district": "",
    "zipcode": "",
    "email": "",
    "phone": "",
	});
	const navigate = useNavigate();
	const {city, district, zipcode, email, phone} = state;
	const onSubmit = e => {
		e.preventDefault();
		const config = {
			'headers': {
				'Content-Type': 'application/json'
			}
		};
		const body = JSON.stringify({city, district, zipcode, email, phone});
		axios.post('http://127.0.0.1:8000/api/create/',
			body, config
		).then(res => {
			navigate('/');
		}).catch(error => {
			navigate('/error');
		});

	};

	const onChange = e => {
		setState({
			...state,
			[e.target.name]: e.target.value
		});
	};

	return(
		<div>
			<MyNavbar />
			<h1 style={{margin: '2% 5%'}} className='display-2'>Create Customer Record</h1>
			<Form style={{margin: '2% 7%'}} onSubmit={e => onSubmit(e)}>
	      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
	        <Form.Label column sm="2">
	          Email:
	        </Form.Label>
	        <Col sm="10">
	          <Form.Control
	          type='text'
	          placeholder='Enter Your Email Address'
	          name='email'
	          value={email}
	          onChange={e => onChange(e)} />
	        </Col>
	      </Form.Group>

	      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
	        <Form.Label column sm="2">
	          Phone:
	        </Form.Label>
	        <Col sm="10">
	          <Form.Control
	          type='text'
	          placeholder='Enter Your Phone Number'
	          name='phone'
	          value={phone}
	          onChange={e => onChange(e)} />
	        </Col>
	      </Form.Group>

	      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
	        <Form.Label column sm="2">
	          City:
	        </Form.Label>
	        <Col sm="10">
	          <Form.Control
	          type='text'
	          placeholder='Enter Your City'
	          name='city'
	          value={city}
	          onChange={e => onChange(e)} />
	        </Col>
	      </Form.Group>

	      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
	        <Form.Label column sm="2">
	          District:
	        </Form.Label>
	        <Col sm="10">
	          <Form.Control
	          type='text'
	          placeholder='Enter Your District'
	          name='district'
	          value={district}
	          onChange={e => onChange(e)} />
	        </Col>
	      </Form.Group>

	      <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
	        <Form.Label column sm="2">
	          Zipcode:
	        </Form.Label>
	        <Col sm="10">
	          <Form.Control
	          type='text'
	          placeholder='Enter Your Zipcode'
	          name='zipcode'
	          value={zipcode}
	          onChange={e => onChange(e)} />
	        </Col>
	      </Form.Group>

	      <Form.Text muted>
	      	User can only have one <strong>customer record.</strong>
	      </Form.Text><br />
	      <Button className='mt-3' variant="secondary" type="submit">
	        Submit
	      </Button>
	      <Link style={{marginLeft: '10px'}} className='btn btn-secondary mt-3' to='/'>
	      	Back
	      </Link>
	    </Form>
		</div>
	);
};

export default CreateCustomer;
