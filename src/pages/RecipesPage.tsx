import React, { useState, useEffect } from 'react';
import { Search, Filter, X } from 'lucide-react';
import RecipeCard from '../components/RecipeCard';
import { useRecipes } from '../context/RecipeContext';
import { Recipe } from '../types';
import { tags } from '../data/recipes';

const RecipesPage: React.FC = () => {
  const { recipes } = useRecipes();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('');
  const [cookingTimeFilter, setCookingTimeFilter] = useState<number | null>(null);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>(recipes);
  const [showFilters, setShowFilters] = useState(false);

  const difficulties = ['Easy', 'Medium', 'Hard'];
  const cookingTimes = [
    { label: 'Quick (< 15 min)', value: 15 },
    { label: 'Medium (< 30 min)', value: 30 },
    { label: 'Long (> 30 min)', value: 31 }
  ];

  useEffect(() => {
    const filtered = recipes.filter(recipe => {
      // Search term filter
      const matchesSearch = recipe.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.description.toLowerCase().includes(searchTerm.toLowerCase());
      
      // Tags filter
      const matchesTags = selectedTags.length === 0 || 
                         selectedTags.every(tag => recipe.tags.includes(tag));
      
      // Difficulty filter
      const matchesDifficulty = !selectedDifficulty || recipe.difficulty === selectedDifficulty;
      
      // Cooking time filter
      const matchesCookingTime = !cookingTimeFilter || 
                               (cookingTimeFilter <= 30 && recipe.cookingTime < cookingTimeFilter) ||
                               (cookingTimeFilter > 30 && recipe.cookingTime >= 30);
      
      return matchesSearch && matchesTags && matchesDifficulty && matchesCookingTime;
    });
    
    setFilteredRecipes(filtered);
  }, [recipes, searchTerm, selectedTags, selectedDifficulty, cookingTimeFilter]);

  const toggleTag = (tag: string) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  };

  const clearFilters = () => {
    setSelectedTags([]);
    setSelectedDifficulty('');
    setCookingTimeFilter(null);
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">Discover Recipes</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Browse through our collection of delicious recipes. Use the filters to find exactly what you're looking for.
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search size={20} className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    placeholder="Search recipes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                  />
                </div>
                <button
                  onClick={toggleFilters}
                  className="bg-orange-500 text-white px-4 py-2 rounded-md hover:bg-orange-600 transition-colors flex items-center justify-center"
                >
                  <Filter size={20} className="mr-2" />
                  {showFilters ? 'Hide Filters' : 'Show Filters'}
                </button>
              </div>

              {showFilters && (
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-lg">Filters</h3>
                    <button
                      onClick={clearFilters}
                      className="text-orange-500 hover:text-orange-700 text-sm font-medium"
                    >
                      Clear all filters
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Tags filter */}
                    <div>
                      <h4 className="font-medium mb-2">Tags</h4>
                      <div className="flex flex-wrap gap-2">
                        {tags.map(tag => (
                          <button
                            key={tag}
                            onClick={() => toggleTag(tag)}
                            className={`px-3 py-1 text-sm rounded-full ${
                              selectedTags.includes(tag)
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Difficulty filter */}
                    <div>
                      <h4 className="font-medium mb-2">Difficulty</h4>
                      <div className="flex flex-wrap gap-2">
                        {difficulties.map(difficulty => (
                          <button
                            key={difficulty}
                            onClick={() => setSelectedDifficulty(selectedDifficulty === difficulty ? '' : difficulty)}
                            className={`px-3 py-1 text-sm rounded-full ${
                              selectedDifficulty === difficulty
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {difficulty}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Cooking time filter */}
                    <div>
                      <h4 className="font-medium mb-2">Cooking Time</h4>
                      <div className="flex flex-wrap gap-2">
                        {cookingTimes.map(time => (
                          <button
                            key={time.value}
                            onClick={() => setCookingTimeFilter(cookingTimeFilter === time.value ? null : time.value)}
                            className={`px-3 py-1 text-sm rounded-full ${
                              cookingTimeFilter === time.value
                                ? 'bg-orange-500 text-white'
                                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                            }`}
                          >
                            {time.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Active filters */}
                  {(selectedTags.length > 0 || selectedDifficulty || cookingTimeFilter) && (
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <h4 className="font-medium mb-2">Active Filters:</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedTags.map(tag => (
                          <div key={tag} className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full flex items-center">
                            {tag}
                            <button onClick={() => toggleTag(tag)} className="ml-1">
                              <X size={14} />
                            </button>
                          </div>
                        ))}
                        
                        {selectedDifficulty && (
                          <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full flex items-center">
                            {selectedDifficulty}
                            <button onClick={() => setSelectedDifficulty('')} className="ml-1">
                              <X size={14} />
                            </button>
                          </div>
                        )}
                        
                        {cookingTimeFilter && (
                          <div className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full flex items-center">
                            {cookingTimes.find(t => t.value === cookingTimeFilter)?.label}
                            <button onClick={() => setCookingTimeFilter(null)} className="ml-1">
                              <X size={14} />
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-xl shadow-md">
              <div className="text-orange-500 mb-4">
                <Search size={48} className="mx-auto" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No recipes found</h3>
              <p className="text-gray-600">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-orange-500 hover:text-orange-700 font-medium"
              >
                Clear all filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipesPage;