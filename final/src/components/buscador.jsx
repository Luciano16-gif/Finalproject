import React, { useState } from 'react';
import "../tailwind.css";
import { Link } from "react-router-dom";
import Testing from "../pages/testing"

function Search() {
  const [query, setQuery] = useState('');
  const [limit, setLimit] = useState(10);
  const [products, setProducts] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:3004/buscador?query=${query}&limit=${limit}`);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Testing></Testing>
    <div className='flex flex-col h-full min-h-screen bg-gray-300'>
      <h1 className="self-center py-5 text-2xl">Buscar productos</h1>
      <form className="self-center py-5 bg-white px-5 rounded-2xl" onSubmit={handleSearch}>
        <label htmlFor="query">Buscar productos: </label>
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
      {products.length === 0 ? (
        <p className='self-center bg-white p-3 my-5 rounded-3xl'>No se encontraron productos</p>
      ) : (
        <div className='flex flex-col mt-5'>
          {products.map((products) => (
            <div className="flex my-3 py-4 flex-col rounded-3xl bg-white max-w-md self-center" key={products._id}>
              <img className="py-3 w-2/4 rounded-3xl self-center" src={products.Imagen} alt="La imagen no se está mostrando" />
              <p className='self-center'>{products.Nombre}</p> 
              <p className='self-center'>Precio: {products.Discounted_Price}$</p>
              <p className='self-center'>Stock: {products.Existencias}</p>
              <p className='self-center'>{`Ahorra: ${Math.trunc(products.Precio_Descuento * 100)}%`}</p>
              <Link className='self-center' to={`/products/${products._id}`}>
                <p className='self-center underline hover:text-blue-400'>Ir al producto</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
    </div>
  );
}

export default Search;