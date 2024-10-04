import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';

interface DecodedToken {
  name: string;         // Le nom de l'utilisateur
  email: string;
  id_personnel: string;
  id_profil: string;
  sub :string;
  attributes?: {
    id_personnel?: string;
    id_profil?: string; // id_personnel dans les attributs, si présent
  };
}

const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem('token'); // Assure-toi que c'est le bon nom pour ton token
  if(token){
    console.log(jwtDecode.default(token));
    const decoded: DecodedToken = jwtDecode.default(token);
    if(decoded.id_profil != "Admin"){
      return <Navigate to="/" />;
    }
  }
  return token ? <Outlet /> : <Navigate to="/" />;
};

export default PrivateRoute;

