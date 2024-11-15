import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import React from 'react';
import { FcGoogle } from 'react-icons/fc';
import { toast } from 'react-toastify';
import { db } from '../../firebase';
import { doc, getDoc, serverTimestamp, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


export const OAuth = () => {

  const navigate = useNavigate();

  // funcion para que el usuario se pueda autenticar por medio de su cuenta de Google
  const onGoogleClick = async () => {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup( auth, provider );
      const user = result.user;

      // Revisar por el ID del usuario en la base de datos 

      const docRef = doc( db, "users", user.uid );
      const docSnap = await getDoc( docRef );
      // Si el usuario no existe lo inserta en la base de datos
      if ( !docSnap.exists() ) {
        await setDoc( docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      }
      toast.success('Se ha autenticado con Google!!');
      // si la autenticacion sale bien con google el usuario ingresa a la pagina principal
      navigate('/home');
      
    } catch (error) {
      toast.error('No se autorizo con Google')
    }
  }

  return (
    <button className='flex items-center justify-center 
                w-full bg-red-700 text-white px-7 py-3 
                uppercase text-sm font-medium 
                hover:bg-red-800 active:bg-red-900 
                shadow-md hover:shadow-lg active:shadow-lg 
                transition duration-200 ease-in-out rounded'
            type='button'
            onClick={ onGoogleClick }
    >
        <FcGoogle className='text-2xl bg-white rounded-full mr-2' />
        Continua con Google
    </button>
  )
}
