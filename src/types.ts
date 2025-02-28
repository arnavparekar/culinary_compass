export interface Ingredient {
  id: string;
  name: string;
  category: string;
  quantity?: number;
  unit?: string;
  calories?: number;
}

export interface Recipe {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  cookingTime: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  ingredients: {
    ingredient: Ingredient;
    quantity: number;
    unit: string;
  }[];
  instructions: string[];
  chef: {
    name: string;
    avatar: string;
  };
  likes: number;
  tags: string[];
  createdAt: string;
}

export interface MealPlan {
  id: string;
  date: string;
  mealTime: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack';
  recipeId: string;
  recipe?: Recipe;
}

export interface GroceryItem {
  ingredient: Ingredient;
  quantity: number;
  unit: string;
  recipes: string[];
}