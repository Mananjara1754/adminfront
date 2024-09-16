import React, { useState } from 'react';
import { Fab, IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import HomeIcon from '@mui/icons-material/Home';
import BarChartIcon from '@mui/icons-material/BarChart';
import MapIcon from '@mui/icons-material/Map';
import './style/Menu.css';

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const menuItems = [
    { icon: <HomeIcon />, label: 'Accueil' },
    { icon: <BarChartIcon />, label: 'Statistique' },
    { icon: <MapIcon />, label: 'Feuille de routes' },
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
              {item.icon}
            </IconButton>
          ))}
        </div>
      )}
    </div>
  );
}

export default Menu;