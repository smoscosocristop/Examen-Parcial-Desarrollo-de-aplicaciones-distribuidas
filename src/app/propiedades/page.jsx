"use client";
import { useState, useEffect } from 'react';
import axios from 'axios';

async function loadPropiedades() {
  try {
    const response = await axios.get('/api/propiedades');
    return response.data;
  } catch (error) {
    console.error('Error loading propiedades:', error);
    return [];
  }
}

function PropiedadList() {
  const [propiedades, setPropiedades] = useState([]);

  useEffect(() => {
    const fetchPropiedades = async () => {
      const propiedadesData = await loadPropiedades();
      setPropiedades(propiedadesData);
    };
    fetchPropiedades();
  }, []);
  const deletePropiedad = async (propiedadId) => {
    try {
      if (confirm('Are you sure you want to delete this propiedad?')) {
        const res = await axios.delete(`/api/propiedades/${propiedadId}`);
        if (res.status === 204) {
          // Update the propiedades state after successful deletion
          setPropiedades((prevPropiedades) =>
            prevPropiedades.filter((propiedad) => propiedad.id !== propiedadId)
          );
        }
      }
    } catch (error) {
      console.error('Error deleting propiedad:', error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-extrabold dark:text-black m-8 flex justify-between">
        Propiedades
        <a href="/propiedades/new" className="bg-blue-500 hover:bg-blue-700 text-sm text-white font-bold py-2 px-4 rounded mt-5 ml-auto">
          Nueva propiedad
        </a>
      </h2>

      <div className='shadow-md rounded-md px-8 pt-6 pb-8 mb-4'>
        <table className='min-w-full text-left text-sm font-light'>
          <thead>
            <tr className='border-b font-medium bg-gray-300'>
              <th>Options</th>
              <th>ID</th>
              <th>Nombre</th>
              <th>Direccion</th>
              <th>Caracteristicas</th>
              <th>Estado</th>
              <th>Precio Alquiler</th>
            </tr>
          </thead>
          <tbody>
            {propiedades.map((propiedad, index) => {
              return (
                <tr key={index} className="border-b hover:bg-gray-100">
                  <td className="whitespace-nowrap px-6 py-4"> <button
                    className="text-white bg-red-500 hover:bg-red-700 py-2 px-3 rounded"
                    onClick={() => deletePropiedad(propiedad.id)}
                  >
                    Delete
                  </button> </td>
                  <td className="whitespace-nowrap px-6 py-4" style={{ color: 'black' }}>{propiedad.id}</td>
                  <td className="whitespace-nowrap px-6 py-4" style={{ color: 'black' }}>{propiedad.nombre}</td>
                  <td className="whitespace-nowrap px-6 py-4" style={{ color: 'black' }}>{propiedad.direccion}</td>
                  <td className="whitespace-nowrap px-6 py-4" style={{ color: 'black' }}>{propiedad.caracteristicas}</td>
                  <td className="whitespace-nowrap px-6 py-4" style={{ color: 'black' }}>{propiedad.estado}</td>
                  <td className="whitespace-nowrap px-6 py-4" style={{ color: 'black' }}>{propiedad.precioalquiler}</td>

                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default PropiedadList