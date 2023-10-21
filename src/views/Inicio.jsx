import useSWR from 'swr'
import Producto from '../components/Producto'
import useQuiosco from '../hooks/useQuiosco'
import clienteAxios from '../config/axios'

// Funcion que define el view del sitio Coffee shop
// donde se muestra la información de los productos

export default function Inicio() {
  const {categoriaActual} = useQuiosco()

  // Consulta SWR
  // Obtiene los datos desde el backend para mostrar los productos en el frontend
  const fetcher = () => clienteAxios('/api/productos').then(data => data.data);

  const {data, error, isLoading} = useSWR('/api/productos', fetcher, {
    // Refresca la pagina cada 1 segundo para validar los productos (disponible o no)
    refreshInterval: 1000
  });
  
  console.log(error);
  if(isLoading) return 'Cargando...'
  const productos = data.data.filter(producto => producto.categoria_id === categoriaActual.id)
  
  // Retorna html para la vista de productos

  return (
    <>
      <h1 className='text-4xl font-black'> {categoriaActual.nombre} </h1>
      <p className='text-2xl my-10'>
        Elige y personaliza tu pedido a continuacion
      </p>
      <div className='grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
          {productos.map(producto => (
              <Producto
                key={producto.imagen}
                producto={producto}
              />
          ))}
      </div>
    </>

  )
}
