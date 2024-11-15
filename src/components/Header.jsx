import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { BottomSignOut } from './BottomSignOut';
import { Links } from './Links';


/* Este componente define la cabezera (la barra de navegacion) */

export const Header = () => {

    const location = useLocation();
    const { loggedIn } = useAuthStatus()

    const pathMathRoute = ( route ) => {
        if ( route === location.pathname ) {
            return true
        }
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

                    {
                        location.pathname === '/home' && loggedIn === true || location.pathname === '/soporte' || location.pathname === '/admin' ?  <BottomSignOut pathMathRoute={ pathMathRoute }/> : <Links pathMathRoute={ pathMathRoute } /> 
                    }
            </div>
        </header>
    </div>
  )
}
