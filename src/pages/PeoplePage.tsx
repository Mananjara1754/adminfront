import { useState, useEffect } from 'react';
import './style/PeoplePage.css';
import Menu from '../components/Menu';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { Bus } from '../dto/Bus';
import axios from 'axios';
import './style/Spinner.css';

const PeoplePage = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');


  useEffect(() => {
    // Simuler le chargement des données des bus
    setBuses([
      { id: 1, nom: 'Bus 1', chauffeur: 'Jean Dupont', capacite: 50, annee: 2020 },
      { id: 2, nom: 'Bus 2', chauffeur: 'Marie Martin', capacite: 40, annee: 2019 },
      // Ajoutez d'autres bus ici
    ]);
  }, []); 

  const handleAddAllPerson = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BFF_ADMIN_URL}/people/inscription`);
      setError("");
    } catch (error) {
      setError("Une erreur inattendue s'est produite");
    }
    finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="app">
      <Menu />
      <div className="main-content">
        <div className="container">
          <h1>Liste des personnes</h1>
          <button className="add-bus-btn" onClick={handleAddAllPerson} disabled={isLoading}>
          {isLoading ? <div className="spinner"></div> : 'Ajouter tous les personnes' }
          </button>
          {error && <p className="error-message" style={{color:'orangered',textAlign:'center'}}>{error}</p>}
          <div className="liste-bus-container">
            <table className="bus-table">
              <thead>
                <tr>
                  <th>Nom du bus</th>
                  <th>Chauffeur</th>
                  <th>Capacité</th>
                  <th>Année</th>
                </tr>
              </thead>
              <tbody>
                {buses.map((bus) => (
                  <tr key={bus.id}>
                    <td>{bus.nom}</td>
                    <td>{bus.chauffeur}</td>
                    <td className="capacite-column">{bus.capacite}</td>
                    <td>{bus.annee}</td>
                    
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
