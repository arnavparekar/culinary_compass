import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Users, Heart } from 'lucide-react';
import { Recipe } from '../types';
import { useRecipes } from '../context/RecipeContext';

interface RecipeCardProps {
  recipe: Recipe;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe }) => {
  const { likedRecipes, toggleLikeRecipe } = useRecipes();
  const isLiked = likedRecipes.has(recipe.id);

  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLikeRecipe(recipe.id);
  };

  return (
    <Link 
      to={`/recipe/${recipe.id}`} 
      className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300"
    >
      <div className="relative">
        <img 
          src={recipe.imageUrl} 
          alt={recipe.title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleLikeClick}
          className="absolute top-3 right-3 bg-white bg-opacity-80 p-2 rounded-full shadow-md hover:bg-opacity-100 transition-all"
          aria-label={isLiked ? "Unlike recipe" : "Like recipe"}
        >
          <Heart 
            size={20} 
            className={`${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
          />
        </button>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-3">
          <span className="text-xs font-medium text-white px-2 py-1 rounded-full bg-orange-500">
            {recipe.difficulty}
          </span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-1">{recipe.title}</h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{recipe.description}</p>
        
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <Clock size={16} />
            <span>{recipe.cookingTime} min</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Users size={16} />
            <span>{recipe.servings} servings</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Heart size={16} />
            <span>{recipe.likes}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RecipeCard;