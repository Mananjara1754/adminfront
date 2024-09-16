import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style/LoginPage.css';
import Logo from '../assets/image/Logo.svg';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e:any) => {
    e.preventDefault();
    if (email === 'Admin' && password === 'Admin') {
      navigate('/accueil'); // Assurez-vous que cette route existe
    } else {
      setError('Email ou mot de passe incorrect');
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="logo">
          <img src={Logo} alt="Logo" width={100} height={100} />
        </div>
        <h1>Connexion Admin</h1>
        <p className='login-text'>Consulter tous les feuilles de route, gerer les transports et voir le tableau de bord.</p>
        
   
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
          <button onClick={handleSubmit} className="submit-button">Commencer</button>
          
          {error && <p className="error-message" style={{color:'orangered',textAlign:'center'}}>{error}</p>}
          
  
        
        
      </div>
    </div>
  );
}

export default LoginPage;