import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { BottomSignOut } from './BottomSignOut';
import { Links } from './Links';
import { CiLogin } from 'react-icons/ci';
import { getAuth } from 'firebase/auth';


/* Este componente define la cabezera (la barra de navegacion) */

export const HeaderAdmin = () => {

    const location = useLocation();
    const { loggedIn } = useAuthStatus();

    const pathMathRoute = ( route ) => {
        if ( route === location.pathname ) {
            return true
        }
    }

    const auth = getAuth();
    const navigate = useNavigate();

    const onLogout = () => {
        auth.signOut();
        navigate('/');
    }

  return (
    <div className='bg-white border-b shadow-sm sticky top-0 z-50 mx-auto'>
        <header className='flex justify-between items-center px-3 max-w-6xl mx-auto'>
            <div>
                {/* Logo de Perez Consultores */}
                <div className='flex items-center'>
                    <h3 className='bg-blue-600 px-2 py-1 rounded text-white font-bold mt-3 mb-3'>Perez Consultores</h3>
                </div>
            </div>
            <div>

            <ul className='flex space-x-10'>
                {/* Enlaces a las paginas de Login y Registro */}
                    <Link  to='/reporte'>
                        <li className={`cursor-pointer py-3 
                                    text-sm font-semibold text-gray-400 
                                    border-b-[3px] border-b-transparent${ pathMathRoute('/reporte') ? "text-blue-700 border-b-blue-500" : ''  }`}
                        >
                            Reportes
                        </li>
                    </Link>


                    <Link to='/gestion-producto' >
                        <li className={`cursor-pointer py-3 
                            text-sm font-semibold text-gray-400 
                            border-b-[3px] border-b-transparent${ pathMathRoute('/gestion-producto') ? "text-blue-700 border-b-blue-500" : ''  }`}
                        >
                            Gestion de Productos
                        </li>
                    </Link>

                    <Link to='/admin'>
                        <li className={`cursor-pointer py-3 
                                text-sm font-semibold
                                border-b-[3px] border-b-transparent text-blue-500 border-b-blue-500`}
                            >
                                <span><strong>Admin:</strong> { auth.currentUser?.displayName } </span>
                        </li>
                    </Link>
                    

                    
                    <button className='flex items-center mr-1 mt-2 mb-2 bg-red-600 px-2 py-2 rounded
                                        text-white ml-3 hover:bg-red-800
                                        transition duration-200 ease-in-out 
                                        cursor-pointer'
                            type='button'
                            onClick={ onLogout }
                    >
                        <span className='font-bold'>Salir</span>
                        <CiLogin className='text-2xl ml-2 rounded text-white font-bold'/>
                    </button>
            </ul> 

                    
            </div>
        </header>
    </div>
  )
}
