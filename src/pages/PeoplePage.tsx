import { useState, useEffect } from 'react';
import './style/PeoplePage.css';
import Menu from '../components/Menu';
import axios from 'axios';
import { Personnel } from '../dto/Personnel';
import Modal from 'react-modal';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import './style/Spinner.css'; 
import {getProfilData} from '../services/ProfilService';
import { Profil } from '../dto/Profil';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { background } from '@chakra-ui/react';

const PeoplePage = () => {
  const API_KEY = 'AIzaSyB6N9xqAJMsoNw93ROY1sQhrJylwc4kSXk';
const ANTANANARIVO = { lat: -18.8792, lng: 47.5079 };
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [personnelData, setPersonnelData] = useState<Personnel[]>([]);  
  const [selectedPersonnel, setSelectedPersonnel] = useState<Personnel | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [profilData,setProfilData] = useState<Profil[]>([]);
  const [profil,setProfil] = useState<any>(null);
  const [latitude, setLatitude] = useState(ANTANANARIVO.lat);
  const [longitude, setLongitude] = useState(ANTANANARIVO.lng);

  const [nom_personnel, setNom_personnel] = useState(''); // Ajout de la variable nom_personnel
  const [prenom, setPrenom] = useState(''); // Ajout de la variable prenom
  const [numero_personnel, setNumero_personnel] = useState(''); // Ajout de la variable numero_personnel
  const [email, setEmail] = useState(''); // Ajout de la variable email
  const [mdp, setMdp] = useState(''); // Ajout de la variable mdp
  const [confMdp, setConfMdp] = useState('');
  const [loadingInsertion,setLoadingInsertion] = useState(false); 
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: API_KEY,
  });

  async function getPersonnelData() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BFF_ADMIN_URL}/people/listePeople`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPersonnelData(response.data);
    } catch (error) {
      console.error('Erreur lors de l\'appel à l\'API : ', error);
    }
  }
  const fetchData = async () => {
    const data = await getProfilData();
    setProfilData(data);
  };

  useEffect(() => { 
    getPersonnelData();
    fetchData();
  }, []);



  // Fonction pour supprimer un personnel
  const handleDeletePersonnel = async (id: string) => {
    try {
      await axios.delete(`${process.env.REACT_APP_API_BFF_ADMIN_URL}/people/supprimerPersonnel`, {
        params:{
          id_personnel:id
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      setPersonnelData(personnelData.filter((personnel) => personnel.id_personnel !== id));
      toast.success('Personnel supprimé avec succès');
    } catch (error) {
      console.error('Erreur lors de la suppression du personnel : ', error);
      toast.error('Erreur lors de la suppression du personnel');
    }
  };
  const handleUpdateMdpPersonnel = async (id_personnel:string) => {
    if(password == confirmPassword){
      try {
        await axios.post(`${process.env.REACT_APP_API_BFF_ADMIN_URL}/modifMdp`, {
          id_personnel:id_personnel,
          mdp:password,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        toast.success('Mot de passe modifié avec succès');
        setIsModalOpen(false);
      } catch (error) {
        console.error('Erreur lors de la modififaction du mot de passe du personnel : ', error);
        toast.error('Erreur lors de la modififaction du mot de passe du personnel');
      }
    }else{
      toast.error('Les mots de passe ne correspondent pas');
    }
  };
  

  // Ouvrir la modale pour modifier le personnel
  const handleEditPersonnel = (personnel: Personnel) => {
    setSelectedPersonnel(personnel);
    setIsModalOpen(true);
  };

  const handleUpdatePersonnel = async () => {
    if (selectedPersonnel) {
      try {
        console.log(selectedPersonnel)
        await axios.put(`${process.env.REACT_APP_API_BFF_ADMIN_URL}/people/modifierPersonnel`, {
          id_personnel:selectedPersonnel.id_personnel,
          numero_personnel:selectedPersonnel.numero_personnel,
          adresse:selectedPersonnel.adresse,
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        const updatedPersonnelList = personnelData.map((personnel) =>
          personnel.id_personnel === selectedPersonnel.id_personnel ? selectedPersonnel : personnel
        );
        setPersonnelData(updatedPersonnelList);
        toast.success('Personnel mis à jour avec succès');
        setIsModalOpen(false);
      } catch (error) {
        console.error('Erreur lors de la mise à jour du personnel : ', error);
        toast.error('Erreur lors de la mise à jour du personnel');
      }
    }
  };

  // Fonction pour ajouter tous les personnels (conservée)
  const handleAddAllPerson = async () => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_BFF_ADMIN_URL}/people/inscription`);
      setError("");
      toast.success('Tous les personnels ont été ajoutés avec succès !');
    } catch (error) {
      setError("Une erreur inattendue s'est produite");
      toast.error("Erreur lors de l'ajout de tous les personnels");
    } finally {
      setIsLoading(false);
    }
  };
  const handleCloseModal = () => {
    setShowModal(false);
  };
  const handleMapClick_arrive = (event: google.maps.MapMouseEvent) => {
    if (event.latLng) {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      console.log(`Clicked location: ${lat}, ${lng}`);
      setLatitude(lat);
      setLongitude(lng); 
    }
  };

  
  const creactionPersonnel = async(event: React.FormEvent) => {
    event.preventDefault();
    setLoadingInsertion(true);
    if(mdp != confMdp){
      setLoadingInsertion(false);
      toast.error('Erreur lors de la confirmation du mot de passe');
    }else{
      try {
        await axios.post(`${process.env.REACT_APP_API_BFF_ADMIN_URL}/people/creationPersonnel`,{
          nom_personnel:nom_personnel,
          prenom:prenom,
          numero_personnel:numero_personnel,
          profil:profil,
          email:email,
          mdp:mdp,
          adresse:{
            latitude:latitude,
            longitude:longitude
          },
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          }
        });
        getPersonnelData();
        handleAddAllPerson();
        toast.success('Personnels  ajoutés avec succès !');
        setShowModal(false);
      } catch (error) {
        toast.error("Erreur lors de l'ajout du personnel");
      } finally {
        setLoadingInsertion(false);
      }
    }

  };


  return (
    <div className="app">
      <Menu />
      <ToastContainer /> {/* Container pour afficher les notifications */}
      <div className="main-content">
        <div className="container">
          <h1>Liste des personnes</h1>
          <button className="add-bus-btn" onClick={handleAddAllPerson} disabled={isLoading}>
            {isLoading ? <div className="spinner"></div> : 'Ajouter dans Keycloak'}
          </button>
          {error && <p className="error-message" style={{color:'orangered',textAlign:'center'}}>{error}</p>}
          
          <div className="liste-bus-container">
            <div className='inscriptionContainer'>
              <p className='inscriptionTitle'>Inscrire un nouveau personnel  </p>
              <button className="add-people" onClick={()=>{setShowModal(true)}}>
              <AddIcon />
          </button>
            </div>
            <table className="bus-table">
              <thead>
                <tr>
                  <th>Matricule</th>
                  <th>Nom</th>
                  <th>Prénom</th>
                  <th>Status</th>
                  <th>Numéro Pers</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {personnelData && Array.isArray(personnelData) && personnelData.length > 0 ? (
                  personnelData.map((item) => (
                    <tr key={item.id_personnel}>
                      <td>{item.id_personnel}</td>
                      <td>{item.nom_personnel}</td>
                      <td>{item.prenom}</td>
                      <td>{item.profil.nom_profil}</td>
                      <td style={{textAlign:'right'}}>{item.numero_personnel}</td>
                      <td>
                        <button className="edit-btn" onClick={() => handleEditPersonnel(item)}>
                          <EditIcon />
                        </button>
                        <button className="delete-btn" onClick={() => handleDeletePersonnel(item.id_personnel)}>
                          <DeleteIcon />
                        </button>
                      </td>
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

      {/*   Modale pour la mise à jour du personnel   */}
    
      <Modal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} contentLabel="Modifier Personnel">
  <div className="containerModif">
    <div className='mdpMap'>
      <p className='inputTitle'>Choisissez un emplacement sur la carte pour le point de arrive:</p>
      {isLoaded && selectedPersonnel ? (
        <GoogleMap
          mapContainerStyle={{ height: '500px', width: '100%' }}
          center={ANTANANARIVO}
          zoom={13}
          onClick={(event: google.maps.MapMouseEvent) => {
            if (event.latLng) {
              const lat = event.latLng.lat();
              const lng = event.latLng.lng();
              console.log(`Clicked location: ${lat}, ${lng}`);
              // Met à jour les coordonnées en un seul appel
              if(selectedPersonnel){  
                setSelectedPersonnel({
                  ...selectedPersonnel,
                  adresse: {
                    ...selectedPersonnel.adresse,
                    latitude: lat,
                    longitude: lng
                  }
                });
              } 
            }
          }}
        >
          <Marker position={{ lat: selectedPersonnel.adresse.latitude, lng: selectedPersonnel.adresse.longitude }} />
        </GoogleMap>
      ) : (
        <p>Chargement de la carte...</p>
      )}
    </div>
    <div className='mdpFrgt'>
      <h2 className='modal_title'>Modification {selectedPersonnel?.id_personnel}</h2>
      {selectedPersonnel && (
        <>
          <label>Adresse : </label>
          <input
            type="text"
            value={selectedPersonnel.adresse.latitude}
            onChange={(e) => setSelectedPersonnel({
              ...selectedPersonnel,
              adresse: {
                ...selectedPersonnel.adresse,
                latitude: parseFloat(e.target.value)
              }
            })}
          />
          <input
            type="text"
            value={selectedPersonnel.adresse.longitude}
            onChange={(e) => setSelectedPersonnel({
              ...selectedPersonnel,
              adresse: {
                ...selectedPersonnel.adresse,
                longitude: parseFloat(e.target.value)
              }
            })}
          />
          <label>Numéro de telephone : </label>
          <input
            type="text"
            value={selectedPersonnel.numero_personnel}
            onChange={(e) => setSelectedPersonnel({
              ...selectedPersonnel,
              numero_personnel: e.target.value
            })}
          />
          <br></br>
          <label>Mot de passe, oublié ?</label>
          <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} />
          <p>Confirmez votre mot de passe</p>
          <input type="password" placeholder="Confirmez votre mot de passe" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
          <button disabled={!password || !confirmPassword} onClick={() => handleUpdateMdpPersonnel(selectedPersonnel.id_personnel)} className={(!password || !confirmPassword)?'update-btn-disable':'update-btn'} >Mettre à jour</button>
          <br></br>
          <button onClick={handleUpdatePersonnel} className='update-btn'>Mettre à jour</button>
          <button onClick={() => setIsModalOpen(false)} className='cancel-btn'>Annuler</button>
        </>
      )}
    </div>
  </div>
</Modal>


      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Ajouter un personnel</h5>
              <button className="close-button" onClick={handleCloseModal}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={creactionPersonnel}>
                <div className="form-group" >
                  <label className="form-label">Profil</label>
                  <select
                    className='custom-select'
                    value={profil ? profil.nom_profil : ''} // Changement ici
                    onChange={(e) => {
                      const selectedProfil = profilData.find(p => p.nom_profil === e.target.value); // Changement ici
                      setProfil(selectedProfil); // Changement ici
                    }}
                  >
                    <option value="">Sélectionnez un Profil</option>
                    {profilData.map((profil) => (
                      <option key={profil.nom_profil} value={profil.nom_profil}>
                        {profil.nom_profil}
                      </option>
                    ))}
                  </select>
                  <input
                    type="text"
                    placeholder="Nom"
                    value={nom_personnel}
                    onChange={(e) => setNom_personnel(e.target.value)}
                  />
                  <input
                    type="text"
                    placeholder="Prenom"
                    value={prenom}
                    onChange={(e) => setPrenom(e.target.value)}
                  />
                  <input
                    type="number"
                    placeholder="Tel"
                    value={numero_personnel}
                    onChange={(e) => setNumero_personnel(e.target.value)}
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
                        <Marker position={{ lat: latitude, lng: longitude }} />
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
                    value={latitude}
                    onChange={(e) => setLatitude(Number(e.target.value))}
                  />
                  <label className='inputTitle'>Longitude de arrive</label>
                  <input
                    type="number"
                    placeholder="Nom d'arrêt"
                    value={longitude}
                    onChange={(e) => setLongitude(Number(e.target.value))}
                  />
                  
                  <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Mot de passe"
                    value={mdp}
                    onChange={(e) => setMdp(e.target.value)}
                  />
                  <input
                    type="password"
                    placeholder="Confirmation du mot de passe"
                    value={confMdp}
                    onChange={(e) => setConfMdp(e.target.value)}
                  />
                </div>
                <button className="add-bus-btn" type="submit" disabled={loadingInsertion}>
                  {loadingInsertion ? <div className="spinner"></div> : 'Enregistrer'}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      </div>
    
  );
};

export default PeoplePage;
