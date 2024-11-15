import React from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'

export const ProductoItem = ({ producto, id, onDelete, onEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 m-3">
            <img 
                src={ producto.imgUrls[0] }  
                alt="Imagen del producto"
                className='h-[170px] w-full object-cover 
                            hover:scale-105 transition-scale
                            duration-200 ease-in-out'
            />
            <div className="mt-4">
              <h2 className="text-gray-800 font-bold text-xl mb-2"> { producto.title } </h2>
              <p className="text-gray-600 text-sm"> { producto.description } </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center">
                  <span className="text-gray-800 font-bold text-lg mr-2">Precio:</span>
                  <span className="text-gray-900 text-lg">$ { producto.price } </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-600 mr-2">Tipo:</span>
                  <span className="bg-gray-200 rounded-full px-2 py-1 text-xs text-gray-500"> { producto.type } </span>
                </div>
              </div>
              <div className="mt-4 flex justify-end">
                <button onClick={ () => onEdit(producto.id) } className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline mr-2">
                  <MdEdit />
                </button>
                <button  onClick={ () => onDelete(producto.id) } className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full focus:outline-none focus:shadow-outline">
                  <MdDelete />
                </button>
              </div>
            </div>
    </div>
  )
}
