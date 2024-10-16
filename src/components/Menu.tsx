import React, { useState } from 'react';
import { Fab, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import LogoutIcon from '@mui/icons-material/Logout';
import PeopleIcon from '@mui/icons-material/People';
import './style/Menu.css';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { clearBusCache } from '../services/BusService';
import { clearChauffeurCache} from '../services/PeopleService';
import { clear } from 'console';

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const deconnexion = () => {
    localStorage.removeItem('token');
    clearBusCache();
    clearChauffeurCache();
    navigate('/');
  };

  const menuItems = [
    { icon: <HomeIcon />, label: 'Accueil' ,url:'/accueil'},
    { icon: <PeopleIcon />, label: 'Personnel' ,url:'/people'},
    { icon: <BarChartIcon />, label: 'Statistique' ,url:'/statistique'},
    { icon: <DirectionsBusIcon />, label: 'Feuille de routes',url:'/crudVoiture' },
    { icon: <LogoutIcon />, label: 'Deconnexion',url:'/deconnexion' }

  ];

  return (
    <div className="circular-menu">
      <Fab color="primary" className="main-button" onClick={toggleMenu}>
        <AddIcon />
      </Fab>
      {isOpen && (
        <div className="menu-items">
          {menuItems.map((item, index) => (
            <IconButton
              key={index}
              className={`menu-item item-${index}`}
              style={{
                transform: `rotate(${180 + index * 90 / (menuItems.length - 1)}deg) translate(100px) rotate(${180 - index * 90 / (menuItems.length - 1)}deg)`
              ,backgroundColor:'#e6f3ff',borderRadius:'100%'}}
            >
             {item.url ? (
                item.url === '/deconnexion' ? (
                  <p onClick={deconnexion} className='lien-menu'>{item.icon}</p>
                ) : (<Link to={item.url} className='lien-menu'>{item.icon}</Link>)
            ) : (
              <Link to={item.url} className='lien-menu'>{item.icon}</Link>
            )}
            </IconButton>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;