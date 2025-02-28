import React, { useState } from 'react';
import { format, addDays, startOfWeek } from 'date-fns';
import { Calendar, Clock, Trash2, Plus, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRecipes } from '../context/RecipeContext';
import { MealPlan } from '../types';
import { Link } from 'react-router-dom';

const MealPlannerPage: React.FC = () => {
  const { recipes, mealPlans, addMealPlan, removeMealPlan, selectedRecipes, removeFromSelectedRecipes } = useRecipes();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [selectedMealTime, setSelectedMealTime] = useState<'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'>('Dinner');
  const [selectedRecipeId, setSelectedRecipeId] = useState<string>('');
  
  // Get the start of the current week
  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1 });
  
  // Generate an array of 7 days starting from the week start
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  
  // Get meal plans for the selected date
  const mealsForSelectedDate = mealPlans.filter(
    meal => meal.date === selectedDate
  ).sort((a, b) => {
    const mealOrder = { Breakfast: 1, Lunch: 2, Dinner: 3, Snack: 4 };
    return mealOrder[a.mealTime] - mealOrder[b.mealTime];
  });
  
  // Handle adding a new meal plan
  const handleAddMealPlan = () => {
    if (!selectedRecipeId) {
      alert('Please select a recipe');
      return;
    }
    
    const newMealPlan: MealPlan = {
      id: `meal-${Date.now()}`,
      date: selectedDate,
      mealTime: selectedMealTime,
      recipeId: selectedRecipeId,
      recipe: recipes.find(r => r.id === selectedRecipeId)
    };
    
    addMealPlan(newMealPlan);
    setSelectedRecipeId('');
  };
  
  // Handle removing a meal plan
  const handleRemoveMealPlan = (mealPlanId: string) => {
    removeMealPlan(mealPlanId);
  };
  
  // Navigate to previous week
  const goToPreviousWeek = () => {
    setCurrentDate(prevDate => addDays(prevDate, -7));
  };
  
  // Navigate to next week
  const goToNextWeek = () => {
    setCurrentDate(prevDate => addDays(prevDate, 7));
  };
  
  // Format date for display
  const formatDateDisplay = (date: Date) => {
    return format(date, 'EEE, MMM d');
  };
  
  // Check if a date is selected
  const isDateSelected = (date: Date) => {
    return format(date, 'yyyy-MM-dd') === selectedDate;
  };
  
  // Get all available recipes (excluding those already in meal plan for the selected date and meal time)
  const availableRecipes = recipes.filter(recipe => {
    return !mealPlans.some(
      meal => meal.date === selectedDate && 
              meal.mealTime === selectedMealTime && 
              meal.recipeId === recipe.id
    );
  });

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-4">Meal Planner</h1>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Plan your meals for the week by selecting recipes for each day and meal time.
            </p>
          </div>
          
          {/* Week Navigation */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <button 
                  onClick={goToPreviousWeek}
                  className="flex items-center text-gray-600 hover:text-orange-500 transition-colors"
                >
                  <ChevronLeft size={20} className="mr-1" />
                  Previous Week
                </button>
                
                <h2 className="text-xl font-semibold">
                  {format(weekStart, 'MMMM d')} - {format(addDays(weekStart, 6), 'MMMM d, yyyy')}
                </h2>
                
                <button 
                  onClick={goToNextWeek}
                  className="flex items-center text-gray-600 hover:text-orange-500 transition-colors"
                >
                  Next Week
                  <ChevronRight size={20} className="ml-1" />
                </button>
              </div>
              
              {/* Week Days */}
              <div className="grid grid-cols-7 gap-2">
                {weekDays.map((day, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedDate(format(day, 'yyyy-MM-dd'))}
                    className={`p-3 rounded-lg text-center transition-colors ${
                      isDateSelected(day)
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                        : 'hover:bg-orange-100'
                    }`}
                  >
                    <p className="text-sm font-medium">{format(day, 'EEE')}</p>
                    <p className={`text-lg ${isDateSelected(day) ? 'font-bold' : ''}`}>{format(day, 'd')}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Meal Plan Form */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-24">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Add to Meal Plan</h2>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Selected Date
                    </label>
                    <div className="flex items-center p-3 bg-orange-50 rounded-lg">
                      <Calendar size={20} className="text-orange-500 mr-2" />
                      <span>{format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}</span>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Meal Time
                    </label>
                    <div className="grid grid-cols-4 gap-2">
                      {(['Breakfast', 'Lunch', 'Dinner', 'Snack'] as const).map(meal => (
                        <button
                          key={meal}
                          onClick={() => setSelectedMealTime(meal)}
                          className={`p-2 text-center rounded-lg text-sm ${
                            selectedMealTime === meal
                              ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white'
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                        >
                          {meal}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-medium mb-2">
                      Select Recipe
                    </label>
                    
                    {selectedRecipes.length > 0 ? (
                      <div className="mb-4">
                        <h3 className="text-sm font-medium text-gray-700 mb-2">From Selected Recipes:</h3>
                        <div className="space-y-2 max-h-40 overflow-y-auto">
                          {selectedRecipes.map(recipe => (
                            <div 
                              key={recipe.id}
                              onClick={() => setSelectedRecipeId(recipe.id)}
                              className={`p-2 rounded-lg flex items-center cursor-pointer ${
                                selectedRecipeId === recipe.id
                                  ? 'bg-orange-100 border border-orange-300'
                                  : 'hover:bg-gray-100'
                              }`}
                            >
                              <img 
                                src={recipe.imageUrl} 
                                alt={recipe.title} 
                                className="w-10 h-10 rounded object-cover mr-3"
                              />
                              <div className="flex-1">
                                <p className="font-medium text-sm line-clamp-1">{recipe.title}</p>
                                <p className="text-xs text-gray-500">{recipe.cookingTime} min</p>
                              </div>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeFromSelectedRecipes(recipe.id);
                                  if (selectedRecipeId === recipe.id) {
                                    setSelectedRecipeId('');
                                  }
                                }}
                                className="text-gray-400 hover:text-red-500 p-1"
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    ) : null}
                    
                    <div>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">All Recipes:</h3>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {availableRecipes.length > 0 ? (
                          availableRecipes.map(recipe => (
                            <div 
                              key={recipe.id}
                              onClick={() => setSelectedRecipeId(recipe.id)}
                              className={`p-2 rounded-lg flex items-center cursor-pointer ${
                                selectedRecipeId === recipe.id
                                  ? 'bg-orange-100 border border-orange-300'
                                  : 'hover:bg-gray-100'
                              }`}
                            >
                              <img 
                                src={recipe.imageUrl} 
                                alt={recipe.title} 
                                className="w-10 h-10 rounded object-cover mr-3"
                              />
                              <div>
                                <p className="font-medium text-sm line-clamp-1">{recipe.title}</p>
                                <p className="text-xs text-gray-500">{recipe.cookingTime} min</p>
                              </div>
                            </div>
                          ))
                        ) : (
                          <p className="text-gray-500 text-sm p-2">
                            No available recipes for this meal time.
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={handleAddMealPlan}
                    disabled={!selectedRecipeId}
                    className={`w-full py-3 rounded-lg font-medium flex items-center justify-center ${
                      !selectedRecipeId
                        ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:opacity-90 transition-opacity'
                    }`}
                  >
                    <Plus size={20} className="mr-2" />
                    Add to Meal Plan
                  </button>
                  
                  <div className="mt-4 text-center">
                    <Link 
                      to="/recipes" 
                      className="text-orange-500 hover:text-orange-700 text-sm font-medium"
                    >
                      Browse more recipes
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Meal Plan Display */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-6">
                    Meal Plan for {format(new Date(selectedDate), 'EEEE, MMMM d, yyyy')}
                  </h2>
                  
                  {mealsForSelectedDate.length > 0 ? (
                    <div className="space-y-6">
                      {(['Breakfast', 'Lunch', 'Dinner', 'Snack'] as const).map(mealTime => {
                        const mealsForTime = mealsForSelectedDate.filter(meal => meal.mealTime === mealTime);
                        
                        if (mealsForTime.length === 0) return null;
                        
                        return (
                          <div key={mealTime} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
                            <h3 className="font-medium text-lg mb-4 flex items-center">
                              <Clock size={18} className="mr-2 text-orange-500" />
                              {mealTime}
                            </h3>
                            
                            <div className="space-y-4">
                              {mealsForTime.map(meal => {
                                const recipe = recipes.find(r => r.id === meal.recipeId);
                                
                                if (!recipe) return null;
                                
                                return (
                                  <div key={meal.id} className="flex items-start bg-gray-50 p-4 rounded-lg">
                                    <img 
                                      src={recipe.imageUrl} 
                                      alt={recipe.title} 
                                      className="w-20 h-20 rounded-lg object-cover mr-4"
                                    />
                                    <div className="flex-1">
                                      <Link 
                                        to={`/recipe/${recipe.id}`}
                                        className="font-semibold text-lg hover:text-orange-500 transition-colors"
                                      >
                                        {recipe.title}
                                      </Link>
                                      <p className="text-gray-600 text-sm mb-2">{recipe.description}</p>
                                      <div className="flex items-center text-sm text-gray-500">
                                        <Clock size={16} className="mr-1" />
                                        <span>{recipe.cookingTime} min</span>
                                      </div>
                                    </div>
                                    <button
                                      onClick={() => handleRemoveMealPlan(meal.id)}
                                      className="text-gray-400 hover:text-red-500 p-2"
                                      aria-label="Remove from meal plan"
                                    >
                                      <Trash2 size={18} />
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="text-center py-12 bg-gray-50 rounded-lg">
                      <Calendar size={48} className="mx-auto text-gray-400 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No meals planned</h3>
                      <p className="text-gray-600 mb-4">
                        You haven't added any meals for this day yet.
                      </p>
                      <p className="text-sm text-gray-500">
                        Use the form on the left to add meals to your plan.
                      </p>
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

export default MealPlannerPage;