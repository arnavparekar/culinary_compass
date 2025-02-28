import React, { useState, useEffect } from 'react';
import { ShoppingBag, Trash2, Calculator, Check } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import { GroceryItem } from '../types';
import { generateGroceryList, calculateTotalCalories } from '../utils/groceryListGenerator';
import { Link } from 'react-router-dom';

const PantryPage: React.FC = () => {
  const { selectedRecipes, removeFromSelectedRecipes, clearSelectedRecipes } = useRecipes();
  const [groceryList, setGroceryList] = useState<GroceryItem[]>([]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  
  // Generate grocery list whenever selected recipes change
  useEffect(() => {
    if (selectedRecipes.length > 0) {
      const newGroceryList = generateGroceryList(selectedRecipes);
      setGroceryList(newGroceryList);
      setTotalCalories(calculateTotalCalories(newGroceryList));
    } else {
      setGroceryList([]);
      setTotalCalories(0);
    }
  }, [selectedRecipes]);
  
  // Group grocery items by category
  const groceryByCategory = groceryList.reduce((acc, item) => {
    const category = item.ingredient.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {} as Record<string, GroceryItem[]>);
  
  // Toggle item checked state
  const toggleItemChecked = (itemId: string) => {
    setCheckedItems(prev => {
      const newChecked = new Set(prev);
      if (newChecked.has(itemId)) {
        newChecked.delete(itemId);
      } else {
        newChecked.add(itemId);
      }
      return newChecked;
    });
  };
  
  // Remove recipe from selected recipes
  const handleRemoveRecipe = (recipeId: string) => {
    removeFromSelectedRecipes(recipeId);
  };
  
  // Clear all selected recipes
  const handleClearAll = () => {
    clearSelectedRecipes();
    setCheckedItems(new Set());
  };
  
  // Check if all items are checked
  const allItemsChecked = groceryList.length > 0 && 
    groceryList.every(item => checkedItems.has(item.ingredient.id));
  
  // Check all items
  const checkAllItems = () => {
    if (allItemsChecked) {
      setCheckedItems(new Set());
    } else {
      setCheckedItems(new Set(groceryList.map(item => item.ingredient.id)));
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">Pantry & Grocery List</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Generate a grocery list based on your selected recipes. Add recipes to your list and we'll calculate exactly what you need.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Selected Recipes */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Selected Recipes</h2>
                    {selectedRecipes.length > 0 && (
                      <button
                        onClick={handleClearAll}
                        className="text-sm text-red-500 hover:text-red-700"
                      >
                        Clear All
                      </button>
                    )}
                  </div>
                  
                  {selectedRecipes.length > 0 ? (
                    <div className="space-y-4 max-h-96 overflow-y-auto">
                      {selectedRecipes.map(recipe => (
                        <div 
                          key={recipe.id}
                          className="p-3 rounded-lg border border-gray-200 flex items-center"
                        >
                          <img 
                            src={recipe.imageUrl} 
                            alt={recipe.title} 
                            className="w-16 h-16 rounded object-cover mr-3"
                          />
                          <div className="flex-1">
                            <Link 
                              to={`/recipe/${recipe.id}`}
                              className="font-medium hover:text-orange-500 transition-colors line-clamp-1"
                            >
                              {recipe.title}
                            </Link>
                            <p className="text-sm text-gray-500">
                              {recipe.ingredients.length} ingredients
                            </p>
                          </div>
                          <button
                            onClick={() => handleRemoveRecipe(recipe.id)}
                            className="text-gray-400 hover:text-red-500 p-1"
                            aria-label="Remove recipe"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                      <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No recipes selected</h3>
                      <p className="text-gray-600 mb-4">
                        Add recipes to generate a grocery list.
                      </p>
                      <Link 
                        to="/recipes" 
                        className="text-orange-500 hover:text-orange-700 font-medium"
                      >
                        Browse Recipes
                      </Link>
                    </div>
                  )}
                  
                  {selectedRecipes.length > 0 && (
                    <div className="mt-6 pt-6 border-t border-gray-200">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-gray-700">Total Recipes:</span>
                        <span className="font-medium">{selectedRecipes.length}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Total Ingredients:</span>
                        <span className="font-medium">{groceryList.length}</span>
                      </div>
                      <div className="flex justify-between items-center mt-2 pt-2 border-t border-gray-200">
                        <span className="text-gray-700 font-medium">Estimated Calories:</span>
                        <span className="font-bold text-orange-500">{Math.round(totalCalories)} cal</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Grocery List */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-semibold">Grocery List</h2>
                    
                    {groceryList.length > 0 && (
                      <button
                        onClick={checkAllItems}
                        className="flex items-center text-sm font-medium text-orange-500 hover:text-orange-700"
                      >
                        <Check size={16} className="mr-1" />
                        {allItemsChecked ? 'Uncheck All' : 'Check All'}
                      </button>
                    )}
                  </div>
                  
                  {groceryList.length > 0 ? (
                    <div>
                      {Object.entries(groceryByCategory).map(([category, items]) => (
                        <div key={category} className="mb-8 last:mb-0">
                          <h3 className="font-medium text-lg mb-4 pb-2 border-b border-gray-200">
                            {category}
                          </h3>
                          
                          <div className="space-y-3">
                            {items.map(item => (
                              <div 
                                key={`${item.ingredient.id}-${item.unit}`}
                                className={`p-3 rounded-lg flex items-center ${
                                  checkedItems.has(item.ingredient.id) 
                                    ? 'bg-green-50 border border-green-200' 
                                    : 'bg-gray-50'
                                }`}
                              >
                                <button
                                  onClick={() => toggleItemChecked(item.ingredient.id)}
                                  className={`w-6 h-6 rounded-full border flex items-center justify-center mr-3 ${
                                    checkedItems.has(item.ingredient.id)
                                      ? 'bg-green-500 border-green-500 text-white'
                                      : 'border-gray-300'
                                  }`}
                                >
                                  {checkedItems.has(item.ingredient.id) && <Check size={14} />}
                                </button>
                                
                                <div className="flex-1">
                                  <div className="flex justify-between">
                                    <span className={`font-medium ${checkedItems.has(item.ingredient.id) ? 'line-through text-gray-500' : ''}`}>
                                      {item.ingredient.name}
                                    </span>
                                    <span className="text-gray-700">
                                      {item.quantity} {item.unit}
                                    </span>
                                  </div>
                                  
                                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                                    <span>Used in: {item.recipes.join(', ')}</span>
                                    {item.ingredient.calories && (
                                      <span className="flex items-center">
                                        <Calculator size={12} className="mr-1" />
                                        {item.ingredient.calories} cal/100g
                                      </span>
                                    )}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ))}
                      
                      <div className="mt-8 pt-6 border-t border-gray-200 flex justify-between items-center">
                        <div>
                          <p className="text-gray-700">
                            <span className="font-medium">Total Items:</span> {groceryList.length}
                          </p>
                          <p className="text-gray-700">
                            <span className="font-medium">Checked:</span> {checkedItems.size} of {groceryList.length}
                          </p>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-gray-700 font-medium">Estimated Total Calories:</p>
                          <p className="text-2xl font-bold text-orange-500">{Math.round(totalCalories)} cal</p>
                        </div>
                      </div>
                      
                      <div className="mt-6 flex justify-center">
                        <button
                          onClick={() => window.print()}
                          className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 transition-opacity"
                        >
                          Print Grocery List
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <ShoppingBag size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">Your grocery list is empty</h3>
                      <p className="text-gray-600 mb-4">
                        Select recipes to generate your grocery list.
                      </p>
                      <Link 
                        to="/recipes" 
                        className="text-orange-500 hover:text-orange-700 font-medium"
                      >
                        Browse Recipes
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PantryPage;