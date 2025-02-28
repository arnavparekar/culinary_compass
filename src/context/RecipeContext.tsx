import React, { createContext, useContext, useState, useEffect } from 'react';
import { Recipe, MealPlan, Ingredient } from '../types';
import { recipes as initialRecipes } from '../data/recipes';
import { generateRecipe } from '../utils/recipeGenerator';

interface RecipeContextType {
  recipes: Recipe[];
  userRecipes: Recipe[];
  mealPlans: MealPlan[];
  likedRecipes: Set<string>;
  selectedRecipes: Recipe[];
  addRecipe: (recipe: Recipe) => void;
  toggleLikeRecipe: (recipeId: string) => void;
  addMealPlan: (mealPlan: MealPlan) => void;
  removeMealPlan: (mealPlanId: string) => void;
  generateNewRecipe: (ingredients: Ingredient[]) => Recipe;
  addToSelectedRecipes: (recipe: Recipe) => void;
  removeFromSelectedRecipes: (recipeId: string) => void;
  clearSelectedRecipes: () => void;
  isRecipeSelected: (recipeId: string) => boolean;
}

const RecipeContext = createContext<RecipeContextType | undefined>(undefined);

export const RecipeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [recipes, setRecipes] = useState<Recipe[]>(initialRecipes);
  const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([]);
  const [likedRecipes, setLikedRecipes] = useState<Set<string>>(new Set());
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);

  // Load data from localStorage on initial render
  useEffect(() => {
    const storedUserRecipes = localStorage.getItem('userRecipes');
    const storedMealPlans = localStorage.getItem('mealPlans');
    const storedLikedRecipes = localStorage.getItem('likedRecipes');
    const storedSelectedRecipes = localStorage.getItem('selectedRecipes');

    if (storedUserRecipes) {
      setUserRecipes(JSON.parse(storedUserRecipes));
    }
    
    if (storedMealPlans) {
      setMealPlans(JSON.parse(storedMealPlans));
    }
    
    if (storedLikedRecipes) {
      setLikedRecipes(new Set(JSON.parse(storedLikedRecipes)));
    }
    
    if (storedSelectedRecipes) {
      setSelectedRecipes(JSON.parse(storedSelectedRecipes));
    }
  }, []);

  // Save data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('userRecipes', JSON.stringify(userRecipes));
  }, [userRecipes]);

  useEffect(() => {
    localStorage.setItem('mealPlans', JSON.stringify(mealPlans));
  }, [mealPlans]);

  useEffect(() => {
    localStorage.setItem('likedRecipes', JSON.stringify([...likedRecipes]));
  }, [likedRecipes]);

  useEffect(() => {
    localStorage.setItem('selectedRecipes', JSON.stringify(selectedRecipes));
  }, [selectedRecipes]);

  const addRecipe = (recipe: Recipe) => {
    setUserRecipes(prev => [...prev, recipe]);
  };

  const toggleLikeRecipe = (recipeId: string) => {
    setLikedRecipes(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(recipeId)) {
        newLiked.delete(recipeId);
      } else {
        newLiked.add(recipeId);
      }
      return newLiked;
    });
    
    // Update like count in recipes
    setRecipes(prev => 
      prev.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, likes: likedRecipes.has(recipeId) ? recipe.likes - 1 : recipe.likes + 1 } 
          : recipe
      )
    );
    
    setUserRecipes(prev => 
      prev.map(recipe => 
        recipe.id === recipeId 
          ? { ...recipe, likes: likedRecipes.has(recipeId) ? recipe.likes - 1 : recipe.likes + 1 } 
          : recipe
      )
    );
  };

  const addMealPlan = (mealPlan: MealPlan) => {
    setMealPlans(prev => [...prev, mealPlan]);
  };

  const removeMealPlan = (mealPlanId: string) => {
    setMealPlans(prev => prev.filter(mp => mp.id !== mealPlanId));
  };

  const generateNewRecipe = (ingredients: Ingredient[]): Recipe => {
    const newRecipe = generateRecipe(ingredients);
    addRecipe(newRecipe);
    return newRecipe;
  };

  const addToSelectedRecipes = (recipe: Recipe) => {
    if (!selectedRecipes.some(r => r.id === recipe.id)) {
      setSelectedRecipes(prev => [...prev, recipe]);
    }
  };

  const removeFromSelectedRecipes = (recipeId: string) => {
    setSelectedRecipes(prev => prev.filter(recipe => recipe.id !== recipeId));
  };

  const clearSelectedRecipes = () => {
    setSelectedRecipes([]);
  };

  const isRecipeSelected = (recipeId: string): boolean => {
    return selectedRecipes.some(recipe => recipe.id === recipeId);
  };

  const value = {
    recipes: [...recipes, ...userRecipes],
    userRecipes,
    mealPlans,
    likedRecipes,
    selectedRecipes,
    addRecipe,
    toggleLikeRecipe,
    addMealPlan,
    removeMealPlan,
    generateNewRecipe,
    addToSelectedRecipes,
    removeFromSelectedRecipes,
    clearSelectedRecipes,
    isRecipeSelected
  };

  return <RecipeContext.Provider value={value}>{children}</RecipeContext.Provider>;
};

export const useRecipes = () => {
  const context = useContext(RecipeContext);
  if (context === undefined) {
    throw new Error('useRecipes must be used within a RecipeProvider');
  }
  return context;
};