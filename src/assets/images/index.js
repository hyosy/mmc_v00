// Images de la mer Méditerranée pour notre site maritime
import heroImg from './belle-plage-tropicale-avec-rochers.jpg';
export const heroImage = heroImg;
export const algerImage = 'https://images.unsplash.com/photo-1562874724-aeebe5d43e31?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80';
export const marseilleImage = 'https://images.unsplash.com/photo-1562883676-8c7feb83f09b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1169&q=80';
export const alicanteImage = 'https://images.unsplash.com/photo-1565353919366-544caecc58d2?ixlib=rb-4.0.3&auto=format&fit=crop&w=1074&q=80';

// Images de bateaux pour la page À propos et les descriptions
export const shipExterior = 'https://images.unsplash.com/photo-1566840619972-44013889a3d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80';
export const shipInterior = 'https://images.unsplash.com/photo-1566840580447-306ff5832a2e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80';
export const shipDeck = 'https://images.unsplash.com/photo-1566840533082-8c46188ee4c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80';
export const shipRestaurant = 'https://images.unsplash.com/photo-1520031441872-265e4ff70366?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80';

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
