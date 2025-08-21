// Images de la mer Méditerranée pour notre site maritime
import heroImg from './belle-plage-tropicale-avec-rochers.jpg';
import algerImg from './alger.jpg';
import alicanteImg from './alicante.jpg';
import reservation1Img from './reservation1.jpg';
export const heroImage = heroImg;
export const reservation1 = reservation1Img;
export const algerImage = algerImg;
export const marseilleImage = 'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80';
export const alicanteImage = alicanteImg;

// Images de bateaux pour la page À propos et les descriptions
export const shipExterior = 'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'; // Grand ferry moderne
export const shipInterior = 'https://images.unsplash.com/photo-1578530332818-6ba472e67b9f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'; // Salon luxueux de bateau
export const shipDeck = 'https://images.unsplash.com/photo-1566840533082-8c46188ee4c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80';
export const shipRestaurant = 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80';
export const shipCabin = 'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80';

// Nouvelles images de navires pour l'expérience à bord
export const modernShip = 'https://images.unsplash.com/photo-1589743048249-a0d656ec1737?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80'; // Ferry moderne en mer
export const luxuryInterior = 'https://images.unsplash.com/photo-1566840632859-0b078c57892d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80'; // Intérieur élégant

// Arrière-plans supplémentaires
export const wavesPattern = 'https://images.unsplash.com/photo-1577315734214-4b3dec92d9ad?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80';
export const seaBackground = 'https://images.unsplash.com/photo-1566438480900-0609be27a4be?ixlib=rb-4.0.3&auto=format&fit=crop&w=1294&q=80';
export const oceanAerial = 'https://images.unsplash.com/photo-1589254065909-b7086229d08c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80';

// Image de secours en cas d'erreur de chargement
export const fallbackImage = 'https://images.unsplash.com/photo-1544551763-92ab472cad5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80';

/**
 * Utilitaire pour gérer les erreurs de chargement d'images
 * @param {Event} event - L'événement d'erreur
 */
export const handleImageError = (event) => {
  console.warn("Erreur de chargement d'image:", event.target.src);
  event.target.src = fallbackImage;
  event.target.alt = "Image non disponible";
};
