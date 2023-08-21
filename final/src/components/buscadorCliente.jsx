import React, { useState } from 'react';
import "../tailwind.css";
import { Link } from "react-router-dom";
import Testing from "../pages/testing";

function SearchClient() {
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [clients, setClients] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3004/buscadorc?query=${query}&limit=${limit}`);
      const data = await response.json();
      setClients(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Testing></Testing>
      <div className='flex flex-col h-full min-h-screen bg-gray-300'>
        <h1 className="self-center py-5 text-2xl">Buscar clientes por nombre</h1>
        <form className="self-center py-5 bg-white px-5 rounded-2xl" onSubmit={handleSearch}>
          <label htmlFor="query">Buscar clientes: </label>
          <input type="text" className="border-solid ps-1 border-black border-2 rounded-md bg-white" id="query" value={query} onChange={(event) => setQuery(event.target.value)} />
          <br />
          <label htmlFor="limit">Mostrar: </label>
          <select id="limit" value={limit} onChange={(event) => setLimit(event.target.value)}>
            <option value="10">10</option>
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
          <br />
          <button className='w-full self-center bg-white border-solid mt-3 focus:bg-slate-400 border-black border-2' type="submit">Buscar</button>
        </form>
        {clients.length === 0 ? (
          <p className='self-center bg-white p-3 my-5 rounded-3xl'>No se encontraron clientes</p>
        ) : (
          <div className='flex flex-col mt-5'>
            {clients.map((clients) => (
              <div className="flex my-3 py-4 flex-col rounded-3xl bg-white max-w-md self-center" key={clients._id}>
                <p className='self-center'>{clients.Nombre}</p> 
                <p className='self-center'>{clients.Apellido}</p>
                <p className='self-center'>{clients.Cedula}</p>
                <p className='self-center'>{clients.Telefono}</p>
                <p className='self-center'>{clients.Correo}</p>
                <Link className='self-center' to={`/clients/${clients._id}`}>
                  <p className='self-center underline hover:text-blue-400'>Ir al cliente</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchClient;