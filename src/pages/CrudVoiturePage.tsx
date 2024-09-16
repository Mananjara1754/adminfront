import React, { useState, useEffect } from 'react';
import './style/CrudVoiturePage.css';
import Menu from '../components/Menu';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { Bus } from '../dto/Bus';
import BusForm from '../components/BusForm';

// Définissez une interface pour le type de bus


const CrudVoiturePage = () => {
  const [buses, setBuses] = useState<Bus[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentBus, setCurrentBus] = useState<Bus | null>(null);

  useEffect(() => {
    // Simuler le chargement des données des bus
    setBuses([
      { id: 1, nom: 'Bus 1', chauffeur: 'Jean Dupont', capacite: 50, annee: 2020 },
      { id: 2, nom: 'Bus 2', chauffeur: 'Marie Martin', capacite: 40, annee: 2019 },
      // Ajoutez d'autres bus ici
    ]);
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
      setBuses(buses.map(b => b.id === bus.id ? bus : b));
    } else {
      // Logique d'insertion
      setBuses([...buses, { ...bus, id: Date.now() }]);
    }
    handleClosePopup();
  };

  // const handleClick = () => {
  //   navigate('/accueil');
  //   console.log("click");
  // };

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
                  <th>Nom du bus</th>
                  <th>Chauffeur</th>
                  <th>Capacité</th>
                  <th>Année</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {buses.map((bus) => (
                  <tr key={bus.id}>
                    <td>{bus.nom}</td>
                    <td>{bus.chauffeur}</td>
                    <td className="capacite-column">{bus.capacite}</td>
                    <td>{bus.annee}</td>
                    <td>
                      <button className="action-btn edit" onClick={() => handleEditBus(bus)}><FaEdit /></button>
                      <button className="action-btn delete"><FaTrash /></button>
                    </td>
                  </tr>
                ))}
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
