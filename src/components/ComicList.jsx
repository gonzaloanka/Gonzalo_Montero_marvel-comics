import React, { useEffect, useState } from 'react';
import { fetchComics } from '../marvelApi';
import { Link } from 'react-router-dom';
import './ComicList.css';

const ComicList = () => {
    const [comics, setComics] = useState([]); // Estado para almacenar los cómics

    // useEffect para cargar los cómics al montar el componente
    useEffect(() => {
        const loadComics = async () => {
            const data = await fetchComics(); // Llama a la función para obtener cómics
            setComics(data); // Actualiza el estado con la lista de cómics
        };
        loadComics();
    }, []);

    return (
        <div>
            <h1>Marvel Comics</h1>
            <div className="comics-grid">
                {comics.map(comic => (
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

export default ComicList;


