import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { MdLocationOn } from 'react-icons/md';
import { FaWhatsapp } from 'react-icons/fa';
import { MdAttachEmail } from 'react-icons/md';
import { Header } from '../components/Header';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { Link } from 'react-router-dom';

export const Home = () => {

  const auth = getAuth();
  const userCurrent = auth.currentUser.displayName;
  const [productos, setProductos] = useState([]);
  

  useEffect( () => {
    const fetchProductos = async () => {
      try {
        // tomar referencia
        const productoRef = collection( db, 'productos' );
        // crear la consulta
        const q = query( productoRef, where('offer', "==", true ), orderBy('timestamp', 'desc') )
        // ejecutar la consulta
        const querySnap = await getDocs(q);
        let producto = [];
        querySnap.forEach((doc) => {
          return producto.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        
        setProductos( producto );

      } catch (error) {
        console.log(error);
      }

    }
    fetchProductos()
  }, [auth.currentUser?.uid]);
  
  

  return (
    <>
      <Header />
      <div className='bg-gray-50 border-b top-0'>
        <h1 className='text-3xl text-center text-blue-600 py-10 font-bold'>Bienvenido { userCurrent } </h1>
        <p className='text-center mt-5 font-semibold' >Hola { userCurrent }, aqui te presentamos una gama de softwares y aplicaciones que te brindaran una solucion administrativa a tu negocio. </p>
        
        <section className=' max-w-6xl mx-auto mt-6 px-6 py-6'>
          
                {
                  productos.map( ( producto ) => (
                    <div key={ producto.id } className='bg-white flex items-center justify-center px-5 py-5 mt-12 h-100 shadow-md rounded-md mx-auto w-full border-gray-400'>
                      
                      <div className='info-container w-[80%] mr-2'>
                        <div className='image-container h-[150px] m-4'>
                          <img src={ producto.data.imgUrls } alt={ producto.data.title } className=' w-[100px]' />
                        </div>
                          <div className='text-soft'>
                              <h3 className='text-2xl font-bold mt-2 mb-3 sm:text-xl flex'> <MdLocationOn className='text-red-600'/> { producto.data.title } </h3>
                              <hr />
                              <p className='mb-5 flex-wrap' > { producto.data.description } </p>
                              <span className='text-2xl font-bold'> { producto.data.price }$ <b className='font-light text-xl'>/ mes</b> </span> 
                          </div>
                          <div className='info-soft flex justify-between flex-wrap mt-6'>
                              <a target='_blank' href='https://wa.me/+584126095711?text=Hola,%20estoy%20interesado%20en%20tu%20producto' className='bg-green-600 text-white px-2 py-1 rounded-lg font-bold m-1 items-center flex'> 
                                <FaWhatsapp  className='text-2xl'/>
                                Contacto 
                              </a>
    
                              <Link to={`/home/${ producto.id }`} className='bg-blue-600 text-white px-2 py-1 rounded-lg font-bold m-1 flex'> 
                                <MdAttachEmail className='text-2xl' />
                                Enviar Pedido
                              </Link>
    
                              <span className='bg-gray-400 text-white px-2 py-1 rounded-lg font-bold m-1'> { producto.data.type } </span>
                          </div>
                      </div>
    
                        
                    </div>
                  ))
                }       
              
        </section>
      </div>
    </>
  )
}
