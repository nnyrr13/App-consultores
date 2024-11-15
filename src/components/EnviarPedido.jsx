import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import React, { useState } from 'react'
import { db } from '../../firebase';
import { toast } from 'react-toastify';
import { getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

export const EnviarPedido = () => {

    const auth = getAuth();
    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        nombre: '',
        telefono: '',
        precio: 0,
        productoPedido: '',
        pedido: true,
      })
    
      const { nombre, telefono, precio, productoPedido, pedido } = formData;
    
      const handleChange = (e) => {
        // text / booleans / numbe
            setFormData(( prevState ) => ({
                ...prevState,
                [e.target.id]: e.target.value,
            }))
      };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const formDataCopy = {
            ...formData,
            timesstamp: serverTimestamp(),
          }
          console.log(formDataCopy)
      
          const docRef = await addDoc( collection( db, 'pedidos' ), formDataCopy );
          toast.success('El pedido ha sido enviado');
            setFormData({
              nombre: '',
              telefono: '',
              precio: 0,
              productoPedido: '',
              offerPedido: true
            })
            navigate('/home');
          
        } catch (error) {
          toast.error('Ha ocurrido un error con el envio del pedido');
          console.log( error );
        }
    
      }

  return (
        <div className="bg-white p-4 rounded-lg shadow-md w-[50%] max-w-md mx-auto mt-40">
            <form onSubmit={ handleSubmit }>
                <h2 className="text-xl font-bold mb-4">Datos del Pedido</h2>
                <div className="flex flex-col mb-4">
                    <input type="text" required id="productoPedido" placeholder='Nombre del producto' className="border p-2 rounded" value={productoPedido} onChange={handleChange}/>
                </div>
                <div className="flex flex-col mb-4">
                    <input type="text" required id="nombre" placeholder='Su nombre' className="border p-2 rounded" value={nombre} onChange={handleChange} />
                </div>
                <div className="flex flex-col mb-4">
                    <input type="tel" placeholder='telefono' required id="telefono"  className="border p-2 rounded" value={telefono} onChange={handleChange} />
                </div>
                <div className="flex flex-col mb-4">
                    <label className="mb-2" htmlFor="price">Precio</label>
                    <input type="number" required id="precio" placeholder='Precio del producto' className="border p-2 rounded" min="1" value={precio} onChange={handleChange}/>
                </div>
                <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">Enviar pedido</button>
            </form>
        </div>       
  )
}
