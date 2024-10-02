import './style/AccueilPage.css';
import Menu from '../components/Menu';
import { useNavigate } from 'react-router-dom';
import BusCard from '../components/BusCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Bus } from '../dto/Bus';
const AccueilPage = () => {
  const navigate = useNavigate();
  const [busData, setBusData] = useState<Bus[]>([]);  
  async function getBusData() {
    try {
      const response = await axios.get(`http://192.168.1.111:8087/listeVehicule`,{
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Afficher le token dans les en-têtes à partir de localStorage
      }});
      console.log("Réponse API : ", response.data); 
      if (response.data && Array.isArray(response.data.data)) {
        setBusData(response.data.data); 
      } else {
        console.error("Les données reçues ne sont pas sous forme de tableau.");
      }
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API : ", error);
    }
  }
    useEffect(() => { 
      getBusData();
    },[]);
    
    const handleClick = () => {
        navigate('/feuilleRoute'); 
        console.log("click");
      };
      
  return (
    <div className="app">
      <Menu />
      <div className="main-content">
        <div className="container">
            <h1>Liste des Bus</h1>
            <div className="bus-list">
                  {busData && Array.isArray(busData) && busData.length > 0 ? (
                  busData.map((item) => (
                    <BusCard
                id_bus={'Pers 1'}
                nom_chauffeur={item.chauffeur.nom_personnel}
                prenom_chauffeur={item.chauffeur.prenom}
                numero_matricule={item.immatricule}
                nb_place={item.nb_place}
                action={handleClick}/>
                  ))
                ) : (
                  <p>Aucun bus disponible</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default AccueilPage;
