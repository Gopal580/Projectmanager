import  Layout  from '../Components/layout/Layout';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const {loading,user}=useAuth();
  if(loading){
    return <div>Loading</div>
  }
  if(!user){
   return <Navigate to={'/login'} replace/>
  }
  return (
  <Layout>
      <Outlet />
  </Layout>


    ); // Just renders children without checking anything
};

export default ProtectedRoute;
