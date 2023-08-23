import { useState } from 'react';
import axios from 'axios';
import "../tailwind.css";
//import { Navigate } from 'react-router-dom';
import Testing from "../pages/testing";

function MakeP() {
    const [productData, setProductData] = useState({
    Imagen: "",
    Nombre: "",
    Precio: "",
    Precio_Descuento: "",
    Tipo_Producto: "",
    Existencias: ""
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
    setProductData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    window.location = "/";
    e.preventDefault();
    const formData = new FormData();
      formData.append('Imagen', e.target.Imagen.files[0]);
      formData.append('Nombre', productData.Nombre);
      formData.append('Precio', productData.Precio);
      formData.append('Precio_Descuento', productData.Precio_Descuento);
      formData.append('Tipo_Producto', productData.Tipo_Producto);
      formData.append('Existencias', productData.Existencias);
    try {
        await axios.post('http://localhost:3004/makeP', formData);
    } catch (error) {
        console.error(error);
    }
  };


  return (
    <div>
      <Testing></Testing>
        <div className='flex items-center justify-center h-full min-h-screen w-screen antialiased bg-slate-200'>
            <form className='flex px-3 py-3 flex-col shadow-xl bg-white shadow-indigo-600 rounded-3xl w-1/3 h-50' onSubmit={handleSubmit}>
                <h1 className='self-center text-2xl'>Crear Producto</h1>
                
                <label htmlFor="Imagen">Imagen (jpeg o png)</label>
                <input type="file" className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" name="Imagen" id="Imagen" 
                accept="image/jpeg, image/png" onChange={handleChange} />

                {/*<label htmlFor="Imagen">Imagen (url)</label>
                <input type="url" className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" name="Imagen" id="Imagen" 
                onChange={handleChange} />*/}

                <label className='mt-2' htmlFor="Nombre">Nombre:</label>
                <input type="text" className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" name="Nombre" id="Nombre" 
                required ="^[a-zA-Z\s]*$" value={productData.Nombre} onChange={handleChange}/>

                <label htmlFor="Precio" className="mt-2">Precio:</label>
                <input type="number" className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" name="Precio" id="Precio" 
                required value={productData.Precio} onChange={handleChange} />

                <label htmlFor="Precio_Descuento" className="mt-2">Descuento</label>
                <input type="number" className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" name="Precio_Descuento" id="Precio_Descuento" 
                value={productData.Precio_Descuento} onChange={handleChange}/>

                <label className="mt-2" htmlFor="Tipo_Producto">Tipo de producto</label>
                <select onChange={handleChange} name="Tipo_Producto" className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" value={productData.Tipo_Producto} id="Tipo_Producto">
                    <option value="Físico">Físico</option>
                    <option value="Digital">Digital</option>
                </select>

                <label htmlFor="Existencias" className="mt-2">Existencias:</label>
                <input type="number" className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" name="Existencias" id="Existencias" 
                value={productData.Existencias} onChange={handleChange}/>

                <button type="submit" pattern="^[a-zA-Z]*$" className="flex justify-center self-center bg-gray-400 focus:bg-indigo-300 mt-4 w-1/4 border-solid 
              border-black border-2 rounded-md">Enviar</button>
            </form>
        </div>
    </div>
  )
};

export default MakeP;