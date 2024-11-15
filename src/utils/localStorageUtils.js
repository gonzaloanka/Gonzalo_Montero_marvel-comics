// Obtiene la lista de cómics favoritos almacenada en LocalStorage
export const getFavorites = () => {
    return JSON.parse(localStorage.getItem('favorites')) || []; // Retorna un array vacío si no hay favoritos
};

// Añade un cómic a la lista de favoritos en LocalStorage si no está ya en ella
export const saveToFavorites = (comic) => {
    const favorites = getFavorites();
    if (!favorites.find(fav => fav.id === comic.id)) { // Verifica si el cómic ya está en favoritos
        favorites.push(comic);
        localStorage.setItem('favorites', JSON.stringify(favorites)); // Guarda los favoritos actualizados
    }
};

// Elimina un cómic de la lista de favoritos en LocalStorage usando su ID
export const removeFromFavorites = (comicId) => {
    const favorites = getFavorites().filter(fav => fav.id !== comicId); // Filtra el cómic que se quiere eliminar
    localStorage.setItem('favorites', JSON.stringify(favorites)); // Guarda la lista actualizada
};
