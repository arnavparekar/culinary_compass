import React from 'react';
import { Link } from 'react-router-dom';
import { ChefHat, Utensils, Calendar, ShoppingBag, ArrowRight } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../context/RecipeContext';

const HomePage: React.FC = () => {
  const { recipes } = useRecipes();
  const featuredRecipes = recipes.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: 'url(https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80)',
            backgroundBlendMode: 'overlay',
            opacity: 0.4
          }}
        ></div>
        
        <div className="container mx-auto px-4 py-24 md:py-32 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Discover Delicious Recipes for Every Occasion
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Find, create, and share amazing recipes with our vibrant food community.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/recipes" 
                className="bg-white text-orange-500 hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition-colors shadow-md"
              >
                Explore Recipes
              </Link>
              <Link 
                to="/create" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-500 px-6 py-3 rounded-full font-medium transition-colors"
              >
                Create Recipe
              </Link>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Discover Our Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-orange-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full mb-4">
                <ChefHat size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Create Recipes</h3>
              <p className="text-gray-600">
                Create unique recipes using ingredients you already have at home.
              </p>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full mb-4">
                <Utensils size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Discover Recipes</h3>
              <p className="text-gray-600">
                Browse through our collection of delicious recipes from around the world.
              </p>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full mb-4">
                <Calendar size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Meal Planner</h3>
              <p className="text-gray-600">
                Plan your meals for the week with our easy-to-use meal planner.
              </p>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-xl text-center hover:shadow-lg transition-shadow">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-orange-500 to-pink-500 text-white rounded-full mb-4">
                <ShoppingBag size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Grocery List</h3>
              <p className="text-gray-600">
                Generate shopping lists based on your selected recipes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Create Recipe Section */}
      <section className="py-16 bg-gradient-to-r from-orange-100 to-pink-100">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0 md:pr-8">
              <h2 className="text-3xl font-bold mb-4">Create New Recipes Using Your Leftovers</h2>
              <p className="text-gray-700 mb-6">
                Don't know what to cook with the ingredients you have? Our recipe generator will help you create delicious meals using what's already in your kitchen.
              </p>
              <Link 
                to="/create" 
                className="inline-flex items-center bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-full font-medium hover:opacity-90 transition-opacity"
              >
                Try Recipe Generator <ArrowRight size={18} className="ml-2" />
              </Link>
            </div>
            <div className="md:w-1/2">
              <img 
                src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" 
                alt="Cooking with leftovers" 
                className="rounded-xl shadow-lg w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Recipes */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Featured Recipes</h2>
            <Link 
              to="/recipes" 
              className="text-orange-500 hover:text-orange-700 font-medium inline-flex items-center"
            >
              View All <ArrowRight size={18} className="ml-1" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-orange-500 to-pink-500 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Cooking?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join our community of food lovers and discover amazing recipes that will transform your cooking experience.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              to="/recipes" 
              className="bg-white text-orange-500 hover:bg-gray-100 px-6 py-3 rounded-full font-medium transition-colors shadow-md"
            >
              Explore Recipes
            </Link>
            <Link 
              to="/create" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-orange-500 px-6 py-3 rounded-full font-medium transition-colors"
            >
              Create Recipe
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;