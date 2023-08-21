import { useEffect, useState } from "react";
import "../index.css"
import { Link } from "react-router-dom";
import Testing from "./testing"

function Clients() {
    const [ data, setData ] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3004/clients")
        .then((res) => res.json())
        .then((informacion) => setData(informacion))
        .catch((error) => {
        console.error('Error:', error);
        });
    }, []);

    if (data){
        console.log(data);
    }

if (data){
    return(
        <div>
            <Testing></Testing>
            <div className="grid ml-6 px-4 grid-cols-1 lg:grid-cols-4 h-full min-h-screen bg-gray-300 gap-10 py-8 justify-items-center">
                {
                    data.map(
                        (elemento) => {
                            return(
                                <Link to={`/clients/${elemento._id}`}>               
                                    <div className="flex flex-col rounded-3xl bg-white p-3 ml-5" key={elemento._id}>
                                        <p className=""><span className="font-bold">Nombre:</span> {elemento.Nombre}</p>
                                        <p className=""><span className="font-bold">Apellido:</span> {elemento.Apellido}</p>
                                        <p><span className="font-bold">Cédula:</span> {elemento.Cedula}</p>
                                        <p><span className="font-bold">Teléfono:</span> {elemento.Telefono}</p>
                                        <p><span className="font-bold">Correo:</span> {elemento.Correo}</p>
                                    </div>
                                </Link>
                            )
                        }
                    )
                }
            </div>
        </div>
    )

}};
export default Clients;