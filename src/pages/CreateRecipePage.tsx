import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Wand2, Loader2 } from 'lucide-react';
import IngredientSelector from '../components/IngredientSelector';
import { Ingredient } from '../types';
import { useRecipes } from '../context/RecipeContext';

const CreateRecipePage: React.FC = () => {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const { generateNewRecipe } = useRecipes();
  const navigate = useNavigate();

  const handleSelectIngredient = (ingredient: Ingredient) => {
    setSelectedIngredients(prev => [...prev, ingredient]);
  };

  const handleRemoveIngredient = (ingredientId: string) => {
    setSelectedIngredients(prev => prev.filter(ing => ing.id !== ingredientId));
  };

  const handleGenerateRecipe = () => {
    if (selectedIngredients.length < 3) {
      alert('Please select at least 3 ingredients to generate a recipe.');
      return;
    }

    setIsGenerating(true);
    
    // Simulate recipe generation delay
    setTimeout(() => {
      const newRecipe = generateNewRecipe(selectedIngredients);
      setIsGenerating(false);
      navigate(`/recipe/${newRecipe.id}`);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">Create a Recipe with Your Ingredients</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Select the ingredients you have on hand, and we'll generate a unique recipe just for you. 
              The more ingredients you select, the more creative your recipe will be!
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <IngredientSelector
                    selectedIngredients={selectedIngredients}
                    onSelectIngredient={handleSelectIngredient}
                    onRemoveIngredient={handleRemoveIngredient}
                  />
                </div>

                <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-lg p-6 flex flex-col">
                  <h3 className="text-lg font-semibold mb-4">Recipe Generator</h3>
                  
                  <div className="flex-1">
                    {selectedIngredients.length === 0 ? (
                      <div className="text-center py-8">
                        <div className="bg-orange-100 text-orange-800 p-4 rounded-lg inline-block mb-4">
                          <Wand2 size={32} />
                        </div>
                        <p className="text-gray-600">
                          Select ingredients from the list to get started.
                        </p>
                      </div>
                    ) : (
                      <div>
                        <p className="mb-4 text-gray-700">
                          You've selected <span className="font-semibold">{selectedIngredients.length}</span> ingredients:
                        </p>
                        <ul className="mb-6 space-y-1">
                          {selectedIngredients.map(ingredient => (
                            <li key={ingredient.id} className="text-gray-700">
                              • {ingredient.name}
                            </li>
                          ))}
                        </ul>
                        {selectedIngredients.length < 3 ? (
                          <p className="text-orange-600 mb-4">
                            Please select at least 3 ingredients to generate a recipe.
                          </p>
                        ) : (
                          <p className="text-green-600 mb-4">
                            Ready to generate your unique recipe!
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                  
                  <button
                    onClick={handleGenerateRecipe}
                    disabled={selectedIngredients.length < 3 || isGenerating}
                    className={`w-full py-3 rounded-lg font-medium flex items-center justify-center ${
                      selectedIngredients.length < 3 || isGenerating
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:opacity-90 transition-opacity'
                    }`}
                  >
                    {isGenerating ? (
                      <>
                        <Loader2 size={20} className="animate-spin mr-2" />
                        Generating Recipe...
                      </>
                    ) : (
                      <>
                        <Wand2 size={20} className="mr-2" />
                        Generate Recipe
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-12 bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-4">How It Works</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-orange-50 p-5 rounded-lg">
                  <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-3">1</div>
                  <h3 className="font-semibold mb-2">Select Your Ingredients</h3>
                  <p className="text-gray-600">
                    Choose from our extensive list of ingredients that you already have in your kitchen.
                  </p>
                </div>
                
                <div className="bg-orange-50 p-5 rounded-lg">
                  <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-3">2</div>
                  <h3 className="font-semibold mb-2">Generate Recipe</h3>
                  <p className="text-gray-600">
                    Our smart algorithm will create a unique recipe based on your selected ingredients.
                  </p>
                </div>
                
                <div className="bg-orange-50 p-5 rounded-lg">
                  <div className="bg-orange-500 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold mb-3">3</div>
                  <h3 className="font-semibold mb-2">Cook & Enjoy</h3>
                  <p className="text-gray-600">
                    Follow the recipe instructions to create a delicious meal with what you have.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateRecipePage;