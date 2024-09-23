import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/LoginPage.css';
import Logo from '../assets/image/Logo.svg';
import axios from 'axios'; // Import axios for API calls
import './style/Spinner.css'; // Assurez-vous de créer ce fichier CSS

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsLoading(true);
    
    try {
      console.log(`${process.env.REACT_APP_API_BFF_ADMIN_URL}`);
      const response = await axios.post(`${process.env.REACT_APP_API_BFF_ADMIN_URL}/login`, {
        username:email,
        password:password
      });

      if (response.data) {
        localStorage.setItem('token', response.data);
        // Rediriger l'utilisateur ou mettre à jour l'état de l'application
        navigate('/accueil');
      } else {
        setError("Réponse invalide du serveur");
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(error.response.data.message || "Une erreur s'est produite lors de la connexion");
      } else {
        setError("Une erreur inattendue s'est produite");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <img src={Logo} alt="Logo" width={100} height={100} />
        </div>
        <h1>Connexion Admin</h1>
        <p className='login-text'>Consulter tous les feuilles de route, gerer les transports et voir le tableau de bord.</p>
        
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="submit-button" disabled={isLoading}>
            {isLoading ? <div className="spinner"></div> : 'Connexion'}
          </button>
        </form>
        
        {error && <p className="error-message" style={{color:'orangered',textAlign:'center'}}>{error}</p>}
      </div>
    </div>
  );
}

export default LoginPage;