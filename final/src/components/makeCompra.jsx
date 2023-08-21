import { useState } from 'react';
import axios from 'axios';
import "../tailwind.css";
import Testing from "../pages/testing";

function MakeCompra() {
    const [compraData, setCompraData] = useState({
        Id_Client: "",
        Compras: "",
        Costo: "",
    });

    const showing = JSON.parse(localStorage.getItem("userData"));


    function verify() {
      if (!showing) {
        window.location = "/signup";
        alert("Para acceder se requiere haber iniciado sesión");
      }};
    
      verify();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCompraData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.location = "/compras";
    try {
        await axios.post('http://localhost:3004/makecompra', compraData);
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div>
      <Testing></Testing>
        <div className='flex items-center justify-center h-full min-h-screen w-screen antialiased bg-slate-200'>
            <form className='flex px-3 py-3 flex-col shadow-xl bg-white shadow-indigo-600 rounded-3xl w-1/3 h-50' onSubmit={handleSubmit}>
                <h1 className='self-center text-2xl'>Crear Compra</h1>

                <label className='mt-2' htmlFor="Id_Client">Id_Client:</label>
                <input type="text" className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" name="Id_Client" id="Id_Client" 
                required value={compraData.Id_Client} onChange={handleChange}/>

                <label htmlFor="Compras" className="mt-2">Compras:</label>
                <input type="text" className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" name="Compras" id="Compras" 
                required value={compraData.Compras} onChange={handleChange} />

                <label htmlFor="Costo" className="mt-2">Costo:</label>
                <input type="number" className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" name="Costo" id="Costo" 
                value={compraData.Costo} onChange={handleChange}/>

                <button type="submit" pattern="^[a-zA-Z]*$" className="flex justify-center self-center bg-gray-400 focus:bg-indigo-300 mt-4 w-1/4 border-solid 
              border-black border-2 rounded-md">Enviar</button>
            </form>
        </div>
    </div>
  )
};

export default MakeCompra;