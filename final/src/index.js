import React from 'react';
import ReactDOM from 'react-dom/client';
import Signup from './components/signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Main from './pages/main';
import Show from './components/informacion';
import Search from './components/buscador';
import UpdateP from './components/actualizar';
import MakeP from './components/makeP';
import Clients from './pages/clientes';
import OneClient from './components/oneClient';
import SearchClient from './components/buscadorCliente';
import UpdateC from './components/actuaCliente';
import MakeC from './components/makeC';
import Compras from './pages/compras';
import OneCompra from './components/oneCompra';
import SearchCompra from './components/buscadorcompra';
import UpdateCompra from './components/actuaCompra';
import MakeCompra from './components/makeCompra';
//import Testing from './pages/testing';
import IniciarSesion from './pages/iniciarS';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />}  />
        <Route path="/signup" element={<Signup />}  />
        <Route path="/products/:id" element={<Show />}  />
        <Route path="/buscador" element={<Search />}  />
        <Route path="/actp/:id" element={<UpdateP />}  />
        <Route path="/makeP" element={<MakeP />}  />
        <Route path="/clients" element={<Clients />}  />
        <Route path="/clients/:id" element={<OneClient />}  />
        <Route path="/buscadorClientes" element={<SearchClient />}  />
        <Route path="/actc/:id" element={<UpdateC />}  />
        <Route path="/makec" element={<MakeC />}  />
        <Route path="/compras" element={<Compras />}  />
        <Route path="/compras/:id" element={<OneCompra />}  />
        <Route path="/buscadorCompras" element={<SearchCompra />}  />
        <Route path="/actcompra/:id" element={<UpdateCompra />}  />
        <Route path="/makecompra" element={<MakeCompra />}  />
        {/*<Route path="/testing" element={<Testing />}  />*/}
        <Route path="/iniciarS" element={<IniciarSesion />}  />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);