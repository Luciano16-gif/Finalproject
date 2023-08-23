import { useEffect, useState } from "react";
import "../index.css"
import { Link } from "react-router-dom";
import Testing from "./testing";
//import { Testing } from './testing';

function Main() {

    const [ data, setData ] = useState(null);

    useEffect(() => {
        fetch("http://localhost:3004/products")
        .then((res) => res.json())
        .then((informacion) => setData(informacion))
        .catch((error) => {
        console.error('Error:', error);
        });
    }, []);


    


    return( 
        <div className="flex">
            <Testing></Testing>
            <div className="h-full min-h-screen bg-gray-300 ml-8 w-screen">   
                <div className="ml-16 grid px-4 grid-cols-1 lg:grid-cols-4 gap-10 py-8">
                    { data && (
                        data.map(
                            (elemento) => {
                                const descuento = `Ahorra: ${Math.round(elemento.Precio_Descuento * 100)}%`;
                                return(
                                    <Link to={`/products/${elemento._id}`} className="">               
                                        <div className="flex flex-col rounded-3xl bg-white" key={elemento._id}>
                                            <img className="py-3 aspect-16/9 w-2/3 h-36 rounded-3xl self-center" src={`http://localhost:3004/image/${elemento._id}`} alt="La imagen no se esta mostrando" />
                                                <div className="content-center items-center">
                                                    <p className="ps-7">{elemento.Nombre}</p>
                                                    <p className="ps-7 pt-3 pb-2 font-bold text-xl">${elemento.Discounted_Price}</p>
                                                    <p className="ps-7 text-white"><span className="px-1 rounded-md bg-orange-500">{descuento}</span></p>
                                                </div>
                                        </div>
                                    </Link>
                                )
                            }
                        )
                    )}
                </div>
            </div>
        </div>
    )

};

export default Main;