import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom'; //  import router
import App from './App'; // App contains your AppRoutes
import './index.css';
import { AuthProvider } from './contexts/AuthContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <BrowserRouter> {/* Wrap App with BrowserRouter */}
        <AuthProvider>
            <App/>
        </AuthProvider>
    </BrowserRouter>
    //* </React.StrictMode>  */}
);
