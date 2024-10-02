import { Arret } from "./Arret";

export  interface Personnel {
    id_personnel: string;   
    nom_personnel: string;
    prenom:string;
    numero_personnel : string;
    email: string;
    mdp: string;
    adresse:Arret ; 
}
