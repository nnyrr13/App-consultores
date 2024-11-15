import React, { useEffect, useState } from 'react';
import { HeaderAdmin } from '../components/HeaderAdmin';
import { MdDelete } from "react-icons/md";
import { getAuth } from 'firebase/auth';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../../firebase';
import pedidosData from '../data/pedidosData';
import { toast } from 'react-toastify';
import { PedidoItem } from '../components/PedidoItem';

export const Reportes = () => {

  /* const auth = getAuth(); */
  /* const userCurrent = auth.currentUser?.displayName; */
  /* const [pedidos, setPedidos] = useState([]); */
  const [dataPedidos, setDataPedidos] = useState( pedidosData );

  

  /* useEffect( () => {
    const fetchPedidos = async () => {

        // tomar referencia
        const pedidoRef =  collection(db, 'pedidos');
        // crear la consulta
        const q = query( pedidoRef, where('pedido', '==', true ), orderBy('timestamp', 'desc'));
        // ejecutar la consulta
        const querySnap = await getDocs(q);
        let pedidosFirestore = [];
        querySnap.forEach((doc) => {
          return pedidosFirestore.push({
            id: doc.id,
            ...doc.data(),
          });
        });
        console.log( pedidosFirestore );
        setPedidos( pedidosFirestore );
      
      }
    fetchPedidos();
  }, []); */


  const onDeletePedido = (id) => {
    const updateTablePedidos = dataPedidos.filter( 
      ( pedidoData ) => id !== pedidoData.id
    );
    setDataPedidos( updateTablePedidos );
    toast.success('Pedido eliminado!');
  }


  return (
    <>
      <HeaderAdmin />
      <h1 className='mt-10 text-center font-semibold text-2xl mb-7 text-blue-500'>Reportes</h1>
      <div className='w-[100%]'>
        <section className='flex justify-center items-center mx-auto w-[80%]'>
          <div className='w-[20%] ml-3 bg-white text-center p-2 rounded-lg border-gray-300 shadow-sm hover:shadow-lg hover:bg-green-300 transition'>
            <h4>Clientes en el mes</h4>
            <span className='font-semibold'> { dataPedidos.length } </span>
          </div>
          <div className='w-[20%] ml-3 bg-white text-center p-2 rounded-lg shadow-sm hover:shadow-lg hover:bg-green-300 transition'>
            <h4>Total de Ingresos</h4>
            <span className='font-semibold'>308$</span>
          </div>
          <div className='w-[20%] ml-3 bg-white text-center p-2 rounded-lg shadow-sm hover:shadow-lg hover:bg-green-300 transition'>
            <h4>Total de productos</h4>
            <span className='font-semibold'>5</span>
          </div>
        </section>

        <h3 className='font-semibold text-center mt-20 mb-10'>Lista de Pedidos</h3>
        <div className="container mx-auto my-10 w-[80%]">
          <table className="table-auto w-full border-collapse rounded-lg shadow-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-left">Teléfono</th>
                <th className="py-3 px-6 text-left">Costo</th>
                <th className="py-3 px-6 text-left">Producto</th>
                <th className="py-3 px-6 text-center"></th>
              </tr>
            </thead>
            <tbody>

              {
                dataPedidos.map( (pedido) => (
                  <PedidoItem  key={ pedido.id } pedido={ pedido } onDeletePedido={ () => onDeletePedido( pedido.id ) } />
                ))
              }
            </tbody>
          </table>
        </div>

      </div>
    
    </>
  )
}
