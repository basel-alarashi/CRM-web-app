import React, {useState, useEffect} from 'react';
import MyNavbar from './MyNavbar';
import axios from 'axios';
import Table from 'react-bootstrap/Table';
import {useNavigate} from 'react-router-dom';

const Home = () => {
	const [state, setState] = useState([]);
	const navigate = useNavigate();

	function getData(){
		const config = {
			'headers': {
				'Content-Type': 'application/json',
				//'WWW-authenticate': 'Basic'
			}
		};
		axios.get('http://127.0.0.1:8000/api/', config)
		.then(res => res.data)
		.then(data => {
			setState(data);
		});
	}

	useEffect(getData, []);

	const onClick = (id) => {
		navigate(`/customers/${id}`)
	};

	return(
		<div>
			<MyNavbar />
			<Table 
			style={{marginTop: '10%', width: '75%', marginLeft: '10%'}}
			striped bordered hover 
			variant="dark">
	      <thead className='table-light'>
	        <tr>
	          <th>Id</th>
	          <th>Username</th>
	          <th>City</th>
	          <th>District</th>
	          <th>ZipCode</th>
	          <th>Email</th>
	          <th>Phone</th>
	        </tr>
	      </thead>
	      <tbody>
	        {state.map(function(i, k){
	        	return(
	        		<tr key={k} onClick={e => onClick(i.id)}>
	        			<td>
	        				{i.id}
	        			</td>
	        			<td>
	        				{i.name}
	        			</td>
	        			<td>
	        				{i.city}
	        			</td>
	        			<td>
	        				{i.district}
	        			</td>
	        			<td>
	        				{i.zipcode}
	        			</td>
	        			<td>
	        				{i.email}
	        			</td>
	        			<td>
	        				{i.phone}
	        			</td>
	        		</tr>
	        	);
	        })}
	      </tbody>
	    </Table>
		</div>
	);
};

export default Home;
