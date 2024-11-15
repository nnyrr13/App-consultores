import React from 'react'
import { Link } from 'react-router-dom'

export const Links = ( { pathMathRoute } ) => {
  return (
    <ul className='flex space-x-10'>

    

    {/* Enlaces a las paginas de Login y Registro */}
        <Link  to='/'>
            <li className={`cursor-pointer py-3 
                        text-sm font-semibold text-gray-400 
                        border-b-[3px] border-b-transparent${ pathMathRoute('/') ? "text-blue-700 border-b-blue-500" : ''  }`}
            >
                Ingresar
            </li>
        </Link>


        <Link to='/register' >
            <li className={`cursor-pointer py-3 
                text-sm font-semibold text-gray-400 
                border-b-[3px] border-b-transparent${ pathMathRoute('/register') ? "text-blue-700 border-b-blue-500" : ''  }`}
            >
                Registrarse
            </li>
        </Link>

        <Link to='/login-admin' >
            <li className={`cursor-pointer py-3 
                text-sm font-semibold text-gray-400 
                border-b-[3px] border-b-transparent${ pathMathRoute('/login-admin') ? "text-blue-700 border-b-blue-500" : ''  }`}
            >
                Administrador
            </li>
        </Link>
    </ul>   
  )
}
