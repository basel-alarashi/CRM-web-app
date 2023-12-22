import React, {useState, useEffect, Fragment} from 'react';
import MyNavbar from './MyNavbar';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import {useParams, useNavigate} from 'react-router-dom'

const Customer = () => {
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

	const getDetails = () => {
		axios.get(`http://127.0.0.1:8000/api/customer/${id}/`)
		.then(res => res.data)
		.then(data => {
			setState(data);
		}).catch(error => {
			navigate('/error');
		});
	};

	useEffect(getDetails, [navigate, id]);

	const customerDelete = e => {
		e.preventDefault();
		const config = {
			'headers': {
				'Content-Type': 'application/json',
				'X-CSRFToken': getCookie('csrftoken')
			}
		};
		axios.delete(`http://127.0.0.1:8000/api/delete/${id}/`,
			config)
		.then(res => {
			navigate('/');
		}).catch(error => {
			navigate('/error');
		});
	};

	return(
		<div>
			<MyNavbar />
			<Card 
			bg='secondary'
			text='light' border='dark'
			style={{margin: '5% 20%', textAlign: 'center' }}>
		      <Card.Body>
		        <Card.Header>
		        	<Card.Title className='display-2'>{state.username}</Card.Title>
		        </Card.Header>
		        <Card.Subtitle className="mb-2 display-6">{state.email}</Card.Subtitle>
			      <Card.Subtitle className="mb-2 display-6">{state.phone}</Card.Subtitle>
		        <Card.Text>{state.created_at}</Card.Text>
		        <Card.Text>{state.city}</Card.Text>
		        <Card.Text>{state.district}</Card.Text>
		        <Card.Text>{state.zipcode}</Card.Text>
		        {(state.user === state.request_id)? (
		        	<Fragment>
		        		<Card.Link className='btn btn-primary' href={`/update/${id}`}>Update</Card.Link>
			        	<Card.Link 
				        className='btn btn-danger' 
				        onClick={e => customerDelete(e)}>
				        	Delete
				        </Card.Link>
		        	</Fragment>
		        ): null}
		      </Card.Body>
		  </Card>
		</div>
	);
};

export default Customer;
