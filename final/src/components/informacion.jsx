import "../tailwind.css";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Testing from "../pages/testing"


function Show() {

  const showing = JSON.parse(localStorage.getItem("userData"));


  const navigate = useNavigate();
  const [data, setData] = useState(null);
  const { id } = useParams();
  const [clientData, setClientData] = useState({
    Nombre: "",
    Apellido: "",
    Cedula: "",
    Telefono: "",
    Correo: ""
  });
  const [cantidad, setCantidad] = useState(1);

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setClientData( prevData  => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCantidadChange = (e) => {
    setCantidad(e.target.value);
  };

const handleDelete = async (e) => {
    try{
        await axios.delete(`http://localhost:3004/producto/${id}`)
        alert("seguro que quiere borrar el producto?")
        navigate("/")
    }  catch (error) {
        console.error(error);
    }
}

  // Función para manejar la solicitud POST
  const handlePost = async (orderData) => {
    try {
      await axios.post(`http://localhost:3004/products/${id}`, {...clientData, ...orderData});
    } catch (error) {
      console.error(error);
    }
  }

  // Función para manejar la solicitud PATCH
  const handlePatch = async (reducir) => {
    try {
      await axios.patch(`http://localhost:3004/product/${id}`, reducir);
    } catch (error) {
      console.error(error);
    }
  }
 

    useEffect(() => {
        fetch(`http://localhost:3004/products/${id}`)
        .then((res) => res.json())
        .then((info) => setData(info))
        .catch((error) => {
        console.error('Error:', error);
        });
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const orderData = {
          Compras: data._id,
          cantidad,
          Costo: data.Discounted_Price * cantidad,
        };
        const reducir = {
          Existencias: data.Existencias - cantidad,
        };
        // Llamar a las funciones handlePost y handlePatch
        handlePost(orderData);
        handlePatch(reducir);

        // Recargar la página
        window.location.reload();
      }

    if (data) {
        var descuento = data.Precio_Descuento;
        if (descuento === 0.1) {
        descuento = "Ahorra: 10%";
        } else if (descuento === 0.2){
            descuento = "Ahorra: 20%"
        }else if (descuento === 0.3){
            descuento = "Ahorra: 30%"
        } else if (descuento === 0.4){
            descuento = "Ahorra: 40%"
        } else if (descuento === 0.5){
            descuento = "Ahorra: 50%"
        } else if (descuento === 0.6){
            descuento = "Ahorra: 60%"
        } else if (descuento === 0.7){
            descuento = "Ahorra: 70%"
        } else if (descuento === 0.8){
            descuento = "Ahorra: 80%"
        } else if (descuento === 0.9){
            descuento = "Ahorra: 90%"
        } else if (descuento === 1){
            descuento = "No hay descuento"
        } else {
            descuento = "Gratis"
        };
        return (
        <div>
            <Testing></Testing>
        <div className="h-full ml-8 min-h-screen bg-gray-200 overflow-hidden">
        { showing && (
            <div className="flex p-3 place-content-evenly">
                <Link to={`/actp/${data._id}`}>
                    <p className="bg-yellow-500 text-white font-bold p-2 rounded-2xl hover:bg-yellow-700">Actualizar producto</p>
                </Link>
                <Link to={"/makeP"}>
                    <p className="bg-green-500 text-white font-bold p-2 rounded-2xl hover:bg-green-700">Crear un Producto</p>
                </Link>
                <button onClick={handleDelete} className="bg-red-500 text-white font-bold p-2 rounded-2xl hover:bg-red-700">Borrar producto</button>
            </div>
            )}
            <div className="grid ps-5 grid-cols-1 lg:grid-cols-3 h-full min-h-screen bg-gray-300 gap-12 py-4 pr-5">
                <div className="flex items-center h-full">
                    <img className="py-3 ml-10 w-full rounded-3xl self-center" src={data.Imagen} alt="La imagen no se esta mostrando" />
                </div>

                <div className="flex flex-col ml-5 bg-white h-2/4 justify-center self-center rounded-3xl text-3xl">
                    <div className="ps-4">
                        <p className="font-bold">{data.Nombre}</p>
                        <p className="text-2xl">Producto: {data.Tipo_Producto}</p>
                        <p className="text-2xl">En stock: {data.Existencias}</p>
                        <p className="font-bold mt-10">${data.Discounted_Price}</p>
                        <p className="mt-2 text-xl">{descuento}</p>
                    </div>
                </div>

                <div className="flex flex-col bg-white h-6/7 justify-center self-center rounded-3xl text-3xl">
                    <div className="ps-4">
                        <form onSubmit={handleSubmit} className="mt-4 text-sm">
                            <label className="block text-gray-700 font-bold mb-2">
                                Cantidad
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="number"
                                min="1"
                                value={cantidad}
                                onChange={handleCantidadChange}
                                required
                            />
                            <label className="block text-gray-700 font-bold mt-4 mb-2">
                                Nombre
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="Nombre"
                                value={clientData.Nombre}
                                onChange={handleChange}
                                required
                            />
                            <label className="block text-gray-700 font-bold mt-4 mb-2">
                                Apellido
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="Apellido"
                                value={clientData.Apellido}
                                onChange={handleChange}
                                required
                            />
                            <label className="block text-gray-700 font-bold mt-4 mb-2">
                                Cédula
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="Cedula"
                                value={clientData.Cedula}
                                onChange={handleChange}
                                required
                                
                            />
                            <label className="block text-gray-700 font-bold mt-4 mb-2">
                                Teléfono
                            </label>
                            <input
                                className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                type="tel"
                                name="Telefono"
                                value={clientData.Telefono}
                                onChange={handleChange}
                                required
                                pattern="^[0-9+\s]+$"
                            />
                            <label className="block text-gray-700 font-bold mt-4 mb-2">
                                Correo electrónico
                            </label>
                            <input
                            className="shadow appearance-none border rounded w-5/6 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            type="email"
                            name="Correo"
                            value={clientData.Correo}
                            onChange={handleChange}
                            required
                            pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$"
                            />
                            <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline">
                            Comprar
                            </button>
                        </form>
                    </div>
                </div>      
            </div>
        </div>
        </div>    
    )
    } else {
        return <p>Cargando información...</p>
    }
  }

export default Show;