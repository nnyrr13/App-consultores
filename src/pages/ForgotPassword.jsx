import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { OAuth } from '../components/OAuth';
import { toast } from 'react-toastify';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth';
import { Header } from '../components/Header';

// Este componente sirve para que el usuario recupere su contrasena pormdeo de su correo

export const ForgotPassword = () => {

  const [ email, setEmail ] = useState('');

  const onChange = ({ target }) => {
    setEmail( target.value );
  }

  // se envia el formulario a la base de datos 
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      // se envia un correo de firebase con un enlace para que el usuario reestablesca una nueva contrasena
      await sendPasswordResetEmail( auth, email );
      toast.success("El correo ha sido enviado");
    } catch (error) {
      toast.error('No se reestablecio la clave');
    }
  }

  return (
    <>
    <Header />
      <section>
        <h1 className='text-3xl text-center text-blue-600 mt-6 font-bold'>Recupera tu clave</h1>
        <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
          <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
            <img 
              className='w-full rounded-2xl'
              src='https://miro.medium.com/v2/resize:fit:720/format:webp/0*HOrmAtKq3uf6-aSO'
              alt="keys" 
            />
          </div>

          <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-10'>
            <form onSubmit={ onSubmit } >
              <input 
                className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
                type="email" 
                id='email' 
                value={ email } 
                onChange={ onChange } 
                placeholder='email@example.com'
              />

              <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
                <p className='mb-6' >No tienes cuenta?
                  <Link 
                    to='/register' 
                    className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'> Registrate </Link>
                </p>
                <p>
                  <Link 
                    to='/' 
                    className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Ingresa</Link>
                </p>
              </div>
              <button className='w-full bg-blue-600 
                        text-white px-7 py-3 text-sm 
                        font-medium uppercase rounded 
                        shadow-md hover:bg-blue-700 
                        transition duration-300 ease-in-out hover:shadow-lg
                        active:bg-blue-800' 
                type="submit"> 
                        
                Enviar nueva clave

              </button>

              <div className='flex my-4 before:border-t before:flex-1 
                    items-center before:border-gray-300  
                    after:border-t after:flex-1  
                    after:border-gray-300'
              >
                <p className='text-center font-semibold mx-4'> O </p>
              </div>

              <OAuth />

            </form>
          </div>
        </div>
      </section>
    </>
  )
}
