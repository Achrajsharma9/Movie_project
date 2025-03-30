
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Film } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-cine-dark">
      <div className="text-center px-4">
        <div className="mb-6 inline-block p-6 rounded-full bg-secondary">
          <Film size={64} className="text-cine-gold" />
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-4 text-white">404</h1>
        <p className="text-xl md:text-2xl text-gray-400 mb-8">
          Oops! This film doesn't seem to exist
        </p>
        <Button asChild className="bg-cine-gold hover:bg-cine-gold/80 text-black font-medium px-6">
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </div>
  );
};

export default NotFound;
