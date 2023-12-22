import React from 'react';
import MyNavbar from './MyNavbar';

const Error = () => {
	return(
		<div>
			<MyNavbar />
			<div style={{
				margin: '5% 10%',
				backgroundColor: '#cc0044',
				borderRadius: '10px',
				textAlign: 'center',
				padding: '10px',
				border: '2rem solid rgba(234, 110, 72, 0.5)'
			}}>
				<h1 className='text-light display-2'>404 Not Found</h1>
			</div>
		</div>
	);
};

export default Error;
//background: 'linear-gradient(90deg, rgba(188,26,99,1) 0%, rgba(234,110,72,1) 100%)'