import { createContext, useState } from 'react'
import { categorias as categoriasDB} from "../data/categorias"
import { toast } from 'react-toastify';
const QuioscoContext = createContext();

const QuioscoProvider = ({children}) => {
    const [categorias, setCategorias] = useState(categoriasDB);
    const [categoriaActual, setCategoriaActual] = useState(categorias[0]);
    const [modal, setModal] = useState(false);
    const [producto, setproducto] = useState({});
    const [pedido, setPedido] = useState([]);

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

    const handleAgregarPedido = ({categoria_id, imagen, ...producto}) => {
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
                handleAgregarPedido

            }}

        >{children}</QuioscoContext.Provider>
    )
}

export {
    QuioscoProvider
}

export default QuioscoContext