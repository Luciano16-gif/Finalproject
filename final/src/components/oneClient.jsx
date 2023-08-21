import { useEffect, useState } from "react";
import "../index.css"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Testing from "../pages/testing";

function OneClient() {

    const { id } = useParams();
    const [data, setData] = useState(null);

    const showing = JSON.parse(localStorage.getItem("userData"));

    const handleDelete = async (e) => {
        try{
            await axios.delete(`http://localhost:3004/client/${id}`)
            alert("seguro que quiere borrar el cliente?")
            window.location = "/clients"
        }  catch (error) {
            console.error(error);
        }
    }

    
    
    useEffect(() => {
        fetch(`http://localhost:3004/clients/${id}`)
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
                { showing && (
                <div className="flex p-3 place-content-evenly bg-slate-200">
                    <Link to={`/actc/${data._id}`}>
                        <p className="bg-yellow-500 text-white font-bold p-2 rounded-2xl hover:bg-yellow-700">Actualizar cliente</p>
                    </Link>
                    <Link to={"/makec"}>
                        <p className="bg-green-500 text-white font-bold p-2 rounded-2xl hover:bg-green-700">Crear cliente</p>
                    </Link>
                    <button onClick={handleDelete} className="bg-red-500 text-white font-bold p-2 rounded-2xl hover:bg-red-700">Borrar cliente
                    </button>
                </div>)}
                <div className="flex flex-col bg-slate-300 h-full min-h-screen justify-center items-center text-3xl">
                    <div className="ps-4">
                        <p className="font-bold">Nombre: <span className="font-normal">  {data.Nombre}</span></p>
                        <p className="font-bold">Apellido: <span className="font-normal"> {data.Apellido}</span> </p>
                        <p className="font-bold">Cédula: <span className="font-normal"> {data.Cedula}</span> </p>
                        <p className="font-bold">Teléfono: <span className="font-normal"> {data.Telefono}</span> </p>
                        <p className="font-bold">Correo: <span className="font-normal"> {data.Correo}</span> </p>
                    </div>
                </div>
            </div>
    )};
    if (!data) {
        return(
            <div className="flex h-screen justify-center items-center"><h1 className="font-bold self-center text-3xl">Cargando información..., si no carga en los proximos segundos es posible que el cliente ya no exista</h1></div>
            
        )
        
    }
}

export default OneClient;