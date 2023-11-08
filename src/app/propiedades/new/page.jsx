"use client"
import React from 'react'
import { useState } from 'react'
import axios from 'axios'

function PropiedadesForm() {
  const [propiedades, setPropiedades] = useState({
    barcode: "",
    name: "",
    price: "",
    description: ""
  });

  const handleChange = (e) => {
    //console.log(e.target.value, e.target.name);
    setPropiedades({
      ...propiedades,
      [e.target.name]: e.target.value
    });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(propiedades);
    const res = await axios.post('/api/propiedades', propiedades);
    if (res.status == 200) {
      location.href = "/propiedades";
    } else {
      alert("Error en el registro");
    }
  }

  return (
    <div className='m-8'>
      <h2 className="text-2xl font-extrabold text-gray-400 hover:text-gray-800">Propiedades</h2>
      <form onSubmit={handleSubmit} className='px-8 pt-6 pb-8 mb-4 rounded-md shadow-md bg-gray-50'>

        <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="nombre">
          Nombre
        </label>
        <input type="text" name="nombre" onChange={handleChange} className='bg-green-100 border border-green-300
             text-gray-900 text-xs rounded-lg block w-full p-2.5' placeholder="Input nombre" />

        <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="direccion">
          Direccion
        </label>
        <input type="text" name="direccion" onChange={handleChange} className='bg-green-100 border border-green-300
             text-gray-900 text-xs rounded-lg block w-full p-2.5' placeholder="Input direccion" />

        <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="caracteristicas">
          Caracterisiticas
        </label>
        <input type="text" name="caracteristicas" onChange={handleChange} className='bg-green-100 border border-green-300
             text-gray-900 text-xs rounded-lg block w-full p-2.5' placeholder="Input caracteristicas" />

        <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="estado">
          Estado
        </label>
        <input type="text" name="estado" onChange={handleChange} className='bg-green-100 border border-green-300
             text-gray-900 text-xs rounded-lg block w-full p-2.5' placeholder="Input estado" />

        <label className='block mb-2 text-sm font-medium text-gray-900' htmlFor="precioalquiler">
          Precio de alquiler
        </label>
        <input type="number" name="precioalquiler" onChange={handleChange} className='bg-green-100 border border-green-300
             text-gray-900 text-xs rounded-lg block w-full p-2.5' placeholder="Input precioalquiler" />

        <button className='bg-blue-500 hover:bg-blue-700 text-sm text-white 
          font-bold py-2 px-4 rounded mt-5'>
          Guardar</button>
      </form>
    </div>
  )
}

export default PropiedadesForm