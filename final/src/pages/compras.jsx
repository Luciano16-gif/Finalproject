import { useEffect, useState } from "react";
import "../index.css"
import { Link } from "react-router-dom";
import Testing from "./testing"

function Compras() {
    const [ data, setData ] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3004/compras")
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
            <div className="grid ml-16 px-4 grid-cols-1 lg:grid-cols-4 h-full min-h-screen bg-gray-300 gap-10 py-8 justify-items-center">
                {
                    data.map(
                        (elemento) => {
                            return(
                                <Link to={`/compras/${elemento._id}`}>               
                                    <div className="flex flex-col rounded-3xl bg-white p-3" key={elemento._id}>
                                        <p className=""><span className="font-bold">Id:</span> {elemento._id}</p>
                                        <p className=""><span className="font-bold">Cliente:</span> {elemento.Id_Client}</p>
                                        <p><span className="font-bold">Compras:</span> {elemento.Compras}</p>
                                        <p><span className="font-bold">Costo:</span> {elemento.Costo}</p>
                                        <p><span className="font-bold">IVA:</span> {elemento.IVA}</p>
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
export default Compras;