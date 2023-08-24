import axios from 'axios';
import "../tailwind.css";
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Testing from "../pages/testing";

function UpdateP() {
    const [data, setData] = useState(null);
    const { id } = useParams();
    const [productData, setProductData] = useState({
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

         //Crear un objeto con sólo los campos que han cambiado
        const updatedFields = {};
        for (const [key, value] of Object.entries(productData)) {
          if (value !== '') {
            updatedFields[key] = value;
          };
        };
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setProductData((prevData) => ({ ...prevData, [name]: value }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData();
      if (e.target.Imagen.files[0]) {
        formData.append('Imagen', e.target.Imagen.files[0]);
      }
      for (const [key, value] of Object.entries(updatedFields)) {
        formData.append(key, value);
      }
      try {
        await axios.patch(`http://localhost:3004/actp/${id}`, formData);
        window.location = `/products/${id}`;
      } catch (error) {
        console.error(error);
      }
    };
  
    useEffect(() => {
        fetch(`http://localhost:3004/products/${id}`)
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
            <h1 className='self-center text-2xl'>Actualizar producto</h1>

            <label htmlFor="Imagen">Imagen (jpeg o png)</label>
            <input type="file" className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" name="Imagen" id="Imagen" 
            accept="image/jpeg, image/png" onChange={handleChange} />

            <label className='mt-2' htmlFor="Nombre">Nombre:</label>
            <input className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" type="text" value={productData.Nombre} name="Nombre" placeholder={data.Nombre} onChange={handleChange} />
          
            <label className='mt-2' htmlFor="Precio">Precio:</label>
            <input className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" type="number" value={productData.Precio} name="Precio" placeholder={data.Precio} onChange={handleChange} />
          
            <label className='mt-2' htmlFor="Precio_Descuento">Precio_Descuento:</label>
            <input className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" type="number" value={productData.Precio_Descuento} name="Precio_Descuento" placeholder={data.Precio_Descuento === 1 ? "No hay descuento" : `${Math.round(data.Precio_Descuento * 100)}%`} onChange={handleChange} />
          
            <label className='mt-2' htmlFor="Tipo_producto">Tipo_producto:</label>
            <select onChange={handleChange} name="Tipo_Producto" placeholder={data.Tipo_Producto} className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" value={productData.Tipo_Producto} id="Tipo_Producto">
                <option value="Físico">Físico</option>
                <option value="Digital">Digital</option>
            </select>
            <label className='mt-2' htmlFor="Existencias">Existencias:</label>
            <input className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" type="number" value={productData.Existencias} name="Existencias" placeholder={data.Existencias} onChange={handleChange} />
          <button className="flex justify-center self-center bg-gray-400 focus:bg-indigo-300 mt-4 w-2/6 border-solid 
                border-black border-2 rounded-md" type="submit">Update Product</button>
        </form>
        </div>
      </div>
    );
  }};

export default UpdateP;