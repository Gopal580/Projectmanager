

import './App.css'
import Login from './pages/Login'
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Register from './pages/Register'
import AppRoutes from './routes';
import { ToastContainer } from 'react-toastify'; //  import
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>

   <AppRoutes/>
    <ToastContainer 
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
   
  )
}

export default App
