import React, {useState, useEffect} from 'react';
import MyNavbar from './MyNavbar';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import {Link, useNavigate, useParams} from 'react-router-dom';
import axios from 'axios';

const UpdateCustomer = () => {
	const [state, setState] = useState({
		"id": 0,
    "created_at": "",
    "city": "",
    "district": "",
    "zipcode": "",
    "email": "",
    "phone": "",
    "user": 0,
    "username": "",
    "request_id": 0
	});
	const {id} = useParams();
	const navigate = useNavigate();
	const {state_id, created_at, city, district, zipcode, email, phone, user, username, request_id} = state;

	function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== '') {
      const cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        // Does this cookie string begin with the name we want?
        if (cookie.substring(0, name.length + 1) === (name + '=')) {
          cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
          break;
        }
      }
    }
    return cookieValue;
  }

	const getCustomer = () => {
		axios.get(`http://127.0.0.1:8000/api/customer/${id}/`)
		.then(res => res.data)
		.then(data => {
			setState(data);
		}).catch(error => {
			navigate('/error');
		});
	};

	useEffect(getCustomer, [id, navigate]);

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
				'X-CSRFToken': getCookie('csrftoken')
			}
		};
		const body = JSON.stringify({
			city, 
			district,
			zipcode, 
			email, 
			phone, 
			user,
		});
		axios.put(
			`http://127.0.0.1:8000/api/update/${id}/`,
			body,
			config
		).then(res => {
			navigate('/');
		}).catch(error => {
			navigate('/error');
		});
	};
	
	return(
		<div>
			<MyNavbar />
			<h1 style={{margin: '2% 5%'}} className='display-2'>Edit</h1>
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
	      	Just enter the value you want to <strong>Update.</strong>
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

export default UpdateCustomer;
