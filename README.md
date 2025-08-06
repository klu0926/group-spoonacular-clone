This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

# Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

# Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

# Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# Routes
This application uses App Router to navigate between pages. All routes share access to the global state provided by FavoritesContext, allowing consistent management of favorite recipes across the app.


**Home**
Main page for querying recipes
* Includes a search input to query recipes from an external API
* Displays results dynamically
* Users can add any recipe to their favorites

<img width="770" height="915" alt="image" src="https://github.com/user-attachments/assets/0f54c48b-223c-483e-9da3-6250e7293791" />  


**Favorites**
Displays the user's favorite recipes
* Lists all recipes stored in favorites
* Provides query form to filter recipes
* Allows users to remove recipes

<img width="775" height="618" alt="image" src="https://github.com/user-attachments/assets/cba292c0-11fe-4cf9-a8df-22f749b64f25" />  


**About**
Provides information about the developers

<img width="780" height="251" alt="image" src="https://github.com/user-attachments/assets/b7b04897-c74c-4c6c-8305-4a136e793d14" />

<img width="779" height="298" alt="image" src="https://github.com/user-attachments/assets/e9ce0e6d-2c26-4b03-b649-088a5a14706e" />


# State Management Structure
This application uses a Context to keep the state of the user's favorite recipes. The FavoritesContext provides global access to a list of favorite recipes, enabling components throughout the app to read, add, remove, search, and analyze favorite items without prop-drilling.

**State** 
* favorites is stored in component state using useState, and synced with localStorage for persistence across sessions
* On component mount, favorites are loaded from localStorage (useEffect), and updates to favorites are saved automatically when the state changes.

**Functionality**
* Add/remove favorites
* Check if an item is a favorite
* Search through favorites
* Retrieve favorites by ID(s)
* Compute favorite-related stats (e.g., average cooking time, top cuisines/diets)
* Clear all favorites

# Components

## FormQuery.js
The FormQuery component is a dynamic, interactive search form that allows users to filter and search for recipes based on multiple criteria. It collects user input, builds a structured query object, and passes it to a parent component using the onSearch callback.

* __Form Fields:__ Includes inputs for keywords, cuisine type, dietary preferences, ingredient inclusion/exclusion, cooking time, calories, and sort options.
* __User Input Management:__ Uses React’s useState to track all form field values in `formData`.
* __Search Logic:__ On submission, the form constructs a `searchParams` object based on filled fields and triggers the onSearch function to query the API.
* __Reset Functionality:__ Provides a reset button to clear all fields back to their default values.
* __Loading State:__ Disables the search button and displays a loading spinner when loading is true.

<img width="1203" height="536" alt="image" src="https://github.com/user-attachments/assets/90f7b645-6e60-46cc-85ab-416afbfeef81" />  


## RecipeView.js  
The RecipeView component displays a recipe in a visually appealing card format, showcasing brief details like the image, title, summary, health stats, and cuisine types. It also includes interactive elements for favoriting and viewing more information in a modal.

* __Recipe Summary Display:__ Shows the title, summary (with HTML tags stripped), cooking time, servings, health score, diet badges (e.g., Vegan, Keto), and up to 3 cuisine tags.
* __Favorite Toggle:__ Displays a heart icon button that toggles the recipe’s favorite state using the `onToggleFavorite` callback.
* __Modal Integration:__ Optionally includes a "View Recipe" button that triggers a modal (CookingModal) for detailed instructions and ingredients.
* __Responsive Image & Placeholder:__ Displays the recipe image or a fallback placeholder on error.
* __External Link Access:__ Provides a button to open the original recipe source in a new tab.
* __Conditional Rendering:__ Uses props like `isFavorite`, `showFavoriteButton`, and `showCookingModal` to customize behavior and visibility.
* __User Experience Enhancements:__ Styled with Tailwind CSS for a clean, responsive layout and hover effects for interaction feedback.

<img width="289" height="390" alt="image" src="https://github.com/user-attachments/assets/88e5a98e-bf46-4d25-abef-4ef971a5e26c" />


## RecipeList.js  
The RecipeList component renders a grid of recipe cards using the RecipeView component. It handles the display logic for the list of recipes returned from a search query and manages the favorite status for each item.

* __Grid Layout:__ Displays recipe cards in a responsive grid with 1–4 columns based on screen size using Tailwind's grid utilities.
* __Early Exit Logic:__ Returns `null` if there are no recipes to show, preventing rendering of an empty container.
* __Favorite Status Handling:__ Includes an `isFavorite` helper function that checks if a recipe is marked as a favorite by comparing its ID with the favorites list.
* __Component Reusability:__ Passes props like `showFavoriteButton` and `showCookingModal` to each `RecipeView` for flexible feature toggling.
* __Recipe Count Summary:__ Displays a short message at the bottom to indicate how many recipes are currently shown.
* __Modular Rendering:__ Separates individual recipe display responsibilities to `RecipeView`, maintaining clean separation of concerns.

<img width="1241" height="874" alt="image" src="https://github.com/user-attachments/assets/dceac46f-1b5c-4924-9453-b96bfc0dd065" />


## CookingModal.js  
The CookingModal component is a detailed modal window that displays comprehensive information about a selected recipe, including ingredients, instructions, nutrition, and summary. It supports tab navigation and interactive features like ingredient checklist.

* __Modal Visibility:__ Controlled by the `isOpen` prop; renders only when open and locks background scroll.
* __Tab Navigation:__ Uses internal state to switch between tabs: Ingredients, Instructions, Nutrition, and Summary.
* __Ingredients Checklist:__ Allows users to check off ingredients as they prepare, with a reset option.
* __Instructions Formatting:__ Supports both structured step-by-step instructions and raw instruction text, parsing and displaying appropriately.
* __Nutrition Display:__ Shows key nutrient info with progress bars representing daily value percentages.
* __Summary & Additional Info:__ Displays HTML-formatted recipe summary, cuisines, dish types, and a link to the original source.
* __User Experience:__ Backdrop click and close button both dismiss the modal; uses accessible icons and responsive layout.


<img width="708" height="651" alt="image" src="https://github.com/user-attachments/assets/504c2145-b0d8-40b2-9df0-582fed979665" />
<img width="709" height="652" alt="image" src="https://github.com/user-attachments/assets/d7644073-78b2-4bc1-b873-06b3eb2bb1fc" />
<img width="706" height="523" alt="image" src="https://github.com/user-attachments/assets/0d065be8-b5cf-4c68-a1f9-7daadaa0c4b7" />
<img width="708" height="440" alt="image" src="https://github.com/user-attachments/assets/e479fe6d-2d0a-4551-a3e0-8b5283684af4" />



## FormFavorites.js  
The FormFavorites component provides a comprehensive filter form for users to narrow down their favorite recipes by multiple criteria. It manages form state locally and sends filter data back to the parent component via the onFilter callback.

* __Filter Fields:__ Includes dropdowns for cuisine, cooking time, and sorting options, plus a text input to search by ingredients.
* __Dietary Preferences:__ Provides checkboxes for multiple diet filters like vegetarian, vegan, gluten-free, dairy-free, and ketogenic.
* __State Management:__ Uses React’s useState hook to track both form fields and diet filter checkboxes.
* __Real-time Filtering:__ Applies filters immediately upon any input or checkbox change by combining all filters and calling onFilter.
* __Reset Functionality:__ Allows clearing all filters with a "Clear All Filters" button that resets form and diet states.
* __Dynamic UI Feedback:__ Displays current count of filtered recipes versus total, and only shows the reset button when filters are active.

<img width="1176" height="286" alt="image" src="https://github.com/user-attachments/assets/cee37bc0-c192-41f0-8563-b35250743bd5" />


## BioCard.js  
The BioCard component is an interactive, flip-style profile card that displays a user’s avatar and name on the front, and their bio with a GitHub link on the back. The card flips on click to reveal more information.

* __Flip Animation:__ Uses CSS 3D transforms with React state to flip the card front/back smoothly.
* __Front Side:__ Shows user image (avatar) and name centered.
* __Back Side:__ Displays the name again, a bio text, and a clickable GitHub icon linking to the user’s profile.
* __Accessibility:__ GitHub link opens in a new tab.
* __Styling:__ Uses Tailwind CSS classes.

<img width="205" height="258" alt="image" src="https://github.com/user-attachments/assets/6a788740-0e82-46c4-be01-0c2ce1abe64b" />
<img width="204" height="251" alt="image" src="https://github.com/user-attachments/assets/4bfc7cb5-96ae-4816-9ffb-18369468605c" />

## Navbar.js  
The Navbar component provides a simple navigation bar with links to Home, Favorites, and About Us pages. It highlights the active link based on the current URL path.

* __Active Link Highlighting:__ Uses Next.js `usePathname` to determine the current page and applies distinct styling to the active navigation link.
* __Reusable NavLink Component:__ Encapsulates individual links with conditional styling for active/inactive states.
* __Styling:__ Utilizes Tailwind CSS for spacing, colors, rounded corners, and layout with flexbox.
* __Next.js Integration:__ Uses `Link` from `next/link` for client-side routing.

<img width="233" height="37" alt="image" src="https://github.com/user-attachments/assets/209ce290-e156-4fd9-a6ce-b0a301a717fa" />










