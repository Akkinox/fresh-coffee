import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from 'react-router-dom'
import { QuioscoProvider } from './context/QuioscoProvider'
import router from './router'
import './index.css'

// En esta funcion se renderiza el DOM de react donde definimos el provider
// de QuiscoProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <QuioscoProvider>
      <RouterProvider router={router}/>
    </QuioscoProvider>
  </React.StrictMode>,
)
