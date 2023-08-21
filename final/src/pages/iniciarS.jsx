import axios from 'axios';
import "../tailwind.css";
import { useState } from 'react';
import Testing from './testing';

function IniciarSesion() {
    const [userData, setUserData] = useState({
        Nombre: '',
        Apellido: '',
        Usuario: '',
        Correo: '',
        Contraseña: '',
      });

      function verify() {
        if (JSON.parse(localStorage.getItem("userData"))) {
            alert("Se ha iniciado sesion");
            window.location = "/";
        }
    };
      

      const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData(prevData => ({
          ...prevData,
          [name]: value
        }));
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          await axios.post('http://localhost:3004/iniciarS', userData); 
          verify();
        } catch (error) {
            console.error(error);
        }
      };

      const session = async () => {
        try{
          await localStorage.setItem("userData", JSON.stringify(userData));
          console.log(JSON.parse(localStorage.getItem("userData")));
        } catch (error){
            console.error(error);
        }
      }

      verify();
    
        return (
            <div>
                <Testing></Testing>
                <div className='flex items-center justify-center h-screen w-screen antialiased bg-slate-200'>
                <form className='flex px-3 py-3 flex-col shadow-xl bg-white shadow-indigo-600 rounded-3xl w-1/3 h-50' onSubmit={handleSubmit}>
                    <h1 className='self-center text-2xl'>Iniciar sesión</h1>
            
                    <label htmlFor="Correo" className="mt-2" >Correo electrónico:</label>
                    <input type="email" className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" name="Correo" id="Correo" 
                    required maxLength="100" pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" value={userData.Correo} onChange={handleChange} />
            
                    <label htmlFor="Contraseña" className="mt-2">Contraseña:</label>
                    <input type="password" className="border-solid ps-1 border-black border-2 rounded-md bg-gray-300" name="Contraseña" id="Contraseña" 
                    maxLength="40" pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[*\-!.])[a-zA-Z0-9*\-!.]{8,40}$" 
                    value={userData.Contraseña} onChange={handleChange}/>
            
                    <button onClick={session} type="submit" pattern="^[a-zA-Z]*$" className="flex justify-center self-center bg-gray-400 focus:bg-indigo-300 mt-4 w-1/4 border-solid 
                    border-black border-2 rounded-md">Enviar</button>
                </form>
                </div>
            </div>
          );


}

export default IniciarSesion;