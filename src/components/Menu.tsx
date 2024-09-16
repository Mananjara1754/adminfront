import React, { useState } from 'react';
import { Fab, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import MapIcon from '@mui/icons-material/Map';
import './style/Menu.css';
import { Link } from 'react-router-dom';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';

function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { icon: <HomeIcon />, label: 'Accueil' ,url:'/accueil'},
    { icon: <BarChartIcon />, label: 'Statistique' ,url:'/statistique'},
    { icon: <DirectionsBusIcon />, label: 'Feuille de routes',url:'/crudVoiture' },
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
              }}
            >
             {item.url ? (
              <Link to={item.url}>{item.icon}</Link>
            ) : (
              item.icon
            )}
            </IconButton>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;