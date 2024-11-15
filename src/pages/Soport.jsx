import React, { useState, useRef } from 'react';
import { RiMailSendLine } from 'react-icons/ri';
import { TiUserOutline } from 'react-icons/ti';
import { BsTelephoneFill } from 'react-icons/bs';
import { MdDescription } from 'react-icons/md';
import emailjs from '@emailjs/browser';
import { toast } from 'react-toastify';
import { Header } from '../components/Header';


export const Soport = () => {

  const [nombre, setNombre] = useState('');
  const [telefono, setTelefono] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const form = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Enviar datos a tu API o servicio

    emailjs
    .sendForm('service_mr5qanr', 'template_6rlvhfg', form.current, {
      publicKey: 'afHPwZGFDrjQXk_lh',
    })
    .then(
      () => {
        toast.success('El mensaje ha sido enviado con exito');
        // Limpiar el formulario
        setNombre('');
        setTelefono('');
        setDescripcion('');

      },
      (error) => {
        console.log('FAILED...', error.text);
      },
    );    

  };

  return (
    <>
      <Header />
      
      <div className="container mx-auto mt-10 flex flex-col items-center px-3 py-3">
        <h1 className="text-2xl font-bold mb-5">Formulario de Soporte</h1>
        <form ref={ form } onSubmit={handleSubmit} className="w-full max-w-lg">
          <div className="flex flex-col mb-4">
            <label htmlFor="nombre" className="mb-2 font-medium">
              
            </label>
            <div className="flex items-center border-2 border-gray-200 rounded-md p-2">
              <TiUserOutline className="mr-2 text-gray-400" />
              <input
                id="nombre"
                type="text"
                name="user_name"
                placeholder='Nombre'
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="w-full outline-none border-none focus:border-blue-700 rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="telefono" className="mb-2 font-medium">
              
            </label>
            <div className="flex items-center border-2 border-gray-200 rounded-md p-2">
              <BsTelephoneFill className="mr-2 text-gray-400" />
              <input
                id="telefono"
                type="tel"
                name="user_phone"
                placeholder='Número de teléfono'
                value={telefono}
                onChange={(e) => setTelefono(e.target.value)}
                className="w-full outline-none border-none focus:border-blue-500 rounded-md"
              />
            </div>
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="descripcion" className="mb-2 font-medium">
              
            </label>
            <div className="flex items-center border-2 border-gray-200 rounded-md p-2">
              <MdDescription className="mr-2 text-gray-400" />
              <textarea
                id="descripcion"
                name="message"
                value={descripcion}
                placeholder='Descripción de su pedido'
                onChange={(e) => setDescripcion(e.target.value)}
                className="w-full h-24 outline-none border-none resize-none focus:border-blue-500 rounded-md"
              />
            </div>
          </div>
          <button
            type="submit"
            className="flex items-center justify-center w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition duration-300"
          >
            Enviar mensaje <RiMailSendLine className="ml-2" />
          </button>
        </form>
      </div>
    </>
  );
};
