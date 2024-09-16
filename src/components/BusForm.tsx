import { useState } from "react";
import { Bus } from "../dto/Bus";
import "./style/Button.css";
interface BusFormProps {
    bus: Bus | null;
    onClose: () => void;
    onSubmit: (bus: Bus) => void;
  }
  
  const BusForm: React.FC<BusFormProps> = ({ bus, onClose, onSubmit }) => {
    const [formData, setFormData] = useState<Bus>(
      bus || { id: 0, nom: '', chauffeur: '', capacite: 0, annee: 0 }
    );
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };
  
    return (
      <div className="popup-overlay">
        <div className="popup-content">
          <h2>{bus ? 'Modifier le bus' : 'Ajouter un bus'}</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="nom"
              value={formData.nom}
              onChange={handleChange}
              placeholder="Nom du bus"
              required
            />
            <input
              type="text"
              name="chauffeur"
              value={formData.chauffeur}
              onChange={handleChange}
              placeholder="Nom du chauffeur"
              required
            />
            <input
              type="number"
              name="capacite"
              value={formData.capacite}
              onChange={handleChange}
              placeholder="Capacité"
              required
            />
            <input
              type="number"
              name="annee"
              value={formData.annee}
              onChange={handleChange}
              placeholder="Année"
              required
            />
            <button type="submit" className="ajouter">{bus ? 'Modifier' : 'Ajouter'}</button>
            <button type="button" className="annuler" onClick={onClose}>Annuler</button>
          </form>
        </div>
      </div>
    );
  };
  export default BusForm;