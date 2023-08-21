import axios from 'axios';
import "../tailwind.css";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Testing from "../pages/testing";

function UpdateCompra() {
    const [data, setData] = useState(null);
    const { id } = useParams();
    const [compraData, setCompraData] = useState({
        Id_Client: "",
        Compras: "",
        Costo: "",
        IVA: "",
    });
  
    const showing = JSON.parse(localStorage.getItem("userData"));


    function verify() {
      if (!showing) {
        window.location = "/signup";
        alert("Para acceder se requiere haber iniciado sesión");
      }};
    
      verify();

    // Crear un objeto con sólo los campos que han cambiado
    const updatedFields = {};
    for (const [key, value] of Object.entries(compraData)) {
      if (value !== '') {
        updatedFields[key] = value;
      }
    }

    const handleChange = (event) => {
      const { name, value } = event.target;
      setCompraData((prevData) => ({ 
        ...prevData, 
        [name]: value }));
    };
  
    const handleSubmit = async (event) => {
      event.preventDefault();
      try {
        await axios.patch(`http://localhost:3004/actcompras/${id}`, updatedFields);
        window.location = `/compras/${id}`
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
        fetch(`http://localhost:3004/compras/${id}`)
        .then((res) => res.json())
        .then((info) => setData(info))
        .catch((error) => {
        console.error('Error:', error);
        });
    }, [id]);

if (data) {
    return (
      <div>
        <Testing></Testing>
        <div className='flex items-center justify-center h-full min-h-screen w-screen antialiased bg-slate-200'>
            <form className='flex px-3 py-3 flex-col shadow-xl bg-white shadow-indigo-600 rounded-3xl w-1/3 h-50' onSubmit={handleSubmit}>
                <h1 className='self-center text-2xl'>Actualizar cliente</h1>

                <label className='mt-2' htmlFor="Id_Client">Id_Client:</label>
                <input className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" type="text" value={compraData.Id_Client} name="Id_Client" placeholder={data.Id_Client} onChange={handleChange} />

                <label className='mt-2' htmlFor="Compras">Compras:</label>
                <input className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" type="text" value={compraData.Compras} name="Compras" placeholder={data.Compras} onChange={handleChange} />

                <label className='mt-2' htmlFor="Costo">Costo:</label>
                <input className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" type="number" value={compraData.Costo} name="Costo" placeholder={data.Costo} onChange={handleChange} />

                <label className='mt-2' htmlFor="IVA">IVA:</label>
                <input className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" type="text" value={compraData.IVA} name="IVA" placeholder={data.IVA} onChange={handleChange} />

                <button className="flex justify-center self-center bg-gray-400 focus:bg-indigo-300 mt-4 w-2/6 border-solid 
              border-black border-2 rounded-md" type="submit">Actualizar cliente</button>
            </form>
        </div>
      </div>
    );
  }};

export default UpdateCompra;