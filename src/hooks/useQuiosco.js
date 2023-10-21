import { useContext } from 'react'
import QuioscoContext from '../context/QuioscoProvider'

// En esta funcion usamos el uso de useContext dentro de nuestro provider custom

const useQuiosco = () => {
    return useContext(QuioscoContext)
}

export default useQuiosco