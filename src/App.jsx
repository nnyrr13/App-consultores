import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { Login } from "./pages/Login";
import { Register } from "./pages/Register";
import { Home } from "./pages/Home";
import { Header } from "./components/Header";
import { ForgotPassword } from "./pages/ForgotPassword";
import { PrivateRoute } from "./components/PrivateRoute";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { Soport } from "./pages/Soport";
import { LoginAdmin } from "./pages/LoginAdmin";
import { Administrador } from "./pages/Administrador";
import { GestionProductos } from "./pages/GestionProductos";
import { Reportes } from "./pages/Reportes";
import { PrivateRouteAdmin } from "./components/PrivateRouteAdmin";
import { browserSessionPersistence, getAuth } from "firebase/auth";
import { signInWithCustomToken } from "firebase/auth";
import { EditarProducto } from "./pages/EditarProducto";
import { EnviarPedido } from "./components/EnviarPedido";



/* Este componente define las rutas a donde se dirigira el Usuario */

function App() {

  return (
    <>
      <BrowserRouter>
        {/* <Header /> */}
        <Routes>
          <Route path="/login-admin" element={ <LoginAdmin /> }/>
          
          <Route path="/" element={ <Login /> }/>
          <Route path="/register" element={ <Register /> }/>
          <Route path="/home" element={ <PrivateRoute /> }>
            <Route path="/home" element={ <Home /> }/>
          </Route>
          <Route path="/admin" element={ <PrivateRouteAdmin /> }>
            <Route path="/admin" element={ <Administrador /> }/>
          </Route>
          <Route path="/gestion-producto" element={ <GestionProductos /> }/>
          <Route path="/reporte" element={ <Reportes /> }/>
          <Route path="/soporte" element={ <Soport /> }/>
          <Route path="/edit-producto/:productoID" element={ <EditarProducto /> }/>
          <Route path="/home/:pedidoID" element={ <EnviarPedido /> }/>


          <Route path="/recuperar-clave" element={ <ForgotPassword /> }/>

          <Route path="/*" element={ <Navigate to='/' /> }/>
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-center"
        autoClose={ 3000 }
        hideProgressBar={ false }
        newestOnTop={ false }
        closeOnClick
        rtl={ false }
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  )
}

export default App
