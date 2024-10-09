import './style/AccueilPage.css';
import Menu from '../components/Menu';
import { useNavigate } from 'react-router-dom';
import BusCard from '../components/BusCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Bus } from '../dto/Bus';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
const AccueilPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [busData, setBusData] = useState<Bus[]>([]);  
  const [selectedDate, setSelectedDate] = useState<string>(getTomorrowDate());

  function getTomorrowDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0]; // Format YYYY-MM-DD
  }

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  async function getBusData() {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_BFF_ADMIN_URL}/listeVehicule`,{
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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Empêche le rechargement de la page
    setIsLoading(true);
    try {
      // Modification de l'URL pour inclure le paramètre dateCourse
      const response = await axios.get(`http://localhost:8087/reservationPeriodique`, {
        params: {
          dateCourse: selectedDate // Utilisation de selectedDate comme valeur du paramètre
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        }
      });
      setIsLoading(false);
      toast.success('Réservation réussie'); // Correction de l'orthographe
    } catch (error) {
      setIsLoading(false);
      console.error('Erreur lors de la réservation : ', error);
      toast.error('Erreur lors de la réservation');
    }
  };

  return (
    <div className="app">
      <Menu />
      <ToastContainer /> 
      <div className="main-content">
        <div className="container">
            <h1>Liste des Bus</h1>
            
            <form onSubmit={handleSubmit} className='form'> {/* Ajout du gestionnaire de soumission */}
              <label htmlFor="dateInput" className='labelDate'>Reservation auto :</label>
              <input
                type="date"
                id="dateInput"
                value={selectedDate}
                onChange={handleDateChange}
              />
              <button type="submit" className='buttonSubmit' disabled={isLoading}>
              {isLoading ? <div className="spinner"></div> : 'Valider'}
              </button> {/* Bouton de soumission */}
            </form>
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
