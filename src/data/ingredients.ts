import { Ingredient } from '../types';

export const ingredients: Ingredient[] = [
  // Proteins
  { id: '1', name: 'Chicken Breast', category: 'Protein', calories: 165 },
  { id: '2', name: 'Ground Beef', category: 'Protein', calories: 250 },
  { id: '3', name: 'Salmon', category: 'Protein', calories: 208 },
  { id: '4', name: 'Tofu', category: 'Protein', calories: 76 },
  { id: '5', name: 'Eggs', category: 'Protein', calories: 78 },
  { id: '6', name: 'Shrimp', category: 'Protein', calories: 99 },
  
  // Vegetables
  { id: '7', name: 'Spinach', category: 'Vegetable', calories: 23 },
  { id: '8', name: 'Broccoli', category: 'Vegetable', calories: 34 },
  { id: '9', name: 'Bell Peppers', category: 'Vegetable', calories: 31 },
  { id: '10', name: 'Carrots', category: 'Vegetable', calories: 41 },
  { id: '11', name: 'Onions', category: 'Vegetable', calories: 40 },
  { id: '12', name: 'Garlic', category: 'Vegetable', calories: 4 },
  { id: '13', name: 'Tomatoes', category: 'Vegetable', calories: 18 },
  { id: '14', name: 'Potatoes', category: 'Vegetable', calories: 77 },
  { id: '15', name: 'Mushrooms', category: 'Vegetable', calories: 22 },
  
  // Grains
  { id: '16', name: 'Rice', category: 'Grain', calories: 130 },
  { id: '17', name: 'Pasta', category: 'Grain', calories: 131 },
  { id: '18', name: 'Quinoa', category: 'Grain', calories: 120 },
  { id: '19', name: 'Bread', category: 'Grain', calories: 265 },
  
  // Dairy
  { id: '20', name: 'Milk', category: 'Dairy', calories: 42 },
  { id: '21', name: 'Cheese', category: 'Dairy', calories: 113 },
  { id: '22', name: 'Yogurt', category: 'Dairy', calories: 59 },
  { id: '23', name: 'Butter', category: 'Dairy', calories: 717 },
  
  // Herbs & Spices
  { id: '24', name: 'Basil', category: 'Herb', calories: 22 },
  { id: '25', name: 'Cilantro', category: 'Herb', calories: 23 },
  { id: '26', name: 'Rosemary', category: 'Herb', calories: 131 },
  { id: '27', name: 'Thyme', category: 'Herb', calories: 101 },
  { id: '28', name: 'Cumin', category: 'Spice', calories: 375 },
  { id: '29', name: 'Paprika', category: 'Spice', calories: 282 },
  { id: '30', name: 'Black Pepper', category: 'Spice', calories: 251 },
  
  // Fruits
  { id: '31', name: 'Lemon', category: 'Fruit', calories: 29 },
  { id: '32', name: 'Lime', category: 'Fruit', calories: 30 },
  { id: '33', name: 'Avocado', category: 'Fruit', calories: 160 },
  { id: '34', name: 'Berries', category: 'Fruit', calories: 57 },
  
  // Oils & Condiments
  { id: '35', name: 'Olive Oil', category: 'Oil', calories: 884 },
  { id: '36', name: 'Soy Sauce', category: 'Condiment', calories: 53 },
  { id: '37', name: 'Honey', category: 'Condiment', calories: 304 },
  { id: '38', name: 'Vinegar', category: 'Condiment', calories: 21 },
];

export const categories = [...new Set(ingredients.map(ing => ing.category))];