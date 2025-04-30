import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-500 text-gray-300 py-8">
      <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row justify-between items-center">

        {/* Left side - Brand */}
        <div className="text-lg font-semibold mb-4 sm:mb-0">
          © {new Date().getFullYear()} PicPrism
        </div>

        {/* Center - Navigation Links */}
        <div className="flex flex-wrap justify-center space-x-6 mb-4 sm:mb-0 text-base">
          <a href="/" className="hover:text-white transition-colors">Home</a>
          <a href="/about" className="hover:text-white transition-colors">About</a>
          <a href="/contact" className="hover:text-white transition-colors">Contact</a>
          <a href="/privacy" className="hover:text-white transition-colors">Privacy Policy</a>
        </div>

        {/* Right side - Social Icons */}
        <div className="flex space-x-4 text-2xl">
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <FaFacebookF />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <FaTwitter />
          </a>
          <a href="#" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
            <FaInstagram />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
