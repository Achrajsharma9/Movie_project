
import { Film, Github, Heart } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-cine-dark mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Film size={20} className="text-cine-gold mr-2" />
            <span className="text-white font-bold">CineSphere</span>
          </div>
          
          <div className="flex flex-col md:flex-row items-center text-sm text-gray-400">
            <p className="mb-2 md:mb-0 md:mr-4">
              Powered by <a href="https://www.themoviedb.org" target="_blank" rel="noreferrer" className="text-cine-gold hover:underline">The Movie Database API</a>
            </p>
            <div className="flex space-x-4">
              <Link to="/" className="hover:text-white transition">Home</Link>
              <Link to="/movies" className="hover:text-white transition">Movies</Link>
              <Link to="/genres" className="hover:text-white transition">Genres</Link>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p>© {new Date().getFullYear()} CineSphere. All rights reserved.</p>
          <div className="flex items-center mt-2 md:mt-0">
            <span className="flex items-center text-gray-400">
              Made with <Heart size={14} className="mx-1 text-cine-accent" /> using React
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
