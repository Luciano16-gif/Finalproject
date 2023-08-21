import { useState } from 'react';
import axios from 'axios';
import "../tailwind.css";
import Testing from "../pages/testing";

function MakeC() {
    const [clientData, setClientData] = useState({
        Nombre: "",
        Apellido: "",
        Cedula: "",
        Telefono: "",
        Correo: "",
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
    setClientData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    window.location = "/clients";
    try {
        await axios.post('http://localhost:3004/makeC', clientData);
    } catch (error) {
        console.error(error);
    }
  };

  return (
    <div>
      <Testing></Testing>
        <div className='flex items-center justify-center h-full min-h-screen w-screen antialiased bg-slate-200'>
            <form className='flex px-3 py-3 flex-col shadow-xl bg-white shadow-indigo-600 rounded-3xl w-1/3 h-50' onSubmit={handleSubmit}>
                <h1 className='self-center text-2xl'>Crear Cliente</h1>

                <label className='mt-2' htmlFor="Nombre">Nombre:</label>
                <input type="text" className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" name="Nombre" id="Nombre" 
                required value={clientData.Nombre} onChange={handleChange}/>

                <label htmlFor="Apellido" className="mt-2">Apellido:</label>
                <input type="text" className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" name="Apellido" id="Apellido" 
                required value={clientData.Apellido} onChange={handleChange} />

                <label htmlFor="Cedula" className="mt-2">Cedula:</label>
                <input type="number" className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" name="Cedula" id="Cedula" 
                value={clientData.Cedula} onChange={handleChange}/>

                <label htmlFor="Telefono" className="mt-2">Telefono:</label>
                <input type="text" className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" name="Telefono" id="Telefono" 
                value={clientData.Telefono} onChange={handleChange}/>

                <label htmlFor="Correo" className="mt-2">Correo:</label>
                <input type="email" className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" name="Correo" id="Correo" 
                value={clientData.Correo} onChange={handleChange}/>

                <button type="submit" pattern="^[a-zA-Z]*$" className="flex justify-center self-center bg-gray-400 focus:bg-indigo-300 mt-4 w-1/4 border-solid 
              border-black border-2 rounded-md">Enviar</button>
            </form>
        </div>
    </div>
  )
};

export default MakeC;