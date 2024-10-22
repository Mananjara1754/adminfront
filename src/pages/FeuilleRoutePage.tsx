import { useParams } from "react-router-dom";
import Menu from "../components/Menu";
import "./style/FeuilleRoutePage.css"
import { RiSunFill } from "react-icons/ri";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getTomorrowDate } from "../services/DateService";
import { Trajet } from "../dto/Trajet";
import { getTrajet } from "../services/TrajetService";
import { FaMoon } from "react-icons/fa";
import BusStopView from "../components/BusStopView";

const FeuilleRoutePage = ()=>{
  const { id_voiture } = useParams<{ id_voiture: string }>();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedDate, setSelectedDate] = useState<string>(getTomorrowDate());
  const [trajetMatin, setTrajetMatin] = useState<Trajet>();
  const [trajetSoir, setTrajetSoir] = useState<Trajet>();
  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };
  const stops2 = trajetMatin?.courses;

  const stops1 = trajetMatin?.courses;

  const destName1 = "Départ";
  const destName2 = "Etech";
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    // event.preventDefault(); // Empêche le rechargement de la page
    // setIsLoading(true);
    // try {
    //   const response = await axios.get(`http://localhost:8087/reservationPeriodique`, {
    //     params: {
    //       dateCourse: selectedDate // Utilisation de selectedDate comme valeur du paramètre
    //     },
    //     headers: {
    //       Authorization: `Bearer ${localStorage.getItem('token')}`,
    //     }
    //   });
    //   setIsLoading(false);
    //   toast.success('Réservation réussie'); // Correction de l'orthographe
    // } catch (error) {
    //   setIsLoading(false);
    //   console.error('Erreur lors de la réservation : ', error);
    //   toast.error('Erreur lors de la réservation');
    // }
  };
  useEffect(() => {
    const fetchData = async () => {
      if(id_voiture){
        const matin = await getTrajet(id_voiture,0);
        const soir = await getTrajet(id_voiture,1);
        setTrajetMatin(matin);
        setTrajetSoir(soir);
      }
    }
    fetchData();
    console.log(trajetMatin);
  },  []);

    return(
        <div className="app">
        <Menu />
        <div className="main-content">
          <div className="container">
            <h1>Feuille de Route du voiture {id_voiture}</h1>
            <form onSubmit={handleSubmit} className='form'> {/* Ajout du gestionnaire de soumission */}
              <label htmlFor="dateInput" className='labelDate'>Date </label>
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
            <div className="liste-bus-container">
                <div className="liste">
                  <div className="indicationContainer">
                    <h3 className="indication">Matin</h3> <RiSunFill className="icone-sun" />
                  </div>
                  <table className="bus-table">
                    <thead>
                      <tr>
                        <th>Nom du arret</th>
                        <th>Num Matricule</th>
                        <th>Nom & Prenom</th>
                        <th>Numero</th>
                      </tr>
                    </thead>
                    <tbody>
                      {trajetMatin?.courses && trajetMatin.courses.length > 0 ? ( // Vérification de l'existence et de la longueur
                        trajetMatin.courses.map((course, indexCourse) => (
                          course.people.length > 0 ? (
                            course.people.map((person, indexPerson) => (
                              <tr key={`person-${indexPerson}`}>
                                {indexPerson === 0 && (
                                  <td rowSpan={course.people.length}>
                                    {course.place_name}
                                  </td>
                                )}
                                <td>{person.id_personnel}</td>
                                <td>{person.nom_personnel}</td>
                                <td>{person.numero}</td>
                              </tr>
                            ))
                          ) : (
                            <tr key={`course-${indexCourse}`}>
                              <td>{course.place_name}</td>
                              <td colSpan={3}>Aucun personnel</td>
                            </tr>
                          )
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4}>Aucun trajet disponible</td> {/* Message si aucun trajet n'est disponible */}
                        </tr>
                      )}
                    </tbody>
                  </table>
                    <div className="indicationContainer">
                      <h3 className="indication">Soir</h3> <FaMoon className="icone-moon" />
                    </div>
                    <table className="bus-table">
                    <thead>
                      <tr>
                        <th>Nom du arret</th>
                        <th>Num Matricule</th>
                        <th>Nom & Prenom</th>
                        <th>Numero</th>
                      </tr>
                    </thead>
                    <tbody>
                      { trajetSoir  && trajetSoir?.courses && trajetSoir.courses.length > 0 ? ( // Vérification de l'existence et de la longueur
                        trajetSoir.courses.map((course, indexCourse) => (
                          course.people.length > 0 ? (
                            course.people.map((person, indexPerson) => (
                              <tr key={`person-${indexPerson}`}>
                                {indexPerson === 0 && (
                                  <td rowSpan={course.people.length}>
                                    {course.place_name}
                                  </td>
                                )}
                                <td>{person.id_personnel}</td>
                                <td>{person.nom_personnel}</td>
                                <td>{person.numero}</td>
                              </tr>
                            ))
                          ) : (
                            <tr key={`course-${indexCourse}`}>
                              <td>{course.place_name}</td>
                              <td colSpan={3}>Aucun personnel</td>
                            </tr>
                          )
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4}>Aucun trajet disponible</td> {/* Message si aucun trajet n'est disponible */}
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>

                <div className="buStop">
                  <h1>Bus Stops View</h1>
                    <BusStopView   
                      stops1={stops1 || []} // Ajout d'une valeur par défaut pour éviter l'erreur
                      stops2={stops2 || []} // Ajout d'une valeur par défaut pour éviter l'erreur
                      destName1={destName1} 
                      destName2={destName2} 
                    />
                </div>
              </div>
          </div>
        </div>
      </div>
    );
}
export default FeuilleRoutePage;  
