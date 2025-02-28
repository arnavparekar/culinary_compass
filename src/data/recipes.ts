import { Recipe } from '../types';

export const recipes: Recipe[] = [
  {
    id: '1',
    title: 'Garlic Butter Salmon',
    description: 'Delicious salmon fillets pan-seared with garlic butter sauce',
    imageUrl: 'https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    cookingTime: 25,
    servings: 2,
    difficulty: 'Medium',
    ingredients: [
      { ingredient: { id: '3', name: 'Salmon', category: 'Protein', calories: 208 }, quantity: 2, unit: 'fillets' },
      { ingredient: { id: '23', name: 'Butter', category: 'Dairy', calories: 717 }, quantity: 2, unit: 'tbsp' },
      { ingredient: { id: '12', name: 'Garlic', category: 'Vegetable', calories: 4 }, quantity: 3, unit: 'cloves' },
      { ingredient: { id: '31', name: 'Lemon', category: 'Fruit', calories: 29 }, quantity: 1, unit: 'whole' },
      { ingredient: { id: '26', name: 'Rosemary', category: 'Herb', calories: 131 }, quantity: 2, unit: 'sprigs' },
      { ingredient: { id: '27', name: 'Thyme', category: 'Herb', calories: 101 }, quantity: 2, unit: 'sprigs' },
      { ingredient: { id: '35', name: 'Olive Oil', category: 'Oil', calories: 884 }, quantity: 1, unit: 'tbsp' },
    ],
    instructions: [
      'Season salmon fillets with salt and pepper.',
      'Heat olive oil in a large skillet over medium-high heat.',
      'Add salmon skin-side down and cook for 4-5 minutes until crispy.',
      'Flip salmon and add butter, garlic, lemon slices, rosemary, and thyme to the pan.',
      'Spoon the melted butter over the salmon continuously for 2-3 minutes.',
      'Remove from heat and serve with the garlic butter sauce drizzled on top.'
    ],
    chef: {
      name: 'Emma Wilson',
      avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    likes: 342,
    tags: ['Seafood', 'Dinner', 'High Protein', 'Keto'],
    createdAt: '2023-09-15T14:30:00Z'
  },
  {
    id: '2',
    title: 'Vegetarian Buddha Bowl',
    description: 'Nutritious bowl packed with colorful vegetables, quinoa, and tahini dressing',
    imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    cookingTime: 30,
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      { ingredient: { id: '18', name: 'Quinoa', category: 'Grain', calories: 120 }, quantity: 1, unit: 'cup' },
      { ingredient: { id: '7', name: 'Spinach', category: 'Vegetable', calories: 23 }, quantity: 2, unit: 'cups' },
      { ingredient: { id: '33', name: 'Avocado', category: 'Fruit', calories: 160 }, quantity: 1, unit: 'whole' },
      { ingredient: { id: '10', name: 'Carrots', category: 'Vegetable', calories: 41 }, quantity: 2, unit: 'medium' },
      { ingredient: { id: '8', name: 'Broccoli', category: 'Vegetable', calories: 34 }, quantity: 1, unit: 'cup' },
      { ingredient: { id: '4', name: 'Tofu', category: 'Protein', calories: 76 }, quantity: 200, unit: 'g' },
      { ingredient: { id: '35', name: 'Olive Oil', category: 'Oil', calories: 884 }, quantity: 2, unit: 'tbsp' },
    ],
    instructions: [
      'Cook quinoa according to package instructions.',
      'Dice tofu and sauté until golden brown.',
      'Steam broccoli until tender-crisp.',
      'Slice carrots and avocado.',
      'Arrange all ingredients in a bowl over a bed of spinach.',
      'Drizzle with tahini dressing and serve.'
    ],
    chef: {
      name: 'Maya Green',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=761&q=80'
    },
    likes: 289,
    tags: ['Vegetarian', 'Healthy', 'Lunch', 'Meal Prep'],
    createdAt: '2023-10-02T09:15:00Z'
  },
  {
    id: '3',
    title: 'Classic Spaghetti Carbonara',
    description: 'Authentic Italian pasta dish with eggs, cheese, pancetta, and black pepper',
    imageUrl: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
    cookingTime: 20,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      { ingredient: { id: '17', name: 'Pasta', category: 'Grain', calories: 131 }, quantity: 400, unit: 'g' },
      { ingredient: { id: '5', name: 'Eggs', category: 'Protein', calories: 78 }, quantity: 4, unit: 'large' },
      { ingredient: { id: '21', name: 'Cheese', category: 'Dairy', calories: 113 }, quantity: 100, unit: 'g' },
      { ingredient: { id: '30', name: 'Black Pepper', category: 'Spice', calories: 251 }, quantity: 2, unit: 'tsp' },
    ],
    instructions: [
      'Cook spaghetti in salted water until al dente.',
      'While pasta cooks, whisk eggs and grated cheese in a bowl.',
      'Cook pancetta until crispy, then remove from heat.',
      'Drain pasta, reserving some cooking water.',
      'Quickly toss hot pasta with egg mixture and pancetta.',
      'Add pasta water as needed to create a creamy sauce.',
      'Season generously with freshly ground black pepper and serve immediately.'
    ],
    chef: {
      name: 'Marco Rossi',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    likes: 421,
    tags: ['Italian', 'Pasta', 'Dinner', 'Quick'],
    createdAt: '2023-08-20T18:45:00Z'
  },
  {
    id: '4',
    title: 'Spicy Thai Basil Chicken',
    description: 'Aromatic stir-fry with chicken, Thai basil, and chili peppers',
    imageUrl: 'https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    cookingTime: 15,
    servings: 3,
    difficulty: 'Medium',
    ingredients: [
      { ingredient: { id: '1', name: 'Chicken Breast', category: 'Protein', calories: 165 }, quantity: 500, unit: 'g' },
      { ingredient: { id: '24', name: 'Basil', category: 'Herb', calories: 22 }, quantity: 1, unit: 'cup' },
      { ingredient: { id: '9', name: 'Bell Peppers', category: 'Vegetable', calories: 31 }, quantity: 1, unit: 'medium' },
      { ingredient: { id: '11', name: 'Onions', category: 'Vegetable', calories: 40 }, quantity: 1, unit: 'medium' },
      { ingredient: { id: '12', name: 'Garlic', category: 'Vegetable', calories: 4 }, quantity: 4, unit: 'cloves' },
      { ingredient: { id: '36', name: 'Soy Sauce', category: 'Condiment', calories: 53 }, quantity: 2, unit: 'tbsp' },
    ],
    instructions: [
      'Mince garlic and slice onions and bell peppers.',
      'Dice chicken breast into small pieces.',
      'Heat oil in a wok over high heat.',
      'Add garlic and stir-fry until fragrant.',
      'Add chicken and cook until no longer pink.',
      'Add vegetables and stir-fry for 2-3 minutes.',
      'Add soy sauce and other seasonings.',
      'Toss in Thai basil leaves and cook until wilted.',
      'Serve hot with steamed rice.'
    ],
    chef: {
      name: 'Lily Chen',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=688&q=80'
    },
    likes: 378,
    tags: ['Thai', 'Spicy', 'Quick', 'Dinner'],
    createdAt: '2023-11-05T12:20:00Z'
  },
  {
    id: '5',
    title: 'Avocado Toast with Poached Eggs',
    description: 'Simple yet delicious breakfast with creamy avocado and perfectly poached eggs',
    imageUrl: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80',
    cookingTime: 15,
    servings: 2,
    difficulty: 'Easy',
    ingredients: [
      { ingredient: { id: '19', name: 'Bread', category: 'Grain', calories: 265 }, quantity: 2, unit: 'slices' },
      { ingredient: { id: '33', name: 'Avocado', category: 'Fruit', calories: 160 }, quantity: 1, unit: 'ripe' },
      { ingredient: { id: '5', name: 'Eggs', category: 'Protein', calories: 78 }, quantity: 2, unit: 'large' },
      { ingredient: { id: '31', name: 'Lemon', category: 'Fruit', calories: 29 }, quantity: 0.5, unit: 'small' },
      { ingredient: { id: '30', name: 'Black Pepper', category: 'Spice', calories: 251 }, quantity: 0.25, unit: 'tsp' },
    ],
    instructions: [
      'Toast bread slices until golden brown.',
      'Mash ripe avocado with lemon juice, salt, and pepper.',
      'Bring water to a gentle simmer for poaching eggs.',
      'Crack each egg into a small bowl, then slide into simmering water.',
      'Poach eggs for 3-4 minutes until whites are set but yolks are still runny.',
      'Spread mashed avocado on toast slices.',
      'Top each toast with a poached egg.',
      'Season with salt, pepper, and red pepper flakes if desired.'
    ],
    chef: {
      name: 'Sophie Taylor',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80'
    },
    likes: 256,
    tags: ['Breakfast', 'Healthy', 'Quick', 'Vegetarian'],
    createdAt: '2023-12-10T08:30:00Z'
  },
  {
    id: '6',
    title: 'Homemade Margherita Pizza',
    description: 'Classic Italian pizza with fresh tomatoes, mozzarella, and basil',
    imageUrl: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1169&q=80',
    cookingTime: 45,
    servings: 4,
    difficulty: 'Medium',
    ingredients: [
      { ingredient: { id: '19', name: 'Bread', category: 'Grain', calories: 265 }, quantity: 500, unit: 'g' },
      { ingredient: { id: '13', name: 'Tomatoes', category: 'Vegetable', calories: 18 }, quantity: 4, unit: 'medium' },
      { ingredient: { id: '21', name: 'Cheese', category: 'Dairy', calories: 113 }, quantity: 200, unit: 'g' },
      { ingredient: { id: '24', name: 'Basil', category: 'Herb', calories: 22 }, quantity: 1, unit: 'bunch' },
      { ingredient: { id: '35', name: 'Olive Oil', category: 'Oil', calories: 884 }, quantity: 2, unit: 'tbsp' },
      { ingredient: { id: '12', name: 'Garlic', category: 'Vegetable', calories: 4 }, quantity: 2, unit: 'cloves' },
    ],
    instructions: [
      'Prepare pizza dough and let it rise for 1-2 hours.',
      'Preheat oven to 475°F (245°C) with a pizza stone if available.',
      'Roll out dough into a 12-inch circle.',
      'Brush dough with olive oil and minced garlic.',
      'Top with sliced tomatoes and torn mozzarella pieces.',
      'Bake for 10-12 minutes until crust is golden and cheese is bubbly.',
      'Remove from oven and top with fresh basil leaves.',
      'Drizzle with olive oil before serving.'
    ],
    chef: {
      name: 'Antonio Russo',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
    },
    likes: 389,
    tags: ['Italian', 'Pizza', 'Dinner', 'Vegetarian'],
    createdAt: '2024-01-05T19:15:00Z'
  }
];

export const tags = [...new Set(recipes.flatMap(recipe => recipe.tags))];