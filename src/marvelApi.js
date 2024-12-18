import axios from 'axios';
import CryptoJS from 'crypto-js';

// Claves públicas y privadas para autenticación en la API de Marvel
const publicKey = '1fed7b650b2a6283bb4e3ba28f7832f8';
const privateKey = '2f3c8653f7c29c2e015f7c7e5adf29096646c0b1';

// Función para obtener una lista de cómics ordenados por última modificación
export const fetchComics = async () => {
    const ts = Date.now(); // Timestamp para la autenticación
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString(); // Generación del hash para la API
    const url = `https://gateway.marvel.com/v1/public/comics?orderBy=-modified&ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    try {
        const response = await axios.get(url); // Solicitud a la API
        return response.data.data.results; // Devuelve la lista de cómics obtenida
    } catch (error) {
        console.error("Error al obtener los cómics:", error);
        return []; // Retorna un array vacío en caso de error
    }
};

// Función para obtener los detalles de un cómic específico usando su ID
export const fetchComicDetail = async (comicId) => {
    const ts = Date.now();
    const hash = CryptoJS.MD5(ts + privateKey + publicKey).toString();
    const url = `https://gateway.marvel.com/v1/public/comics/${comicId}?ts=${ts}&apikey=${publicKey}&hash=${hash}`;

    try {
        const response = await axios.get(url);
        return response.data.data.results[0]; // Devuelve los detalles del cómic
    } catch (error) {
        console.error("Error al obtener detalles del cómic:", error);
        return null; // Retorna null en caso de error
    }
};

