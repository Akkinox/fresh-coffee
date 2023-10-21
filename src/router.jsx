import {createBrowserRouter} from 'react-router-dom'
import Layout from './layouts/Layout';
import AuthLayout from './layouts/AuthLayout';
import Inicio from './views/Inicio';
import Login from './views/Login';
import Registro from './views/Registro';

// Funcion de rutas
// en esta seccion se definen las rutas de los layouts y los componentes
// que usaran estos layouts, se definen los paths

const router = createBrowserRouter([
    // En este bloque se define el path principal donde se veran los productos
    {
        path: '/',
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Inicio />
            }
        ]
    },

    // En este bloque se define la ruta de la autenticacion de usuario
    {
        path: '/auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/registro',
                element: <Registro />
            }
        ]
    }
]);

export default router;