import { useEffect } from 'react';
import clienteAxios from '../config/axios';
import { useNavigate } from 'react-router-dom';
import useSWR from 'swr';

// Las funciones definidas en este js son para conectar 
// las funciones de auth al back de laravel

export const useAuth = ({middleware, url}) => {

    // definicion de constantes para token, navegacion y uso de SWR(conexion del usuario)
    const token = localStorage.getItem('AUTH_TOKEN');
    const navigate = useNavigate();

    const {data: user, error, mutate} = useSWR('/api/user', () =>
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(res => res.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    );

    // Funcion que conecta a la funcionalidad de login de backend
    const login = async (datos, setErrores) => {
        try{
            const {data} = await clienteAxios.post('/api/login', datos)
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([])
            await mutate()
        }catch(error){
            setErrores(Object.values(error.response.data.errors))
        }
    }

    // Funcion que registra a un usuario con la funcion de registro de backend
    const registro = async (datos, setErrores) => {
        try{
            const {data} = await clienteAxios.post('/api/registro', datos)
            console.log(data.token)
        }catch(error){
            setErrores(Object.values(error.response.data.errors))
        }
    }
    
    // Funcion para desloguear a los usuarios del coffee shop
    const logout = async () => {
        try {
            await clienteAxios.post('/api/logout', null, {
                headers: {                
                    Authorization: `Bearer ${token}`,
                }
            });
            localStorage.removeItem('AUTH_TOKEN');
            mutate(undefined)
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
    }

    // Funcion useEffect para la validación de autenticacion del usuario en el sitio
    useEffect(() => {
        if(middleware === 'guest' && url && user){
            navigate(url)
        }
        if(middleware === 'auth' && error){
            navigate('/auth/login')
        }
    }, [user, error])


    return {
        login,
        registro,
        logout,
        user,
        error
    }
}