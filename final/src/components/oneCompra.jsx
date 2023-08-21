import { useEffect, useState } from "react";
import "../index.css"
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from 'axios';
import Testing from "../pages/testing";

function OneCompra() {

    const { id } = useParams();
    const [data, setData] = useState(null);

    const showing = JSON.parse(localStorage.getItem("userData"));

    const handleDelete = async (e) => {
        try{
            await axios.delete(`http://localhost:3004/compra/${id}`)
            alert("seguro que quiere borrar la compra?")
            window.location = "/compras"
        }  catch (error) {
            console.error(error);
        }
    }

    
    
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
                { showing && (
                <div className="flex p-3 place-content-evenly bg-slate-200">
                    <Link to={`/actcompra/${data._id}`}>
                        <p className="bg-yellow-500 text-white font-bold p-2 rounded-2xl hover:bg-yellow-700">Actualizar compra</p>
                    </Link>
                    <Link to={"/makecompra"}>
                        <p className="bg-green-500 text-white font-bold p-2 rounded-2xl hover:bg-green-700">Crear compra</p>
                    </Link>
                    <button onClick={handleDelete} className="bg-red-500 text-white font-bold p-2 rounded-2xl hover:bg-red-700">Borrar compra
                    </button>
                </div>)}
                <div className="flex flex-col bg-slate-300 h-full min-h-screen justify-center items-center text-3xl">
                    <div className="ps-4">
                        <p className="font-bold">_id: <span className="font-normal">{data._id}</span> </p>
                        <Link to={`/clients/${data.Id_Client}`}>
                            <p className="font-bold">Id_Client: <span className="font-normal underline hover:text-blue-500">{data.Id_Client}</span></p>
                        </Link>
                        <Link to={`/products/${data.Compras}`}>
                            <p className="font-bold">Producto: <span className="font-normal underline hover:text-blue-500">{data.Compras}</span></p>
                        </Link>
                        
                        <p className="font-bold">Costo: <span className="font-normal">{data.Costo}</span></p>
                        <p className="font-bold">IVA: <span className="font-normal">{data.IVA}</span></p>
                    </div>
                </div>
            </div>
    )};
}

export default OneCompra;