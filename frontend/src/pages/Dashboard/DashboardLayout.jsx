import React from 'react';
import { Outlet } from 'react-router-dom'; // Import Outlet
import DashboardSidebar from '../../components/Client/Dashboard/DashboardSidebar';

function DashboardLayout() {
  return (
    <div className="flex">
      <DashboardSidebar />
      <div className="flex-1 p-6 ">
        <Outlet /> 
      </div>
    </div>
  );
}

export default DashboardLayout;
