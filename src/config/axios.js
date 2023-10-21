import axios from "axios";

// En esta funcion definimos la conexion de nuestro front con el backend en laravel
// definimos los headers para el consumo de las apis y tambien definimos que 
// se utilizaran credenciales para ser utilizadas

const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        'Accept': 'application/json',
        'X-Requested-With' : 'XMLHttpRequest'
    },  
    withCredentials: true,
})

export default clienteAxios;