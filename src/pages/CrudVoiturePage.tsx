import React, { useState, useEffect } from 'react';
import './style/CrudVoiturePage.css';
import Menu from '../components/Menu';
import { FaTrash, FaEdit, FaPlus } from 'react-icons/fa';
import { Bus } from '../dto/Bus';
import axios from 'axios';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Chauffeur } from '../dto/Chauffeur';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './style/Spinner.css';
import { clearBusCache, getBusData } from '../services/BusService';
import { getChauffeurData } from '../services/PeopleService';

const API_KEY = 'AIzaSyB6N9xqAJMsoNw93ROY1sQhrJylwc4kSXk';
const ANTANANARIVO = { lat: -18.8792, lng: 47.5079 };

const CrudVoiturePage = () => {
  const [busData, setBusData] = useState<Bus[]>([]);
  const [chauffeurData, setChauffeurData] = useState<Chauffeur[]>([]);
  const [latitude_depart, setLatitude_depart] = useState(ANTANANARIVO.lat);
  const [longitude_depart, setLongitude_depart] = useState(ANTANANARIVO.lng);
  const [latitude_arrive, setLatitude_arrive] = useState(ANTANANARIVO.lat);
  const [longitude_arrive, setLongitude_arrive] = useState(ANTANANARIVO.lng);
  const [addButton, setAddButton] = useState(false);
  const [immatricule, setImmatricule] = useState('');
  const [nbPlace, setNbPlace] = useState(0);
  const [nomArretArrive, setNomArretArrive] = useState('');
  const [nomArretDepart, setNomArretDepart] = useState('');
  const [chauffeurId,setChauffeurId] = useState('');
  const [chauffeurIdModif,setChauffeurIdModif] = useState('');
  const [loadingCreate, setLoadingCreate] = useState(false);
  
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
  });

  const fectchDataBus = async () =>{
    const data = await getBusData();
    setBusData(data);
  }
  const fetchData = async () => {
    await fectchDataBus();
    const chauff = await getChauffeurData();
    setChauffeurData(chauff);
  };
  
  useEffect(() => {
    fetchData();
  }, []);

  // Fonction de gestion du clic sur la carte
  const handleMapClick_depart = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log(`Clicked location: ${lat}, ${lng}`);
      setLatitude_depart(lat);
      setLongitude_depart(lng);
      
    }
  };
  const handleMapClick_arrive = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log(`Clicked location: ${lat}, ${lng}`);
      setLatitude_arrive(lat);
      setLongitude_arrive(lng); 
    }
  };

  // Fonction de soumission du formulaire
  const createVehicule = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingCreate(true);
    try {
      await axios.post(`${process.env.REACT_APP_API_BFF_ADMIN_URL}/creerVehicule`, {
          voiture:{
            immatricule:immatricule,
            nb_place:nbPlace,
            pointDepart:{
              nomArret:nomArretDepart,
              latitude:latitude_depart,
              longitude:longitude_depart
            },
            pointArrivee:{
              nomArret:nomArretArrive,
              latitude:latitude_arrive,
              longitude:longitude_arrive
            }
          },
          chauffeur:chauffeurId,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setLoadingCreate(true);
      setAddButton(false);
      toast.success('Voiture cree avec succès');
      clearBusCache();
      fectchDataBus();

    } catch (error) {
      console.error('Erreur lors de la creation du voiture : ', error);
      toast.error('Erreur lors de la creation du voiture');
    }
  };
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [showModal, setShowModal] = useState(false);
  const handleEditClick = (bus: Bus) => {
    setSelectedBus(bus);
    setChauffeurId(bus.chauffeur ? bus.chauffeur.id_personnel : '');
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleSubmit = async(event: React.FormEvent) => {
    event.preventDefault();
    if (selectedBus) {
      console.log('ID du Bus :', selectedBus.id_voiture);
      console.log('ID du chauffeur :', chauffeurId);

      await axios.put(`${process.env.REACT_APP_API_BFF_ADMIN_URL}/modifVehicule`, {
        idVoiture: selectedBus.id_voiture,
        idChauffeur:chauffeurIdModif,
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      })
      .then(() => {
        toast.success('Voiture modifiée avec succès');
        clearBusCache();
        fectchDataBus();
        setShowModal(false);
      }).catch(error => {
        toast.error('Erreur lors de la modification');
      });
    }
  };

  return (
    <div className="app">
      <Menu />
      <ToastContainer /> 
      <div className="main-content">
        <div className="container">
          <h1>Liste des véhicules</h1>
          {!addButton ? (
            <button className="add-bus-btn" onClick={() => setAddButton(true)}>
              Ajouter un bus
            </button>
          ) : (
            <></>
          )}
          {addButton && (
            <div>
              <form onSubmit={createVehicule}>
                <input
                  type="text"
                  placeholder="Immatriculation"
                  value={immatricule}
                  onChange={(e) => setImmatricule(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Nombre de places"
                  value={nbPlace}
                  onChange={(e) => setNbPlace(Number(e.target.value))}
                />

                <p><label className='inputTitle'>Choisir un chauffeur</label>
                <select className='custom-select' onChange={(e) => setChauffeurId(e.target.value)} value={chauffeurId}>
                  <option value="">Sélectionnez un chauffeur</option>
                  {chauffeurData.map((chauffeur) => (
                    <option key={chauffeur.id_personnel} value={chauffeur.id_personnel}>
                      {chauffeur.nom_personnel} {chauffeur.prenom}
                    </option>
                  ))}
                </select>
                </p>
                <input
                  type="text"
                  placeholder="Nom d'arrêt"
                  value={nomArretDepart}
                  onChange={(e) => setNomArretDepart(e.target.value)}
                />

                <div>
                  <p className='inputTitle'>Choisissez un emplacement sur la carte pour le point de depart:</p>
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={{ height: '400px', width: '100%' }}
                      center={ANTANANARIVO}
                      zoom={13}
                      onClick={handleMapClick_depart}
                    >
                      <Marker position={{ lat: latitude_depart, lng: longitude_depart }} />
                      {/* <Marker position={{ lat: -18.8792, lng: 47.5079 }} /> */}
                    </GoogleMap>
                  ) : (
                    <p>Chargement de la carte...</p>
                  )}
                </div>
                <label className='inputTitle'>Latitude de depart</label>
                <input
                  type="number"
                  placeholder="Nom d'arrêt"
                  value={latitude_depart}
                  onChange={(e) => setLatitude_depart(Number(e.target.value))}
                />
                <label className='inputTitle'>Longitude de depart</label>
                <input
                  type="number"
                  placeholder="Nom d'arrêt"
                  value={longitude_depart}
                  onChange={(e) => setLongitude_depart(Number(e.target.value))}
                />
                {/* ---------- */}
                <input
                  type="text"
                  placeholder="Nom d'arrêt"
                  value={nomArretArrive}
                  onChange={(e) => setNomArretArrive(e.target.value)}
                />
                <div>
                  <p className='inputTitle'>Choisissez un emplacement sur la carte pour le point de arrive:</p>
                  {isLoaded ? (
                    <GoogleMap
                      mapContainerStyle={{ height: '400px', width: '100%' }}
                      center={ANTANANARIVO}
                      zoom={13}
                      onClick={handleMapClick_arrive}
                    >
                      <Marker position={{ lat: latitude_arrive, lng: longitude_arrive }} />
                      {/* <Marker position={{ lat: -18.8792, lng: 47.5079 }} /> */}
                    </GoogleMap>
                  ) : (
                    <p>Chargement de la carte...</p>
                  )}
                </div>
                <label className='inputTitle'>Latitude de arrive</label>
                <input
                  type="number"
                  placeholder="Nom d'arrêt"
                  value={latitude_arrive}
                  onChange={(e) => setLatitude_arrive(Number(e.target.value))}
                />
                <label className='inputTitle'>Longitude de arrive</label>
                <input
                  type="number"
                  placeholder="Nom d'arrêt"
                  value={longitude_arrive}
                  onChange={(e) => setLongitude_depart(Number(e.target.value))}
                />
                
                <button className="add-bus-btn"  type="submit" disabled={loadingCreate}>
                {loadingCreate ? <div className="spinner"></div> : 'Creer'}
                </button>
                <button className="annuler-bus-btn" onClick={() => setAddButton(false)}>
                Annuler
              </button>
              </form>
              
            </div>
          )}

          <div className="liste-bus-container">
            <table className="bus-table">
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Immatriculation</th>
                  <th>Chauffeur</th>
                  <th>Capacité</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {busData && Array.isArray(busData) && busData.length > 0 ? (
                  busData.map((item, index) => (
                    <tr key={index}>
                      <td>{item.id_voiture}</td>
                      <td>{item.immatricule}</td>
                      <td>{item.chauffeur?.nom_personnel} {item.chauffeur?.prenom}</td>
                      <td className="capacite-column">{item.nb_place}</td>
                      <td>
                      <button className="action-btn edit" onClick={() => handleEditClick(item)}>
                          <FaEdit />
                        </button>
                        <button className="action-btn delete"><FaTrash /></button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5}>Aucun bus disponible</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Modifier le bus</h5>
              <button className="close-button" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group" >
                  <label className="form-label">Chauffeur</label>
                  <select
                    className='custom-select'
                    value={chauffeurIdModif}
                    onChange={(e) => setChauffeurIdModif(e.target.value)}
                  >
                    <option value="">Sélectionnez un chauffeur</option>
                    {chauffeurData.map((chauffeur) => (
                      <option key={chauffeur.id_personnel} value={chauffeur.id_personnel}>
                        {chauffeur.nom_personnel} {chauffeur.prenom}
                      </option>
                    ))}
                  </select>
                </div>
                <button className="add-bus-btn" type="submit">
                  Enregistrer
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default CrudVoiturePage;
