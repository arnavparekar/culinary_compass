import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChefHat, Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2" onClick={closeMenu}>
            <ChefHat size={32} className="text-white" />
            <span className="text-2xl font-bold">CulinaryCompass</span>
          </Link>

          {/* Mobile menu button */}
          <button 
            className="md:hidden text-white focus:outline-none"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>

          {/* Desktop navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              to="/" 
              className={`font-medium hover:text-yellow-200 transition-colors ${isActive('/') ? 'text-yellow-200 underline underline-offset-4' : ''}`}
            >
              Home
            </Link>
            <Link 
              to="/create" 
              className={`font-medium hover:text-yellow-200 transition-colors ${isActive('/create') ? 'text-yellow-200 underline underline-offset-4' : ''}`}
            >
              Create Recipe
            </Link>
            <Link 
              to="/recipes" 
              className={`font-medium hover:text-yellow-200 transition-colors ${isActive('/recipes') ? 'text-yellow-200 underline underline-offset-4' : ''}`}
            >
              Recipes
            </Link>
            <Link 
              to="/meal-planner" 
              className={`font-medium hover:text-yellow-200 transition-colors ${isActive('/meal-planner') ? 'text-yellow-200 underline underline-offset-4' : ''}`}
            >
              Meal Planner
            </Link>
            <Link 
              to="/pantry" 
              className={`font-medium hover:text-yellow-200 transition-colors ${isActive('/pantry') ? 'text-yellow-200 underline underline-offset-4' : ''}`}
            >
              Pantry
            </Link>
          </nav>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-2 flex flex-col space-y-3">
            <Link 
              to="/" 
              className={`font-medium hover:text-yellow-200 transition-colors ${isActive('/') ? 'text-yellow-200' : ''}`}
              onClick={closeMenu}
            >
              Home
            </Link>
            <Link 
              to="/create" 
              className={`font-medium hover:text-yellow-200 transition-colors ${isActive('/create') ? 'text-yellow-200' : ''}`}
              onClick={closeMenu}
            >
              Create Recipe
            </Link>
            <Link 
              to="/recipes" 
              className={`font-medium hover:text-yellow-200 transition-colors ${isActive('/recipes') ? 'text-yellow-200' : ''}`}
              onClick={closeMenu}
            >
              Recipes
            </Link>
            <Link 
              to="/meal-planner" 
              className={`font-medium hover:text-yellow-200 transition-colors ${isActive('/meal-planner') ? 'text-yellow-200' : ''}`}
              onClick={closeMenu}
            >
              Meal Planner
            </Link>
            <Link 
              to="/pantry" 
              className={`font-medium hover:text-yellow-200 transition-colors ${isActive('/pantry') ? 'text-yellow-200' : ''}`}
              onClick={closeMenu}
            >
              Pantry
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
};

export default Header;