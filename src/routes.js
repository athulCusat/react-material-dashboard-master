import React from 'react';
import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/layouts/DashboardLayout';
import MainLayout from 'src/layouts/MainLayout';
import RootesListView from 'src/views/root/RootListView';
import CustomerListView from 'src/views/customer/CustomerListView';
import DashboardView from 'src/views/reports/DashboardView';
import LoginView from 'src/views/auth/LoginView';
import NotFoundView from 'src/views/errors/NotFoundView';
import AttractionListView from 'src/views/attractions/AttractionListView';
import RegisterView from 'src/views/auth/RegisterView';
import SettingsView from 'src/views/settings/SettingsView';
import DisruptionLstView from 'src/views/disruptions/DisruptionListView';



const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'root', element: <RootesListView/> },
      { path: 'customers', element: <CustomerListView /> },
      { path: 'disruptions', element: <DisruptionLstView /> },
      { path: 'dashboard', element: <DashboardView /> },
      { path: 'Attractions', element: <AttractionListView/> },
      { path: 'settings', element: <SettingsView /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <LoginView /> },
      { path: 'register', element: <RegisterView /> },
      { path: '404', element: <NotFoundView /> },
      { path: '/', element: <Navigate to="/app/dashboard" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
