import React, { useState } from 'react';
import "../tailwind.css";
import { Link } from "react-router-dom";
import Testing from "../pages/testing";

function SearchCompra() {
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [compras, setCompras] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3004/buscadorcompras?query=${query}&limit=${limit}`);
      const data = await response.json();
      setCompras(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Testing></Testing>
      <div className='flex flex-col h-full min-h-screen bg-gray-300'>
        <h1 className="self-center py-5 text-2xl">Buscar compras por nombre del cliente</h1>
        <form className="self-center py-5 bg-white px-5 rounded-2xl" onSubmit={handleSearch}>
          <label htmlFor="query">Buscar compras: </label>
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
        {compras.length === 0 ? (
          <p className='self-center bg-white p-3 my-5 rounded-3xl'>No se encontraron compras</p>
        ) : (
          <div className='flex flex-col mt-5'>
            {compras.map((compras) => (
              <div className="flex my-3 py-4 flex-col rounded-3xl bg-white max-w-md self-center" key={compras._id}>
                <p className='self-center'>Id: {compras._id}</p> 
                <p className='self-center'>Id del cliente: {compras.Id_Client}</p>
                <p className='self-center'>Id del producto: {compras.Compras}</p>
                <p className='self-center'>Costo: {compras.Costo}</p>
                <p className='self-center'>IVA: {compras.IVA}</p>
                <Link className='self-center' to={`/compras/${compras._id}`}>
                  <p className='self-center underline hover:text-blue-400'>Ir a la compra</p>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchCompra;