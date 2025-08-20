// Logo importé depuis un fichier PNG
import React from 'react';
import mmcLogo from './mmc-logo-dark.png';

const MMCLogo = ({ className = "", size = 60 }) => {
  return (
    <img 
      src={mmcLogo} 
      alt="MMC Maritime"
      className={`${className} object-contain`}
      style={{ height: size + 'px', width: 'auto' }}
    />
  );
};

export default MMCLogo;
