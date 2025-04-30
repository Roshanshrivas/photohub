import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-white text-gray-800 mt-20">
      {/* Hero Section */}
      <section className="bg-gradient-to-r bg-gray-500 text-white py-16 px-6 md:px-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to PhotoHubb</h1>
        <p className="text-lg md:text-xl max-w-3xl mx-auto">
          A creative marketplace for photographers and art lovers. Discover, sell, and buy high-quality photos and wallpapers in one beautiful hub.
        </p>
      </section>

      {/* Main Content */}
      <section className="py-16 px-6 md:px-20 max-w-6xl mx-auto">
        {/* Mission */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 text-lg leading-relaxed">
            At <span className="font-bold text-blue-600">PhotoHubb</span>, our mission is to create a seamless experience where photographers can showcase and monetize their work, and users can find the perfect visuals for personal or professional use. We believe in empowering creators and inspiring everyone through stunning imagery.
          </p>
        </div>

        {/* Two Columns: Buyer & Seller */}
        <div className="grid md:grid-cols-2 gap-12">
          {/* For Sellers */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">For Sellers</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Turn your passion into profit by uploading and selling your best photos and wallpapers. Build your brand, gain exposure, and join a growing community of visual storytellers.
            </p>
          </div>

          {/* For Buyers */}
          <div className="bg-gray-50 p-8 rounded-2xl shadow-md hover:shadow-lg transition duration-300">
            <h3 className="text-2xl font-semibold text-gray-800 mb-3">For Buyers</h3>
            <p className="text-gray-600 text-base leading-relaxed">
              Browse a curated collection of high-quality visuals from talented creators. Find images that spark emotion, support your work, or beautify your digital and print projects.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-100 py-12 px-6 md:px-20 text-center">
        <h2 className="text-2xl font-bold mb-4">Join the PhotoHubb Community</h2>
        <p className="text-gray-600 text-lg mb-6 max-w-xl mx-auto">
          Whether you're here to showcase your creativity or find the perfect shot, PhotoHubb is the place where your vision comes to life.
        </p>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-full text-lg font-medium hover:bg-blue-700 transition">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
