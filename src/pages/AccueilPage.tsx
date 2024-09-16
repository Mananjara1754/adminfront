import React from 'react';
import './style/AccueilPage.css';
import Menu from '../components/Menu';
import { useNavigate } from 'react-router-dom';
import BusCard from '../components/BusCard';
// import { Navigation } from '@mui/icons-material';
const AccueilPage = () => {
  const navigate = useNavigate();
    const handleClick = () => {
        navigate('accueil');  // Redirige vers la page d'accueil
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
                {/* <BusCard id_bus='Pers 2' nom_chauffeur='Jane' prenom_chauffeur='Doe' numero_matricule='123456789' nb_place='2'/>
                <BusCard id_bus='Pers 3' nom_chauffeur='John' prenom_chauffeur='Doe' numero_matricule='123456789' nb_place='2'/>
                <BusCard id_bus='Pers 4' nom_chauffeur='Jane' prenom_chauffeur='Doe' numero_matricule='123456789' nb_place='2'/>
                <BusCard id_bus='Pers 5' nom_chauffeur='John' prenom_chauffeur='Doe' numero_matricule='123456789' nb_place='2'/>
                <BusCard id_bus='Pers 1' nom_chauffeur='John' prenom_chauffeur='Doe' numero_matricule='123456789' nb_place='2'/>
                <BusCard id_bus='Pers 2' nom_chauffeur='Jane' prenom_chauffeur='Doe' numero_matricule='123456789' nb_place='2'/>
                <BusCard id_bus='Pers 3' nom_chauffeur='John' prenom_chauffeur='Doe' numero_matricule='123456789' nb_place='2'/>
                <BusCard id_bus='Pers 4' nom_chauffeur='Jane' prenom_chauffeur='Doe' numero_matricule='123456789' nb_place='2'/>
                <BusCard id_bus='Pers 5' nom_chauffeur='John' prenom_chauffeur='Doe' numero_matricule='123456789' nb_place='2'/>
                <BusCard id_bus='Pers 1' nom_chauffeur='John' prenom_chauffeur='Doe' numero_matricule='123456789' nb_place='2'/>
                <BusCard id_bus='Pers 2' nom_chauffeur='Jane' prenom_chauffeur='Doe' numero_matricule='123456789' nb_place='2'/>
                <BusCard id_bus='Pers 3' nom_chauffeur='John' prenom_chauffeur='Doe' numero_matricule='123456789' nb_place='2'/>
                <BusCard id_bus='Pers 4' nom_chauffeur='Jane' prenom_chauffeur='Doe' numero_matricule='123456789' nb_place='2'/>
                <BusCard id_bus='Pers 5' nom_chauffeur='John' prenom_chauffeur='Doe' numero_matricule='123456789' nb_place='2'/> */}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AccueilPage;
