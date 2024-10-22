import axios from "axios";

export async function getTrajet(id_bus: string,M_S:number) {
    try {
        console.log(id_bus)
      const response = await axios.get(`${process.env.REACT_APP_API_BFF_ADMIN_URL}/trajet/busTrajet`,{
        params: {
          id_bus: id_bus,
          M_S: M_S
        },
        headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` // Afficher le token dans les en-têtes à partir de localStorage
      }});
      console.log("Réponse API : ", response.data); 
      if (response.data) {
        return response.data.data;
      } else {
        console.error("Erreur lors de la recuperation du trajet.");
        return [];
      }
    } catch (error) {
      console.error("Erreur lors de l'appel à l'API : ", error);
      return [];
    }
  }