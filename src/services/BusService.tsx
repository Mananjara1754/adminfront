import axios from "axios";
const CACHE_KEY = 'busDataCache';
export async function getBusData() {
    try {
      const cachedData = localStorage.getItem(CACHE_KEY);
      if (cachedData) {
        console.log('Données récupérées depuis le cache.');
        return JSON.parse(cachedData);
      }
      const response = await axios.get(`${process.env.REACT_APP_API_BFF_ADMIN_URL}/listeVehicule`,{
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Afficher le token dans les en-têtes à partir de localStorage
      }});
      console.log("Réponse API : ", response.data); 
      if (response.data && Array.isArray(response.data.data)) {
        localStorage.setItem(CACHE_KEY, JSON.stringify(response.data.data));
        return response.data.data;
      } else {
        console.error("Les données reçues ne sont pas sous forme de tableau.");
        return [];
      }
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API : ", error);
      return [];
    }
  }
  export function clearBusCache() {
    localStorage.removeItem(CACHE_KEY);
  }