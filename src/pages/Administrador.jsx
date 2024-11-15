import { getAuth } from 'firebase/auth'
import React from 'react'
import { Link } from 'react-router-dom';
import { HeaderAdmin } from '../components/HeaderAdmin';
import { GrUserAdmin } from "react-icons/gr";          

export const Administrador = () => {

  const auth = getAuth();

  const { currentUser } = auth

  return (
    <>
      <HeaderAdmin />
        <h1 className='text-lg font-bold mt-10 text-center mb-3 text-blue-700'> Hola! Administrador { currentUser?.displayName } </h1>
        <div className='justify-center flex-col w-[80%] mx-auto'>
            <GrUserAdmin  className='text-8xl mx-auto text-green-600'/>
            <p className='text-center mt-6'> Bienvenido al panel de administración de Pérez Consultores { currentUser?.displayName }, 
              en esta plataforma, podrás gestionar de forma eficiente los productos, los reportes y las ventas de nuestra empresa.
            </p>
        </div>
    
    </>
  )
}
