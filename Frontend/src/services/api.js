import axios from 'axios';

const API_URL = 'https://music-album-app-sboa.onrender.com/albums';

//const API_URL = 'http://localhost:3000/albums';

export const getAlbums = () => axios.get(`${API_URL}`);

export const getAlbumById = (id) => axios.get(`${API_URL}/${id}`);

export const addAlbum = (album) => axios.post(API_URL, album);

export const updateAlbumById = (id, album) => axios.put(`${API_URL}/${id}`, album);

export const deleteAlbumById = (id) => axios.delete(`${API_URL}/${id}`);
