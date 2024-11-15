import React, { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth'; 
import { toast } from 'react-toastify';
import { Header } from '../components/Header';

// Este componente es para que el usuario inicie sesion con su correo y contrasena


export const LoginAdmin = () => {

  const [ showPassword, setshowPassword ] = useState(false);
  // se capturan los valores del input de correo y contrasena
  const [ formData, setFormData ] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;
  const navigate = useNavigate();
  const onChange = ({ target }) => {
    setFormData( ( prevState ) =>  ({
      ...prevState,
      [target.id]: target.value,
    }))
  }
  // Envio del formulario a la base de datos para iniciar sesion
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword( auth, email, password );
      // si el usuario existe se envia a la pagina principal
      if ( userCredential.user.email === 'rsegura944@gmail.com' && userCredential.user.displayName === 'Rafael Segura'  ) {
        toast.success('Ha iniciado sesion como administrador con exito!!');
        navigate('/admin');
      }
    } catch (error) {
      toast.error('Credenciales de usuario invalidas');
    }
  }

  return (
    <>
      <Header />
      <section>
        <h1 className='text-3xl text-center text-blue-600 mt-6 font-bold'>Inicia como Administrador</h1>
        <div className='flex justify-center flex-wrap items-center px-6 py-12 max-w-6xl mx-auto'>
          <div className='md:w-[67%] lg:w-[50%] mb-12 md:mb-6'>
            <img 
              className='w-full rounded-2xl'
              src='https://img.freepik.com/vector-premium/administrador-ti-proceso-actualizacion-software-computadora-portatil-administracion-dispositivos-sistemas-digitales-mantenimiento-redes-concepto-configuracion-sistemas-informaticos-vector-aplicacion-mantenimiento-sistema_37895-697.jpg?w=740' 
              alt="keys" 
            />
          </div>

          <div className='w-full md:w-[67%] lg:w-[40%] lg:ml-10'>
            <form onSubmit={ onSubmit }>
              <input 
                className='mb-6 w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
                type="email" 
                id='email' 
                value={ email } 
                onChange={ onChange } 
                placeholder='email@example.com'
              />

              <div className='relative mb-6'>
                <input 
                  type={ showPassword ? 'text' : 'password' }
                  id='password' 
                  value={ password } 
                  onChange={ onChange } 
                  placeholder='password'
                  className='w-full px-4 py-2 text-xl text-gray-700 bg-white border-gray-300 rounded transition ease-in-out' 
                />

                {
                  showPassword ? 
                  ( <AiFillEyeInvisible 
                      className='absolute right-3 top-3 text-xl cursor-pointer' 
                      onClick={ () => setshowPassword((prevState) => !prevState ) } 
                  /> ) 
                  : ( 
                    <AiFillEye 
                      className='absolute right-3 top-3 text-xl cursor-pointer' 
                      onClick={ () => setshowPassword((prevState) => !prevState ) } />
                    )
                }
              </div>
              <div className='flex justify-between whitespace-nowrap text-sm sm:text-lg'>
                <p className='mb-6' >Eres usuario?
                  <Link 
                    to='/' 
                    className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'>Inicia</Link>
                </p>
                <p>
                  <Link 
                    to='/register' 
                    className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>No tienes cuenta?</Link>
                </p>
              </div>
              <button className='w-full bg-blue-600 
                        text-white px-7 py-3 text-sm 
                        font-medium uppercase rounded 
                        shadow-md hover:bg-blue-800 
                        transition duration-400 ease-in-out hover:shadow-lg
                        active:bg-blue-800' 
                type="submit"> 
                        
                Inicia 

              </button>

              <div className='flex my-4 before:border-t before:flex-1 
                    items-center before:border-gray-300  
                    after:border-t after:flex-1  
                    after:border-gray-300'
              >
                <p className='text-center font-semibold mx-4'> O </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}
