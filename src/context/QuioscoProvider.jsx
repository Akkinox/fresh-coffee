import { createContext, useState, useEffect } from 'react'
// import { categorias as categoriasDB} from "../data/categorias"
import { toast } from 'react-toastify';
import axios from 'axios';
import clienteAxios from '../config/axios';

// Aqui generamos que la vinculacion de useContext con nuestro QuioscoContext

const QuioscoContext = createContext();

// En esta funcion de QuiscoProvider tenemos la mayoria de logica (funciones) en el front
// aca podemos obtener la data para ser mostrada al usuario y la presentacion de la data
// en variables hacia el HTML

const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState([]);
    // const [categorias, setCategorias] = useState(categoriasDB);
    // const [categoriaActual, setCategoriaActual] = useState(categorias[0]);
    const [categoriaActual, setCategoriaActual] = useState({});
    const [modal, setModal] = useState(false);
    const [producto, setproducto] = useState({});
    const [pedido, setPedido] = useState([]);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        const nuevoTotal = pedido.reduce((total, producto) => (producto.precio * producto.cantidad) + total, 0)
        setTotal(nuevoTotal)
    }, [pedido])

    // Aqui esta la funcion de obtencion de las categorias

    const obtenerCategorias = async () => {
        try{
            // aca generamos la conexion con nuestro back hacia las categorias
            const {data} = await clienteAxios('/api/categorias')
            setCategorias(data.data)
            setCategoriaActual(data.data[0])
        }catch(error){
            console.log(error)
        }
    }

    useEffect(() =>{
        obtenerCategorias()
    }, [])

    const handleClickCategoria = id => {
        const categoria = categorias.filter(categoria => categoria.id === id)[0]
        setCategoriaActual(categoria)
    }

    const handleClickModal = () => {
        setModal(!modal)
    }

    const handleSetProducto = producto => {
        setproducto(producto)
    }

    const handleAgregarPedido = ({categoria_id, ...producto}) => {
        if(pedido.some( pedidoState => pedidoState.id === producto.id))
        {
            const pedidoActualizado = pedido.map( 
                pedidoState => pedidoState.id === producto.id ? producto : pedidoState)
            setPedido(pedidoActualizado)
            toast.success('Cambios realizados');
        }else{
            setPedido([...pedido, producto])
            toast.success('Agregado al pedido');
        }   
    }

    const handleEditarCantidad = id => {
        const productoActualizar = pedido.filter(producto => producto.id === id)[0]
        setproducto(productoActualizar)
        setModal(!modal)
    }

    const handleEliminarProductoPedido = id => {
        const pedidoActualizado = pedido.filter(producto => producto.id !== id)
        setPedido(pedidoActualizado)
        toast.warning('Eliminado del pedido')
    }


    return (
        <QuioscoContext.Provider
            value={{
                categorias, 
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido,
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total

            }}

        >{children}</QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext