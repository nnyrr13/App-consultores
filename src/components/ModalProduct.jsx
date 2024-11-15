import React, { useState } from 'react'
import { MdClose } from 'react-icons/md';
import { toast } from 'react-toastify';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import { useNavigate } from 'react-router';

export const ModalProduct = ({ showModal, onModal }) => {

    const auth = getAuth();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        images: {},
        title: '',
        description: '',
        price: 1,
        type: 'software',
        offer: true
      });

    const { images, title, description, price, type, offer } = formData;
    
      const handleChange = (e) => {
        let boolean = null;
        if ( e.target.value === 'true' ) {
            boolean = true;
        }
        if ( e.target.value === 'false' ) {
            boolean = false;
        }
        //Files
        if ( e.target.files ) {
            setFormData(( prevState ) => ({
                ...prevState,
                images: e.target.files
            }))
        }
        // text / booleans / number
        if ( !e.target.files ) {
            setFormData(( prevState ) => ({
                ...prevState,
                [e.target.id]: boolean ?? e.target.value,
            }))
        }
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
          if ( images.length > 1 ) {
            toast.error('maximum 1 images are allowed.');
            return
        }
        // Aquí se enviaría el formulario a un servidor o API
        // A partir de aqui se desarrolla una funcion para almacenar la imagen en firebase storage
        const storeImage = async (image) => {
          return new Promise(( resolve, reject ) => {
              const storage = getStorage()
              const filename = `${ auth.currentUser.uid }-${image.name}-${ uuidv4() }`;
              const storageRef = ref( storage, filename );
              const uploadTask = uploadBytesResumable( storageRef, image );
              uploadTask.on('state_changed', 
                  ( snapshot ) => {
                      const progress = ( snapshot.bytesTransferred / snapshot.totalBytes ) * 100;
                      console.log('Upload is ' + progress + '% done');
                      switch (snapshot.state) {
                          case 'paused':
                              console.log('Upload is paused');    
                              break;
                          case 'running':
                              console.log('Upload is running');
                              break;    
                      }
                  },
                  ( error ) => {
                      // handle unsuccessful uploads
                      reject( error )
                  },
                  () => {
                      // handle unsuccessful uploads on complete
                      // handle unsuccessful uploads on complete
                      // For instance, get the download URL: https: //firebasestorage.googleapis.com/...
                      getDownloadURL( uploadTask.snapshot.ref ).then( (downloadURL) => {
                          resolve(downloadURL);
                      })
                  }
              )
          })
      }
      
      // esta funcion es para que se aplique el almacenamiento en firebase storage a todas las imanes que se seleccionen
      const imgUrls = await Promise.all( 
          [...images].map(( image ) => storeImage( image ))
      ).catch((error) => {
          toast.error('Images not uploaded');
          return
      });

      

      const formDataCopy = {
          ...formData,
          imgUrls,
          timestamp: serverTimestamp(),
          userRef: auth.currentUser?.uid,
      };
      // Borrar los campos que no vamos a utilizar
      delete formDataCopy.images;
      // En la siguiente linea se crea y se envia en firebase 
      const docRef = await addDoc( collection( db, 'productos' ), formDataCopy );
      navigate('/reporte');
      toast.success('El Producto ha sido creado!');
        setFormData({
            images: {},
            title: '',
            description: '',
            price: 1,
            type: 'software',
            offer: true
        })
      };

      

  return (
    <div className={`fixed top-10 left-0 right-0 bottom-0 z-50 ${ showModal ? 'hidden' : '' }`}>
        <div className="bg-white rounded-lg shadow-lg p-4 mx-auto w-full max-w-md">
                <div className='flex justify-end'>
                    <span className='flex items-center bg-red-500 text-white font-semibold rounded-md p-1 cursor-pointer' onClick={ onModal }>
                        <MdClose /> cerrar 
                    </span>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md w-full max-w-md mx-auto">
                    <form onSubmit={handleSubmit}>
                        <h2 className="text-xl font-bold mb-4">Crear Producto</h2>
                        <div className="flex flex-col mb-4">
                        <label className="mb-2" htmlFor="images">Imagen</label>
                        <input type="file" required multiple id="images" accept='.jpg, .png' className="border p-2 rounded" onChange={handleChange} />
                        </div>
                        <div className="flex flex-col mb-4">
                        <label className="mb-2" htmlFor="title">Título</label>
                        <input type="text" required id="title"  className="border p-2 rounded" value={title} onChange={handleChange} />
                        </div>
                        <div className="flex flex-col mb-4">
                        <label className="mb-2" htmlFor="description">Descripción</label>
                        <textarea id="description" required  className="border p-2 rounded" value={description} onChange={handleChange} />
                        </div>
                        <div className="flex flex-col mb-4">
                        <label className="mb-2" htmlFor="price">Precio</label>
                        <input type="number" required id="price"  className="border p-2 rounded" min="1" value={price} onChange={handleChange} />
                        </div>
                        <div className="flex flex-col mb-4">
                        <label className="mb-2" htmlFor="type">Tipo de producto</label>
                        <select id="type" required  className="border p-2 rounded" value={type} onChange={handleChange}>
                            <option value="software">Software</option>
                            <option value="aplicativo">Aplicativo</option>
                        </select>
                        </div>
                        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Crear Producto</button>
                    </form>
            </div>
        </div>
    </div>
  )
}
