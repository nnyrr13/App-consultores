import React, { useEffect, useState } from 'react'
import { HeaderAdmin } from '../components/HeaderAdmin';
import { MdCreate, MdDelete, MdEdit } from 'react-icons/md'
import { ModalProduct } from '../components/ModalProduct';
import { getAuth } from 'firebase/auth';
import { collection, deleteDoc, doc, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import { ProductoItem } from '../components/ProductoItem';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const GestionProductos = () => {

  const auth = getAuth();
  const [showModal, setShowModal] = useState(true);
  const [listaProductos, setListaProductos] = useState(null);
  const navigate = useNavigate();

  const onModal = () => {
    setShowModal(!showModal);
    console.log(showModal);
  }


  // De esta manera se leen los documentos creados desde firebase
  useEffect(() => {
    const fecthUserListing = async () => {
      const productoRef = collection( db, 'productos' );

      if ( auth.currentUser ){
        const q = query( 
            productoRef, 
            where('userRef', '==', auth.currentUser?.uid || JSON.parse(localStorage.getItem('auth'))),  
            orderBy('timestamp', 'desc')
        );
  
        const querySnap = await getDocs(q);
        let listProduct = [];
        querySnap.forEach((doc) => {
          return listProduct.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setListaProductos(listProduct);
      }else {
        console.log('usuario no autenticado.');
      }

    }

    fecthUserListing()
  }, [auth.currentUser?.uid]);

  const onDelete = async (productoID) => {
    if ( window.confirm('Estas seguro que deseas borrar el producto?') ) {
      await deleteDoc( doc( db, "productos", productoID ) )
      const updateProducto= listaProductos.filter(
        ( producto ) => producto.id !== productoID
      );
      setListaProductos( updateProducto )
      toast.success('El producto ha sido eliminado!')
    }
  }

  const onEdit = (productoID) => {
    navigate(`/edit-producto/${ productoID }`)

  }
  


  return (
    <>
      <HeaderAdmin />

      <div className='w-[80%] mx-auto'>
        <button className='bg-green-600 text-white mt-5 p-2 rounded-md font-semibold flex' onClick={ onModal }>
          <MdCreate  className='mr-2'/> Crear Producto
        </button>
      </div>

      <ModalProduct showModal={ showModal } onModal={ onModal } />
    

      <div className="container mx-auto mt-10 w-[70%]">
          <h2 className='text-2xl text-center font-semibold'>Mis Productos</h2>

        <div className='sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl-grid-cols-5 mt-6 mb-6'>
          {/* Crear Producto */}
            {
              listaProductos?.length > 0 && (
                <>
                    {
                      listaProductos.map(( producto ) => (
                        <ProductoItem
                          key={ producto.id }
                          id={ producto.id }
                          producto={ producto.data }
                          onDelete={ () => onDelete(producto.id) }
                          onEdit={ () =>  onEdit(producto.id) }
                        />
                      ))
                    }
                </>
              )
            }
        </div>
      </div>


    </>
  )
}
