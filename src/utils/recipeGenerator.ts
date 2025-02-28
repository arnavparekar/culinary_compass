import { Ingredient, Recipe } from '../types';
import { recipes } from '../data/recipes';

// Function to generate a unique recipe based on selected ingredients
export const generateRecipe = (selectedIngredients: Ingredient[]): Recipe => {
  // Get ingredient names for easier comparison
  const ingredientNames = selectedIngredients.map(ing => ing.name.toLowerCase());
  
  // Find recipes that use at least some of the selected ingredients
  const compatibleRecipes = recipes.filter(recipe => {
    const recipeIngredientNames = recipe.ingredients.map(ing => 
      ing.ingredient.name.toLowerCase()
    );
    
    // Check if there's any overlap between selected ingredients and recipe ingredients
    return recipeIngredientNames.some(name => ingredientNames.includes(name));
  });
  
  // If we found compatible recipes, modify one of them
  if (compatibleRecipes.length > 0) {
    // Pick a random compatible recipe as a base
    const baseRecipe = {...compatibleRecipes[Math.floor(Math.random() * compatibleRecipes.length)]};
    
    // Create a new ID and modify the title
    const id = `generated-${Date.now()}`;
    const adjectives = ['Fusion', 'Creative', 'Innovative', 'Leftover', 'Improvised', 'Spontaneous'];
    const randomAdjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    
    // Create a new title based on the main ingredients
    const mainIngredients = selectedIngredients.slice(0, 2).map(ing => ing.name);
    const title = `${randomAdjective} ${mainIngredients.join(' & ')} ${baseRecipe.title.split(' ').slice(-1)[0]}`;
    
    // Update the ingredients to use the selected ones
    const newIngredients = selectedIngredients.map(ingredient => {
      return {
        ingredient,
        quantity: Math.floor(Math.random() * 3) + 1,
        unit: ingredient.category === 'Protein' ? 'oz' : 
              ingredient.category === 'Vegetable' ? 'cup' : 
              ingredient.category === 'Herb' || ingredient.category === 'Spice' ? 'tsp' : 'tbsp'
      };
    });
    
    // Generate new instructions based on the ingredients
    const newInstructions = generateInstructions(selectedIngredients);
    
    // Return the modified recipe
    return {
      ...baseRecipe,
      id,
      title,
      description: `A creative dish made with your selected ingredients: ${selectedIngredients.map(i => i.name).join(', ')}`,
      ingredients: newIngredients,
      instructions: newInstructions,
      createdAt: new Date().toISOString(),
      likes: 0
    };
  }
  
  // If no compatible recipes, create a completely new one
  return createNewRecipe(selectedIngredients);
};

// Helper function to generate cooking instructions based on ingredients
const generateInstructions = (ingredients: Ingredient[]): string[] => {
  const instructions: string[] = [];
  
  // Categorize ingredients
  const proteins = ingredients.filter(ing => ing.category === 'Protein');
  const vegetables = ingredients.filter(ing => ing.category === 'Vegetable');
  const grains = ingredients.filter(ing => ing.category === 'Grain');
  const herbs = ingredients.filter(ing => ing.category === 'Herb' || ing.category === 'Spice');
  
  // Preparation steps
  if (proteins.length > 0) {
    instructions.push(`Prepare ${proteins.map(p => p.name).join(' and ')} by cutting into bite-sized pieces.`);
  }
  
  if (vegetables.length > 0) {
    instructions.push(`Wash and chop ${vegetables.map(v => v.name).join(', ')}.`);
  }
  
  // Cooking steps
  if (grains.length > 0) {
    instructions.push(`Cook ${grains.map(g => g.name).join(' and ')} according to package instructions.`);
  }
  
  if (proteins.length > 0) {
    const cookingMethod = ['sauté', 'grill', 'roast', 'simmer'][Math.floor(Math.random() * 4)];
    instructions.push(`${cookingMethod.charAt(0).toUpperCase() + cookingMethod.slice(1)} the ${proteins.map(p => p.name).join(' and ')} until fully cooked.`);
  }
  
  if (vegetables.length > 0) {
    instructions.push(`Add vegetables and cook for 5-7 minutes until tender.`);
  }
  
  if (herbs.length > 0) {
    instructions.push(`Season with ${herbs.map(h => h.name).join(', ')} to taste.`);
  }
  
  // Finishing steps
  instructions.push('Combine all ingredients in a large bowl and mix well.');
  instructions.push('Serve hot and enjoy your creative dish!');
  
  return instructions;
};

// Function to create a completely new recipe
const createNewRecipe = (ingredients: Ingredient[]): Recipe => {
  const id = `generated-${Date.now()}`;
  
  // Generate a title based on main ingredients
  const mainIngredients = ingredients.slice(0, Math.min(2, ingredients.length));
  const dishTypes = ['Bowl', 'Stir-fry', 'Salad', 'Casserole', 'Skillet', 'Medley'];
  const randomDishType = dishTypes[Math.floor(Math.random() * dishTypes.length)];
  
  const title = `${mainIngredients.map(ing => ing.name).join(' & ')} ${randomDishType}`;
  
  // Format ingredients with random quantities
  const formattedIngredients = ingredients.map(ingredient => {
    return {
      ingredient,
      quantity: Math.floor(Math.random() * 3) + 1,
      unit: ingredient.category === 'Protein' ? 'oz' : 
            ingredient.category === 'Vegetable' ? 'cup' : 
            ingredient.category === 'Herb' || ingredient.category === 'Spice' ? 'tsp' : 'tbsp'
    };
  });
  
  // Generate instructions
  const instructions = generateInstructions(ingredients);
  
  // Calculate approximate cooking time based on ingredients
  const hasProtein = ingredients.some(ing => ing.category === 'Protein');
  const hasGrain = ingredients.some(ing => ing.category === 'Grain');
  let cookingTime = 15; // Base time
  
  if (hasProtein) cookingTime += 10;
  if (hasGrain) cookingTime += 15;
  
  // Determine difficulty
  const difficulty: 'Easy' | 'Medium' | 'Hard' = 
    ingredients.length <= 4 ? 'Easy' : 
    ingredients.length <= 7 ? 'Medium' : 'Hard';
  
  // Generate random chef
  const chefs = [
    { name: 'Chef Alex', avatar: 'https://images.unsplash.com/photo-1583394838336-acd977736f90?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=684&q=80' },
    { name: 'Chef Jordan', avatar: 'https://images.unsplash.com/photo-1566554273541-37a9ca77b91f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' },
    { name: 'Chef Morgan', avatar: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' }
  ];
  
  const randomChef = chefs[Math.floor(Math.random() * chefs.length)];
  
  // Generate tags based on ingredients
  const tags: string[] = [];
  
  if (ingredients.some(ing => ing.category === 'Vegetable') && !ingredients.some(ing => ing.category === 'Protein')) {
    tags.push('Vegetarian');
  }
  
  if (ingredients.some(ing => ing.category === 'Grain')) {
    tags.push(ingredients.find(ing => ing.category === 'Grain')?.name || 'Grain-based');
  }
  
  tags.push('Creative', 'Leftover Recipe');
  
  // Generate a random food image URL
  const foodImages = [
    'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1160&q=80',
    'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1162&q=80',
    'https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=780&q=80'
  ];
  
  const randomImage = foodImages[Math.floor(Math.random() * foodImages.length)];
  
  return {
    id,
    title,
    description: `A creative dish made with your selected ingredients: ${ingredients.map(i => i.name).join(', ')}`,
    imageUrl: randomImage,
    cookingTime,
    servings: Math.floor(Math.random() * 3) + 2, // 2-4 servings
    difficulty,
    ingredients: formattedIngredients,
    instructions,
    chef: randomChef,
    likes: 0,
    tags,
    createdAt: new Date().toISOString()
  };
};