import { Recipe, GroceryItem } from '../types';

export const generateGroceryList = (recipes: Recipe[]): GroceryItem[] => {
  const groceryMap = new Map<string, GroceryItem>();
  
  // Process each recipe
  recipes.forEach(recipe => {
    // Process each ingredient in the recipe
    recipe.ingredients.forEach(({ ingredient, quantity, unit }) => {
      const ingredientId = ingredient.id;
      
      // If ingredient already exists in grocery list, update quantity
      if (groceryMap.has(ingredientId)) {
        const existingItem = groceryMap.get(ingredientId)!;
        
        // Only add quantity if units match, otherwise keep as separate items
        if (existingItem.unit === unit) {
          existingItem.quantity += quantity;
        } else {
          // Create a new entry with a modified ID for different unit
          const newId = `${ingredientId}-${unit}`;
          if (!groceryMap.has(newId)) {
            groceryMap.set(newId, {
              ingredient,
              quantity,
              unit,
              recipes: [recipe.title]
            });
          } else {
            const item = groceryMap.get(newId)!;
            item.quantity += quantity;
            if (!item.recipes.includes(recipe.title)) {
              item.recipes.push(recipe.title);
            }
          }
        }
        
        // Add recipe to the list if not already there
        if (!existingItem.recipes.includes(recipe.title)) {
          existingItem.recipes.push(recipe.title);
        }
      } else {
        // Add new ingredient to grocery list
        groceryMap.set(ingredientId, {
          ingredient,
          quantity,
          unit,
          recipes: [recipe.title]
        });
      }
    });
  });
  
  // Convert map to array and sort by category
  return Array.from(groceryMap.values()).sort((a, b) => 
    a.ingredient.category.localeCompare(b.ingredient.category)
  );
};

// Calculate total calories for a grocery list
export const calculateTotalCalories = (groceryList: GroceryItem[]): number => {
  return groceryList.reduce((total, item) => {
    // Calculate calories based on quantity and unit
    const caloriesPerUnit = item.ingredient.calories || 0;
    let calorieMultiplier = 1;
    
    // Adjust multiplier based on unit
    if (item.unit === 'cup') calorieMultiplier = 2;
    else if (item.unit === 'tbsp') calorieMultiplier = 0.25;
    else if (item.unit === 'tsp') calorieMultiplier = 0.08;
    
    return total + (caloriesPerUnit * item.quantity * calorieMultiplier);
  }, 0);
};