import React, { useState, useEffect } from 'react';
import { getFavorites } from '../utils/localStorageUtils';
import { Link } from 'react-router-dom';

const FavoriteComics = () => {
    const [favorites, setFavorites] = useState([]); // Estado para almacenar los favoritos

    // useEffect para cargar los favoritos al montar el componente
    useEffect(() => {
        setFavorites(getFavorites()); // Obtiene y guarda los favoritos desde LocalStorage
    }, []);

    return (
        <div>
            <h1>Mis Cómics Favoritos</h1>
            <div className="comics-grid">
                {favorites.map(comic => (
                    <div key={comic.id} className="comic">
                        <h2>{comic.title}</h2>
                        <Link to={`/comic/${comic.id}`}>
                            <img src={`${comic.thumbnail.path}.${comic.thumbnail.extension}`} alt={comic.title} />
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FavoriteComics;

