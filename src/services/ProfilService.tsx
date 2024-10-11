// services/chauffeur.tsx
import axios from 'axios';

// Fonction pour obtenir les données des chauffeurs
export async function getProfilData() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_BFF_ADMIN_URL}/people/listeProfil`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
    if (response.data && Array.isArray(response.data.data)) {
      return response.data.data;
    } else {
      console.error('Les données reçues ne sont pas sous forme de tableau.');
      return [];
    }
  } catch (error) {
    console.error('Erreur lors de l\'appel à l\'API : ', error);
    return [];
  }
}
