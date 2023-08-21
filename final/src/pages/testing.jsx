import "../tailwind.css";
import { useState } from "react";
import control from "../assets/control.png"
import { Link } from "react-router-dom";


function Testing () {
  const showing = JSON.parse(localStorage.getItem("userData"));
    const [open, setOpen] = useState(false);

function closeSession() {
  localStorage.removeItem("userData");
  window.location.reload();
}

    return(
            <div className="">
    <div className="fixed">
        <div
          className={` ${
            open ? "w-56" : ""
          } bg-slate-500 h-screen p-5  pt-8 relative duration-300 `}
          style={{ width: open ? undefined : '85px' }}
        >
          <img
            src={control}
            className={`absolute cursor-pointer -right-6 top-9 w-7 border-dark-purple
             border-2 rounded-full  ${!open && "rotate-180"}`}
            onClick={() => setOpen(!open)} alt="no se esta mostrando"
          />
          <div className="flex gap-x-4 items-start text-white font-medium">
            <h1 className={`cursor-pointer duration-500 ${
                open && "rotate-[360deg]"
              }`}>Sidebar</h1>
            <h1
              className={`text-white origin-left font-medium text-xl duration-200 ${
                !open && "scale-0"
              }`}
            >
              Menu
            </h1>
          </div>
          <div>
            <ul className="pt-6 flex">
              <li className='flex rounded-md p-2 cursor-pointer text-white hover:bg-slate-400 font-medium 
              text-sm items-center gap-x-4'>
                <span className={`${!open && "hidden"} origin-left duration-200`}>
                  { !showing ? (
                      <Link to={"/signup"}>Registrarse</Link>
                  ) : (
                    <span onClick={closeSession}>Cerrar sesión</span>
                  )}
                </span>
              </li>
            </ul>
            {!showing && (
            <div className="pt-6 flex group">
              <div className='flex rounded-md p-2 text-white hover:bg-slate-400 font-medium text-sm 
                items-center gap-x-4 cursor-pointer'>
                  <Link to={"/iniciarS"}>
                    <span className={`${!open && "hidden"} origin-left duration-200`}>
                      Iniciar sesión
                    </span>
                  </Link> 
              </div>
            </div>)}
            <div className="pt-6 flex group">
              <div className='flex rounded-md p-2 text-white hover:bg-slate-400 font-medium text-sm 
              items-center gap-x-4 cursor-pointer'>
                <Link to={"/"}>
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    Productos
                  </span>
                </Link> 
              </div>
              <div className="hidden ml-2 bg-gray-800 p-2 rounded-md text-white font-medium text-sm items-center gap-x-4 
              group-hover:flex hover:bg-slate-700 border-2 border-gray-600">
                <ul>
                  <li>
                    <Link to={"/buscador"}><p>Buscador de productos</p></Link>
                  </li>
                </ul>
              </div>
            </div>


            <div className="pt-6 flex group">
              <div className='flex rounded-md p-2 text-white hover:bg-slate-400 font-medium text-sm items-center gap-x-4 cursor-pointer'>
                <Link to={"clients"}>
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    Clientes
                  </span>
                </Link>
              </div>
              <div className="hidden ml-2 bg-slate-800 p-2 rounded-md text-white font-medium text-sm items-center 
              gap-x-4 group-hover:flex border-2 border-gray-600">
                <ul>
                  <li className="hover:bg-slate-700 rounded">
                    <Link to={"/buscadorClientes"}><p>Buscador de clientes</p></Link>
                  </li>
                  { showing && (
                  <li className="hover:bg-slate-700 rounded">
                    Crear un cliente
                  </li>
                  )}
                </ul>
              </div>
            </div>


            <div className="pt-6 flex group">
              <div className='flex rounded-md p-2 text-white hover:bg-slate-400 font-medium text-sm items-center 
              gap-x-4 cursor-pointer'>
                <Link to={"compras"}>
                  <span className={`${!open && "hidden"} origin-left duration-200`}>
                    Compras
                  </span>
                </Link>
              </div>
              <div className="hidden ml-2 bg-slate-800 p-2 rounded-md text-white font-medium text-sm items-center 
              gap-x-4 group-hover:flex border-2 border-gray-600">
                <ul>
                  <Link to={"/buscadorCompras"}>
                    <li className="hover:bg-slate-700 rounded">
                      <p>Buscador de compras</p>
                    </li>
                  </Link>
                  { showing && (
                  <Link to={"makec"}>
                    <li className="hover:bg-slate-700 rounded">
                      Crear una compra
                    </li>
                  </Link>
                  
                  )}
                </ul>
              </div>
              
            </div>
          </div>
        </div>
        </div>
        </div>
        )
    };

export default Testing;