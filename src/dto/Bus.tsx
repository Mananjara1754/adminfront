import { Chauffeur } from "./Chauffeur";

export interface Bus {
    id_voiture: string;
    nb_place: number;
    immatricule: string;    
    chauffeur: Chauffeur;
}