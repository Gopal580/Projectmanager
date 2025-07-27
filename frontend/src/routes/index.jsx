import { Routes, Route, Navigate } from 'react-router-dom';
import React, { Suspense, lazy } from 'react';
import ProtectedRoute from './ProtectedRoute';

const Login = lazy(() => import('../pages/Login'));
const Register = lazy(() => import('../pages/Register'));

const DashboardPage = lazy(() => import('../pages/Dashboard/DashboardPage'));
const InvoiceRaisedPage = lazy(() => import('../pages/Projects/InvoiceRaisedPage'));
const SentToCeo = lazy(() => import('../pages/Projects/SentToCeoPage'));
const ApprovedByClient = lazy(() => import('../pages/Projects/ApprovedByClientPage'));
const NewProjects = lazy(() => import('../pages/Projects/NewProjectsPage'));
const CreateProjectPage = lazy(() => import('../pages/Projects/CreateProjectPage'));
const ProjectDetailPage = lazy(() => import('../pages/Projects/ProjectDetailsPage'));
const ForgotPassword=lazy(()=>import('../pages/Projects/ForgotPassword'));
const AppRoutes = () => {
  return (
   <Suspense fallback={<div>Loading...</div>}>
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path='/forgot-password' element={<ForgotPassword/>}/>
      {/* Protected Routes */}
      <Route path="/" element={<ProtectedRoute/>}>
      
          <Route index element={<Navigate to="/dashboard" />} />
          <Route path="dashboard" element={<DashboardPage />} />
        
       <Route path="projects">
        <Route path="invoice-raised" element={<InvoiceRaisedPage/>}/>
        <Route path="sent-to-ceo" element={<SentToCeo/>}/>
        <Route path="approved-by-client" element={<ApprovedByClient/>}/>
        <Route path='new-project' element={<NewProjects/>}/>
        <Route path='create' element={<CreateProjectPage/>}/>
        <Route path=':id' element={<ProjectDetailPage/>}/>
        </Route>
      </Route>

      {/* Redirect unknown paths */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes></Suspense>
  );
};

export default AppRoutes;
