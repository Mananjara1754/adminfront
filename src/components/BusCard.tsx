import React from 'react';
import { FaBusAlt } from "react-icons/fa";
import './style/BusCard.css';


const BusCard=  ({id_bus,nom_chauffeur,prenom_chauffeur,numero_matricule,nb_place,action=()=>{}}:any) => {    
    return (
        <div className="bus-card" onClick={action}>
            <div className='bus-icon'>
                <FaBusAlt style={{fontSize:'30px',color:'#23A6CF'}}/>
                <p className='id_bus'>{id_bus}</p>
            </div>
            
            <p className='name'>Nom & Prenom : {nom_chauffeur} {prenom_chauffeur}</p>
            <div className='N-mat'>
                <p>N ° Mat : {numero_matricule}</p>
                <p>Nb de place : {nb_place}</p>
            </div>
        </div>
    )
}   

export default BusCard;