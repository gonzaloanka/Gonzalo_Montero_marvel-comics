import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import ComicList from './components/ComicList';
import ComicDetail from './components/ComicDetail';
import FavoriteComics from './components/FavoriteComics';
import './App.css';

function App() {
    return (
        <Router>
            <nav>
                <Link to="/">Inicio</Link> {/* Enlace a la página principal */}
                <Link to="/favorites">Favoritos</Link> {/* Enlace a la página de favoritos */}
            </nav>
            <Routes>
                <Route path="/" element={<ComicList />} /> {/* Ruta para la lista de cómics */}
                <Route path="/comic/:comicId" element={<ComicDetail />} /> {/* Ruta para el detalle del cómic */}
                <Route path="/favorites" element={<FavoriteComics />} /> {/* Ruta para la lista de favoritos */}
            </Routes>
        </Router>
    );
}

export default App;




