import React from 'react';
import { modernShip, luxuryInterior } from './assets/images/index';

// Ce fichier est juste pour tester les imports d'image
// Vous pouvez le supprimer après

const ImageTest = () => {
  return (
    <div>
      <h2>Test des images</h2>
      <div>
        <h3>Image du navire moderne:</h3>
        <img src={modernShip} alt="Test navire moderne" style={{maxWidth: '300px'}} />
      </div>
      <div>
        <h3>Image de l'intérieur luxueux:</h3>
        <img src={luxuryInterior} alt="Test intérieur luxueux" style={{maxWidth: '300px'}} />
      </div>
    </div>
  );
};

export default ImageTest;
