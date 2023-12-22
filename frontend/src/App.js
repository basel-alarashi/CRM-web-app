import {HashRouter as Router, Routes, Route} from 'react-router-dom';
import React from 'react';
import Home from './components/Home';
import CreateCustomer from './components/CreateCustomer';
import Customer from './components/Customer';
import UpdateCustomer from './components/UpdateCustomer';
import Register from './components/Register';
import Login from './components/Login';
import {ToastContainer} from 'react-toastify';
import Error from './components/Error';

function App() {
  return (
    <Router>
      <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light" />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/customers/:id' element={<Customer />} />
        <Route path='/create' element={<CreateCustomer />} />
        <Route path='/update/:id' element={<UpdateCustomer />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/error' element={<Error />} />
      </Routes>
    </Router>
  );
}

export default App;
