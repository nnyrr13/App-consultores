import React, { useState } from 'react';
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai';
import { Link, useNavigate } from 'react-router-dom';
import { OAuth } from '../components/OAuth';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { db } from '../../firebase';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { Header } from '../components/Header';


export const Register = () => {

  const [ showPassword, setshowPassword ] = useState(false)
  const [ formData, setFormData ] = useState({
    name: '',
    email: '',
    password: '',
  });

  const { name, email, password } = formData;
  const navigate = useNavigate();
  const onChange = ({ target }) => {
    setFormData( ( prevState ) =>  ({
      ...prevState,
      [target.id]: target.value,
    }))
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // peticion a la base de datos para registrar a un nuevo usuario por mdeio de su email y contrasena
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword( auth, email, password );
      updateProfile( auth.currentUser, {
        displayName: name
      })
      const user = userCredential.user;
      const formDataCopy = { ...formData };
      delete formData.password;
      formDataCopy.timestamp = serverTimestamp();
      // se inserta al usuario en una lista de usuarios segun su id en firebase
      await setDoc( doc( db, "users", user.uid ), formDataCopy  );
      // si el usuario se registra con exito se redirige a la pagina principal Home
      toast.success('El registro ha sido exitoso!!');
      navigate('/home');

    } catch (error) {
      toast.error('Algo salio mal con el registro')
    }
  }

  return (
    <>
      <Header />
      <section>
        <h1 className='text-3xl text-center text-blue-600 mt-6 font-bold'>Registrate</h1>
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
                className='mb-6 w-full px-4 py-2 
                          text-xl text-gray-700 
                          bg-white border-gray-300 rounded 
                          transition ease-in-out' 
                type="text" 
                id='name' 
                value={ name } 
                onChange={ onChange } 
                placeholder='Full Name'
              />

              <input 
                className='mb-6 w-full px-4 py-2 
                          text-xl text-gray-700 
                          bg-white border-gray-300 rounded 
                          transition ease-in-out' 
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
                <p className='mb-6' >Tienes cuenta?
                  <Link 
                    to='/' 
                    className='text-red-600 hover:text-red-700 transition duration-200 ease-in-out ml-1'> Ingresa </Link>
                </p>
                <p>
                  <Link 
                    to='/recuperar-clave' 
                    className='text-blue-600 hover:text-blue-800 transition duration-200 ease-in-out'>Olvidaste tu clave?</Link>
                </p>
              </div>
              <button className='w-full bg-blue-600 
                        text-white px-7 py-3 text-sm 
                        font-medium uppercase rounded 
                        shadow-md hover:bg-blue-700 
                        transition duration-300 ease-in-out hover:shadow-lg
                        active:bg-blue-800' 
                type="submit"> 
                        
                Registrate

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
