import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import * as jwtDecode from 'jwt-decode';

interface DecodedToken {
  name: string;         // Le nom de l'utilisateur
  email: string;
  id_personnel: string;
  id_profil: string;
  attributes?: {
    id_personnel?: string;
    id_profil?: string; // id_personnel dans les attributs, si présent
  };
}

const PrivateRoute: React.FC = () => {
  const token = localStorage.getItem('token'); // Assure-toi que c'est le bon nom pour ton token
  if(token){
    const decoded: DecodedToken = jwtDecode.default(token);
    if(decoded.id_profil != "Admin"){
      return <Navigate to="/" />;
    }
  }

  return token ? <Outlet /> : <Navigate to="/" />;
};

// export default PrivateRoute;

// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import * as jwtDecode from 'jwt-decode'; // Utiliser l'importation par défaut

// interface DecodedToken {
//   id_profil?: string; // Assurez-vous que la structure de votre token correspond
//   // Ajoutez d'autres champs si nécessaire
// }

// const PrivateRoute: React.FC = () => {
//   const token = localStorage.getItem('token'); // Récupérer le token depuis le localStorage

//   if (token) {
//     try {
//       // Décoder le token
//       const decoded: DecodedToken = jwtDecode.default(token); // Appeler avec .default

//       // Vérifier si l'id_profil est présent et s'il correspond à ROLE_04
//       if (decoded.id_profil && decoded.id_profil !== 'ROLE_04') {
//         // Si l'utilisateur n'a pas le bon rôle, rediriger vers la page d'accueil
//         return <Navigate to="/" />;
//       }

//       // Si tout est correct, continuer vers la page privée
//       return <Outlet />;
//     } catch (error) {
//       console.error('Erreur lors du décodage du token:', error);
//       // Si une erreur se produit lors du décodage du token, rediriger vers la page d'accueil
//       return <Navigate to="/" />;
//     }
//   }

//   // Si le token n'est pas présent, rediriger vers la page d'accueil
//   return <Navigate to="/" />;
// };

export default PrivateRoute;

