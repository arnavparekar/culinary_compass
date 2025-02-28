import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Clock, Users, Heart, ChefHat, ArrowLeft, Plus } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';

const RecipeDetailPage: React.FC = () => {
  const { recipeId } = useParams<{ recipeId: string }>();
  const navigate = useNavigate();
  const { recipes, likedRecipes, toggleLikeRecipe, addToSelectedRecipes, isRecipeSelected } = useRecipes();
  
  const recipe = recipes.find(r => r.id === recipeId);
  
  if (!recipe) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 text-center">
            <h1 className="text-2xl font-bold mb-4">Recipe Not Found</h1>
            <p className="mb-6">The recipe you're looking for doesn't exist or has been removed.</p>
            <button
              onClick={() => navigate('/recipes')}
              className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors"
            >
              Back to Recipes
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  const isLiked = likedRecipes.has(recipe.id);
  const isSelected = isRecipeSelected(recipe.id);
  
  const handleLikeClick = () => {
    toggleLikeRecipe(recipe.id);
  };
  
  const handleAddToMealPlan = () => {
    addToSelectedRecipes(recipe);
    navigate('/meal-planner');
  };
  
  const handleAddToGroceryList = () => {
    addToSelectedRecipes(recipe);
    navigate('/pantry');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => navigate(-1)}
            className="mb-6 flex items-center text-gray-600 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back
          </button>
          
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="relative h-80">
              <img 
                src={recipe.imageUrl} 
                alt={recipe.title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center mb-2">
                  <span className="bg-orange-500 text-white text-xs font-medium px-2 py-1 rounded-full mr-2">
                    {recipe.difficulty}
                  </span>
                  {recipe.tags.map(tag => (
                    <span key={tag} className="bg-gray-800/70 text-white text-xs font-medium px-2 py-1 rounded-full mr-2">
                      {tag}
                    </span>
                  ))}
                </div>
                <h1 className="text-3xl font-bold text-white">{recipe.title}</h1>
              </div>
              <button
                onClick={handleLikeClick}
                className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                aria-label={isLiked ? "Unlike recipe" : "Like recipe"}
              >
                <Heart 
                  size={24} 
                  className={`${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} 
                />
              </button>
            </div>
            
            <div className="p-6">
              <div className="flex flex-wrap items-center justify-between mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center mb-4 md:mb-0">
                  <img 
                    src={recipe.chef.avatar} 
                    alt={recipe.chef.name} 
                    className="w-12 h-12 rounded-full object-cover mr-3"
                  />
                  <div>
                    <p className="text-sm text-gray-500">Recipe by</p>
                    <p className="font-medium">{recipe.chef.name}</p>
                  </div>
                </div>
                
                <div className="flex space-x-6">
                  <div className="flex flex-col items-center">
                    <div className="flex items-center text-gray-700 mb-1">
                      <Clock size={18} className="mr-1" />
                      <span>{recipe.cookingTime} min</span>
                    </div>
                    <span className="text-xs text-gray-500">Cooking Time</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="flex items-center text-gray-700 mb-1">
                      <Users size={18} className="mr-1" />
                      <span>{recipe.servings}</span>
                    </div>
                    <span className="text-xs text-gray-500">Servings</span>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="flex items-center text-gray-700 mb-1">
                      <Heart size={18} className="mr-1" />
                      <span>{recipe.likes}</span>
                    </div>
                    <span className="text-xs text-gray-500">Likes</span>
                  </div>
                </div>
              </div>
              
              <div className="mb-8">
                <h2 className="text-xl font-semibold mb-4">Description</h2>
                <p className="text-gray-700">{recipe.description}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
                <div className="md:col-span-1">
                  <h2 className="text-xl font-semibold mb-4">Ingredients</h2>
                  <ul className="space-y-2">
                    {recipe.ingredients.map((item, index) => (
                      <li key={index} className="flex items-start">
                        <span className="inline-block w-2 h-2 rounded-full bg-orange-500 mt-2 mr-2"></span>
                        <span>
                          <span className="font-medium">{item.quantity} {item.unit}</span> {item.ingredient.name}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="md:col-span-2">
                  <h2 className="text-xl font-semibold mb-4">Instructions</h2>
                  <ol className="space-y-4">
                    {recipe.instructions.map((instruction, index) => (
                      <li key={index} className="flex">
                        <span className="flex-shrink-0 w-6 h-6 rounded-full bg-orange-500 text-white flex items-center justify-center mr-3 mt-0.5">
                          {index + 1}
                        </span>
                        <p className="text-gray-700">{instruction}</p>
                      </li>
                    ))}
                  </ol>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToMealPlan}
                  className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center ${
                    isSelected 
                      ? 'bg-green-500 text-white' 
                      : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:opacity-90 transition-opacity'
                  }`}
                >
                  {isSelected ? 'Added to Meal Plan' : (
                    <>
                      <Plus size={20} className="mr-2" />
                      Add to Meal Plan
                    </>
                  )}
                </button>
                
                <button
                  onClick={handleAddToGroceryList}
                  className={`flex-1 py-3 rounded-lg font-medium flex items-center justify-center ${
                    isSelected 
                      ? 'bg-green-500 text-white' 
                      : 'bg-orange-100 text-orange-700 hover:bg-orange-200 transition-colors'
                  }`}
                >
                  {isSelected ? 'Added to Grocery List' : (
                    <>
                      <Plus size={20} className="mr-2" />
                      Add to Grocery List
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetailPage;
