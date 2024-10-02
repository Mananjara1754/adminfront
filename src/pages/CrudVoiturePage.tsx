import { useState, useEffect } from 'react';
import './style/CrudVoiturePage.css';
import Menu from '../components/Menu';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { Bus } from '../dto/Bus';
import BusForm from '../components/BusForm';
import axios from 'axios';

const CrudVoiturePage = () => {
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

  const [showPopup, setShowPopup] = useState(false);
  const [currentBus, setCurrentBus] = useState<Bus | null>(null);

  useEffect(() => {
    // Simuler le chargement des données des bus
    getBusData();
  }, []); 

  const handleAddBus = () => {
    setCurrentBus(null);
    setShowPopup(true);
  };

  const handleEditBus = (bus: Bus) => {
    setCurrentBus(bus);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setCurrentBus(null);
  };

  const handleSubmit = (bus: Bus) => {
    if (currentBus) {
      // Logique de modification
      //setBuses(buses.map(b => b.id === bus.id ? bus : b));
    } else {
      // Logique d'insertion
      //setBuses([...buses, { ...bus, id: Date.now() }]);
    }
    handleClosePopup();
  };


  return (
    <div className="app">
      <Menu />
      <div className="main-content">
        <div className="container">
          <h1>Liste des véhicules</h1>
          <button className="add-bus-btn" onClick={handleAddBus}>
              Ajouter un bus
          </button>
          <div className="liste-bus-container">
            <table className="bus-table">
              <thead>
                <tr>
                  <th>Immatriculation</th>
                  <th>Chauffeur</th>
                  <th>Capacité</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>

                {busData && Array.isArray(busData) && busData.length > 0 ? (
                  busData.map((item) => (
                    <tr key={item.immatricule}>
                    <td>{item.chauffeur.nom_personnel}</td>
                    <td>{item.immatricule}</td>
                    <td className="capacite-column">{item.nb_place}</td>
                    <td>
                      {/* <button className="action-btn edit" onClick={() => handleEditBus(bus)}><FaEdit /></button> */}
                      <button className="action-btn delete"><FaTrash /></button>
                    </td>
                  </tr>
                  ))
                ) : (
                  <p>Aucun bus disponible</p>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showPopup && (
        <BusForm
          bus={currentBus}
          onClose={handleClosePopup}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default CrudVoiturePage;
