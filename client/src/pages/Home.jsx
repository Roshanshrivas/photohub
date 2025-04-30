import React from 'react'
import HeroSection from '../components/HeroSection'
import PhotoGallery from '../components/PhotoGallery'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div className='mt-20'>
     <HeroSection/>
     <PhotoGallery/>
     <Footer/>
    </div>
  )
}

export default Home