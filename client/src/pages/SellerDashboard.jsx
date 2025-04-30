import React from 'react'
import DashboardSidebar from '../components/DashboardSidebar.jsx'
import PhotoManagement from '../components/seller/PhotoManagement.jsx'
import Analytics from '../components/Analytics.jsx'
import Orders from '../components/Orders.jsx'
import { useSelector } from 'react-redux'

const SellerDashboard = () => {
  const tab = useSelector((state) => state.nav.tab)
  return (
    <div className='flex flex-col sm:flex-row'>
      <DashboardSidebar />
      <div>{
        (() => {
          switch( tab ) {
            case "photos-management":
              return <PhotoManagement />;
            case "analytics":
              return <Analytics />;
            case "orders":
              return <Orders />;

              default: 
              return <PhotoManagement />;
          }
        })()
        }</div>
      
    </div>
  )
}

export default SellerDashboard