import React, { useState } from 'react';
import { Ingredient } from '../types';
import { ingredients, categories } from '../data/ingredients';
import { X, Plus, Filter } from 'lucide-react';

interface IngredientSelectorProps {
  selectedIngredients: Ingredient[];
  onSelectIngredient: (ingredient: Ingredient) => void;
  onRemoveIngredient: (ingredientId: string) => void;
}

const IngredientSelector: React.FC<IngredientSelectorProps> = ({
  selectedIngredients,
  onSelectIngredient,
  onRemoveIngredient
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [showFilters, setShowFilters] = useState(false);

  const filteredIngredients = ingredients.filter(ingredient => {
    const matchesSearch = ingredient.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? ingredient.category === selectedCategory : true;
    const notAlreadySelected = !selectedIngredients.some(selected => selected.id === ingredient.id);
    
    return matchesSearch && matchesCategory && notAlreadySelected;
  });

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const clearFilters = () => {
    setSelectedCategory('');
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Select Ingredients</h3>
      
      <div className="flex items-center mb-4">
        <input
          type="text"
          placeholder="Search ingredients..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-orange-400"
        />
        <button 
          onClick={toggleFilters}
          className="bg-orange-500 text-white p-2 rounded-r-md hover:bg-orange-600 transition-colors"
        >
          <Filter size={20} />
        </button>
      </div>
      
      {showFilters && (
        <div className="mb-4 p-3 bg-gray-50 rounded-md">
          <div className="flex justify-between items-center mb-2">
            <h4 className="font-medium text-gray-700">Filter by Category</h4>
            <button 
              onClick={clearFilters}
              className="text-sm text-orange-500 hover:text-orange-700"
            >
              Clear filters
            </button>
          </div>
          <div className="flex flex-wrap gap-2">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category === selectedCategory ? '' : category)}
                className={`px-3 py-1 text-sm rounded-full ${
                  category === selectedCategory
                    ? 'bg-orange-500 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Selected ingredients */}
      {selectedIngredients.length > 0 && (
        <div className="mb-4">
          <h4 className="font-medium text-gray-700 mb-2">Selected Ingredients:</h4>
          <div className="flex flex-wrap gap-2">
            {selectedIngredients.map(ingredient => (
              <div 
                key={ingredient.id}
                className="flex items-center bg-orange-100 text-orange-800 px-3 py-1 rounded-full"
              >
                <span>{ingredient.name}</span>
                <button 
                  onClick={() => onRemoveIngredient(ingredient.id)}
                  className="ml-2 text-orange-800 hover:text-orange-900"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Ingredient list */}
      <div className="max-h-60 overflow-y-auto border border-gray-200 rounded-md">
        {filteredIngredients.length > 0 ? (
          <ul className="divide-y divide-gray-200">
            {filteredIngredients.map(ingredient => (
              <li 
                key={ingredient.id}
                className="p-2 hover:bg-gray-50 flex justify-between items-center cursor-pointer"
                onClick={() => onSelectIngredient(ingredient)}
              >
                <div>
                  <span className="font-medium">{ingredient.name}</span>
                  <span className="ml-2 text-xs text-gray-500">{ingredient.category}</span>
                </div>
                <button className="text-orange-500 hover:text-orange-700">
                  <Plus size={18} />
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <div className="p-4 text-center text-gray-500">
            No ingredients found. Try adjusting your search or filters.
          </div>
        )}
      </div>
    </div>
  );
};

export default IngredientSelector;