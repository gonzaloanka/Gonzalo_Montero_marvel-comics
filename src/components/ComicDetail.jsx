import React, { useEffect, useState } from 'react';
import { fetchComicDetail } from '../marvelApi';
import { saveToFavorites, removeFromFavorites, getFavorites } from '../utils/localStorageUtils';
import { useParams } from 'react-router-dom';

const ComicDetail = () => {
    const { comicId } = useParams(); // Obtiene el ID del cómic desde la URL
    const [comic, setComic] = useState(null); // Estado para almacenar el cómic detallado
    const [isFavorite, setIsFavorite] = useState(false); // Estado para indicar si está en favoritos

    // Carga los detalles del cómic al montar el componente o cuando cambia comicId
    useEffect(() => {
        const loadComicDetail = async () => {
            const data = await fetchComicDetail(comicId); // Llama a la API para obtener detalles
            setComic(data); // Actualiza el estado con los detalles del cómic
            setIsFavorite(getFavorites().some(fav => fav.id === parseInt(comicId))); // Verifica si es favorito
        };
        loadComicDetail();
    }, [comicId]);

    // Maneja el clic para añadir o eliminar el cómic de favoritos
    const handleFavoriteToggle = () => {
        if (isFavorite) {
            removeFromFavorites(comic.id); // Elimina de favoritos
        } else {
            saveToFavorites(comic); // Añade a favoritos
        }
        setIsFavorite(!isFavorite); // Cambia el estado de favorito
    };

    if (!comic) return <p>Cargando...</p>; // Muestra un mensaje mientras carga el cómic

    return (
        <div>
            <h2>{comic.title}</h2>
            <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
            <button onClick={handleFavoriteToggle}>
                {isFavorite ? 'Eliminar de Favoritos' : 'Añadir a Favoritos'}
            </button>
            <p>{comic.description || "No hay descripción disponible."}</p>
            <h3>Personajes:</h3>
            <ul>
                {comic.characters.items.map(character => (
                    <li key={character.resourceURI}>{character.name}</li>
                ))}
            </ul>
        </div>
    );
};

export default ComicDetail;



