import React from 'react'
import { MdDelete } from 'react-icons/md'

export const PedidoItem = ({ pedido, onDeletePedido }) => {
  return (
        <tr className="border-b border-gray-200 hover:bg-gray-100">
            <td className="py-4 px-6"> { pedido.nombre } </td>
            <td className="py-4 px-6"> { pedido.telefono } </td>
            <td className="py-4 px-6">$ { pedido.precio } </td>
             <td className="py-4 px-6"> { pedido.producto } </td>
            <td className="py-4 px-6 text-center">
            <button  onClick={ () => onDeletePedido( pedido.id ) } className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                <MdDelete />
            </button>
            </td>
        </tr> 
  )
}
