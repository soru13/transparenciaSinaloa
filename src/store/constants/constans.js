import axios from 'axios';
axios.defaults.baseURL = '/api/';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;

export const EMAIL = 'EMAIL';
export const NUMEROS_DECIMALES = 'numerosdecimales';
export const NO_SPACE = 'NO_SPACE';
export const LETRAS_Y_ACENTOS = 'letrasyacentos';