import './style/AccueilPage.css';
import Menu from '../components/Menu';
import { useNavigate } from 'react-router-dom';
import BusCard from '../components/BusCard';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Bus } from '../dto/Bus';
import { toast, ToastContainer } from 'react-toastify';
import { getBusData } from '../services/BusService';
import 'react-toastify/dist/ReactToastify.css'
import { getTomorrowDate } from '../services/DateService';
import { FaSearch } from 'react-icons/fa';

const AccueilPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const [busData, setBusData] = useState<Bus[]>([]);  
  const [selectedDate, setSelectedDate] = useState<string>(getTomorrowDate());
  const [searchTerm, setSearchTerm] = useState<string>('');

  // const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   setSelectedDate(event.target.value);
  // };

  const fetchData = async () => {
    const data = await getBusData();
    setBusData(data);
  };
    useEffect(() => { 
      fetchData();
    },[]);
    
    const handleClick = (id_voiture:String) => {
      navigate(`/feuilleRoute/${id_voiture}`);
    };

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault(); // Empêche le rechargement de la page
  //   setIsLoading(true);
  //   try {
  //     // Modification de l'URL pour inclure le paramètre dateCourse
  //     const response = await axios.get(`http://localhost:8087/reservationPeriodique`, {
  //       params: {
  //         dateCourse: selectedDate // Utilisation de selectedDate comme valeur du paramètre
  //       },
  //       headers: {
  //         Authorization: `Bearer ${localStorage.getItem('token')}`,
  //       }
  //     });
  //     setIsLoading(false);
  //     toast.success('Réservation réussie'); // Correction de l'orthographe
  //   } catch (error) {
  //     setIsLoading(false);
  //     console.error('Erreur lors de la réservation : ', error);
  //     toast.error('Erreur lors de la réservation');
  //   }
  // };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredBusData = busData.filter(bus => 
    bus.chauffeur.nom_personnel.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.chauffeur.prenom.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.immatricule.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bus.id_voiture.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Menu />
      <ToastContainer /> 
      <div className="main-content">
        <div className="container">
            <h1>Liste des Bus</h1>
            
            <div className="search-container">
              <div className='searchLabel'>
                <FaSearch className="search-icon" size={20} color='#23A6CF' />
                <label htmlFor="dateInput" className='labelSearch'>Recherche :</label>
              </div>
            
              <input
                type="text"
                placeholder="Rechercher un bus..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
              />
              
            </div>

            {/* <form onSubmit={handleSubmit} className='form'>
              <label htmlFor="dateInput" className='labelDate'>Reservation auto :</label>
              <input
                type="date"
                id="dateInput"
                value={selectedDate}
                onChange={handleDateChange}
              />
              <button type="submit" className='buttonSubmit' disabled={isLoading}>
              {isLoading ? <div className="spinner"></div> : 'Valider'}
              </button>
            </form> */}
            <div className="bus-list">
                  {filteredBusData && Array.isArray(filteredBusData) && filteredBusData.length > 0 ? (
                  filteredBusData.map((item) => (
                    <BusCard
                      id_bus={item.id_voiture}
                      nom_chauffeur={item.chauffeur.nom_personnel}
                      prenom_chauffeur={item.chauffeur.prenom}
                      numero_matricule={item.immatricule}
                      nb_place={item.nb_place}
                      action={()=>{handleClick(item.id_voiture)}}
                    />
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
