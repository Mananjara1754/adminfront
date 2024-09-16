import React from 'react';
import './style/AccueilPage.css';
import Menu from '../components/Menu';
import { useNavigate } from 'react-router-dom';
import BusCard from '../components/BusCard';
// import { Navigation } from '@mui/icons-material';
const AccueilPage = () => {
  const navigate = useNavigate();
    const handleClick = () => {
        navigate('/statistique');  // Redirige vers la page d'accueil
        console.log("click");
      };
      
  return (
    <div className="app">
      <Menu />
      <div className="main-content">
        <div className="container">
            <h1>Liste des Bus</h1>
            <div className="bus-list">
              
                <BusCard
                id_bus={'Pers 1'}
                nom_chauffeur="Nom du chauffeur"
                prenom_chauffeur="Prénom du chauffeur"
                numero_matricule="12345"
                nb_place={50}
                action={handleClick}/>

                <BusCard
                id_bus={'Pers 1'}
                nom_chauffeur="Nom du chauffeur"
                prenom_chauffeur="Prénom du chauffeur"
                numero_matricule="12345"
                nb_place={50}
                action={handleClick}/>

                <BusCard
                id_bus={'Pers 1'}
                nom_chauffeur="Nom du chauffeur"
                prenom_chauffeur="Prénom du chauffeur"
                numero_matricule="12345"
                nb_place={50}
                action={handleClick}/>

                <BusCard
                id_bus={'Pers 1'}
                nom_chauffeur="Nom du chauffeur"
                prenom_chauffeur="Prénom du chauffeur"
                numero_matricule="12345"
                nb_place={50}
                action={handleClick}/>

                <BusCard
                id_bus={'Pers 1'}
                nom_chauffeur="Nom du chauffeur"
                prenom_chauffeur="Prénom du chauffeur"
                numero_matricule="12345"
                nb_place={50}
                action={handleClick}/>

                <BusCard
                id_bus={'Pers 1'}
                nom_chauffeur="Nom du chauffeur"
                prenom_chauffeur="Prénom du chauffeur"
                numero_matricule="12345"
                nb_place={50}
                action={handleClick}/>

            </div>
        </div>
      </div>
    </div>
  );
};

export default AccueilPage;
