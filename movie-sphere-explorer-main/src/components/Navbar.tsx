
import { Link } from "react-router-dom";
import { Search, Film, Menu, X } from "lucide-react";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
      setIsMenuOpen(false);
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-cine-dark/95 backdrop-blur sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Film size={24} className="text-cine-gold" />
            <span className="text-xl font-bold text-white">CineSphere</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-6">
            <Link to="/" className="text-white hover:text-cine-gold transition">
              Home
            </Link>
            <Link to="/movies" className="text-white hover:text-cine-gold transition">
              Movies
            </Link>
            <Link to="/genres" className="text-white hover:text-cine-gold transition">
              Genres
            </Link>
            <form onSubmit={handleSearch} className="relative">
              <Input
                type="search"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-60 bg-secondary/50 focus:bg-secondary border-0 focus:ring-1 focus:ring-cine-gold pr-10"
              />
              <Button 
                type="submit" 
                size="icon" 
                variant="ghost" 
                className="absolute right-0 top-0 h-full text-white hover:text-cine-gold"
              >
                <Search size={18} />
              </Button>
            </form>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="mt-3 pb-4 space-y-4 md:hidden animate-fade-in">
            <Link 
              to="/" 
              className="block py-2 text-white hover:text-cine-gold"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link 
              to="/movies" 
              className="block py-2 text-white hover:text-cine-gold"
              onClick={() => setIsMenuOpen(false)}
            >
              Movies
            </Link>
            <Link 
              to="/genres" 
              className="block py-2 text-white hover:text-cine-gold"
              onClick={() => setIsMenuOpen(false)}
            >
              Genres
            </Link>
            <form onSubmit={handleSearch} className="flex">
              <Input
                type="search"
                placeholder="Search movies..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-grow bg-secondary/50 focus:bg-secondary border-0 focus:ring-1 focus:ring-cine-gold"
              />
              <Button type="submit" className="ml-2 bg-cine-gold hover:bg-cine-gold/80 text-black">
                <Search size={18} />
              </Button>
            </form>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
