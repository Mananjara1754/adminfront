import { useState, useEffect } from 'react';
import './style/PeoplePage.css';
import Menu from '../components/Menu';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { Bus } from '../dto/Bus';
import axios from 'axios';
import './style/Spinner.css';
import { Personnel } from '../dto/Personnel';

const PeoplePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [personnelData, setpersonnelData] = useState<Personnel[]>([]);  
  async function getpersonnelData() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BFF_ADMIN_URL}/people/listePeople`,{
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Afficher le token dans les en-têtes à partir de localStorage
      }});
      console.log("Réponse API : ", response.data); 
      if (response.data) {
        setpersonnelData(response.data); 
      } else {
        console.error("Les données reçues ne sont pas sous forme de tableau.");
      }
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API : ", error);
    }
  }
    useEffect(() => { 
      getpersonnelData();
    },[]);


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
                  <th>Matricule</th>
                  <th>Nom</th>
                  <th>Prenom</th>
                  <th>Numero Pers</th>
                </tr>
              </thead>
              <tbody>
              {personnelData && Array.isArray(personnelData) && personnelData.length > 0 ? (
                  personnelData.map((item) => (
                  <tr key={item.id_personnel}>
                    <td>{item.id_personnel}</td>
                    <td>{item.nom_personnel}</td>
                    <td>{item.prenom}</td>
                    <td>{item.numero_personnel}</td>
                  </tr>
                  ))
                ) : (
                  <p>Aucun Personnel disponible</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PeoplePage;
