import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem('token'); // Assure-toi que c'est le bon nom pour ton token
    // alert("lolo");
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;
