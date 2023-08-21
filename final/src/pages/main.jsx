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

    

if (data){
    return( 
        <div className="flex">
            <Testing></Testing>
            <div className="h-full min-h-screen bg-gray-300 ml-8">   
                <div className="ml-16 grid px-4 grid-cols-1 lg:grid-cols-4 gap-10 py-8 justify-items-center">
                    {
                        data.map(
                            (elemento) => {
                                let descuento = elemento.Precio_Descuento;
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
                                };
                                return(
                                    <Link to={`/products/${elemento._id}`} className="max-h-fit">               
                                        <div className="flex flex-col rounded-3xl h-full bg-white max-w-max" key={elemento._id}>
                                            <img className="py-3 w-2/3 rounded-3xl self-center" src={elemento.Imagen} alt="La imagen no se esta mostrando" />
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
                    }
                </div>
            </div>
        </div>
    )

}};

export default Main;