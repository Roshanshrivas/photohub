import React from 'react'
import { useSelector } from 'react-redux'
import DashboardSidebar from '../components/DashboardSidebar.jsx'
import Analytics from '../components/Analytics.jsx'
import Orders from '../components/Orders.jsx'
import PhotosPurchased from '../components/buyer/PhotosPurchased.jsx'
import Favourites from '../components/Favourites.jsx'

const BuyerDashboard = () => {
  const tab = useSelector((state) => state.nav.tab)
  return (
    <div className='flex flex-col sm:flex-row'>
      <DashboardSidebar />
      <div>{
        (() => {
          switch( tab ) {
            case "photos-purchased":
              return <PhotosPurchased />;
            case "analytics":
              return <Analytics />;
            case "orders":
              return <Orders />;
            case "favourites":
              return <Favourites />;

              default: 
              return <PhotosPurchased />;
          }
        })()
        }</div>
      
    </div>
  )
}

export default BuyerDashboard