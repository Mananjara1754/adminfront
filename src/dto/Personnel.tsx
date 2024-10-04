import { Arret } from "./Arret";
import { Profil } from "./Profil";

export  interface Personnel {
    id_personnel: string;   
    nom_personnel: string;
    prenom:string;
    numero_personnel : string;
    email: string;
    mdp: string;
    adresse:Arret ; 
    profil:Profil;
}
