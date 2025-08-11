# Note
This is a clone of a group project, it has been alter for my person use. For the original project git please click [Here](https://github.com/klu0926/cpan144-group-project-prd).
Key Changes:
- Secured API key using Next.js backend
- Added tomato logo
- Updated layout and color scheme to match theme
- Separated search options from query bar
- Added toggle to hide/show extra search options
- Added mobile burger menu
- Optimized mobile layout
- Added footer

# Original project Team 
- [Jasmine](https://github.com/Jaysandjay)
- [BossClaw](https://github.com/BossClaw)
- [kn-mn](https://github.com/kn-mn)
- [Lu (me)](https://github.com/klu0926)

# Vercel Demo

- New Version : [https://group-spoonacular-clone.vercel.app/](https://group-spoonacular-clone.vercel.app/)

# Getting Started

1. Clone the project and move to project directory

```
git clone https://github.com/klu0926/group-spoonacular-clone.git

cd group-spoonacular-clone
```

2. Install dependencies:

```
npm i
```

3. Get your Spoonacular API key from [APILayer](https://apilayer.com/marketplace/spoonacular-api)

4. Create .env file with API key
```
SPOONACULAR_API_KEY= your key here
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


# Routes
This application uses App Router to navigate between pages. All routes share access to the global state provided by FavoritesContext, allowing consistent management of favorite recipes across the app.


**Home**
Main page for querying recipes
* Includes a search input to query recipes from an external API
* Displays results dynamically
* Users can add any recipe to their favorites

<img width="1715" height="896" alt="Image" src="https://github.com/user-attachments/assets/9a8757c9-38c7-4e66-ad3b-f79a185115eb" />


**Favorites**
Displays the user's favorite recipes
* Lists all recipes stored in favorites
* Provides query form to filter recipes
* Allows users to remove recipes

<img width="1713" height="893" alt="Image" src="https://github.com/user-attachments/assets/c49d562f-4e97-4c51-b7ee-a604df8650c3" />

**About**
Provides information about the developers

<img width="1712" height="901" alt="Image" src="https://github.com/user-attachments/assets/f874e552-a99a-45c9-97af-2f4cf29bfc1b" />

**Mobile**

<img width="494" height="893" alt="Image" src="https://github.com/user-attachments/assets/612b8830-13f9-463a-a939-865a660d516d" />

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

<img width="622" height="655" alt="Image" src="https://github.com/user-attachments/assets/067ff1e8-bb93-4a24-b3dd-6128ccdd1f44" />

## RecipeView.js  
The RecipeView component displays a recipe in a visually appealing card format, showcasing brief details like the image, title, summary, health stats, and cuisine types. It also includes interactive elements for favoriting and viewing more information in a modal.

* __Recipe Summary Display:__ Shows the title, summary (with HTML tags stripped), cooking time, servings, health score, diet badges (e.g., Vegan, Keto), and up to 3 cuisine tags.
* __Favorite Toggle:__ Displays a heart icon button that toggles the recipe’s favorite state using the `onToggleFavorite` callback.
* __Modal Integration:__ Optionally includes a "View Recipe" button that triggers a modal (CookingModal) for detailed instructions and ingredients.
* __Responsive Image & Placeholder:__ Displays the recipe image or a fallback placeholder on error.
* __External Link Access:__ Provides a button to open the original recipe source in a new tab.
* __Conditional Rendering:__ Uses props like `isFavorite`, `showFavoriteButton`, and `showCookingModal` to customize behavior and visibility.
* __User Experience Enhancements:__ Styled with Tailwind CSS for a clean, responsive layout and hover effects for interaction feedback.

<img width="285" height="436" alt="Image" src="https://github.com/user-attachments/assets/ce9b8655-3dc9-495c-8fb9-b7fb0a68f1af" />

## RecipeList.js  
The RecipeList component renders a grid of recipe cards using the RecipeView component. It handles the display logic for the list of recipes returned from a search query and manages the favorite status for each item.

* __Grid Layout:__ Displays recipe cards in a responsive grid with 1–4 columns based on screen size using Tailwind's grid utilities.
* __Early Exit Logic:__ Returns `null` if there are no recipes to show, preventing rendering of an empty container.
* __Favorite Status Handling:__ Includes an `isFavorite` helper function that checks if a recipe is marked as a favorite by comparing its ID with the favorites list.
* __Component Reusability:__ Passes props like `showFavoriteButton` and `showCookingModal` to each `RecipeView` for flexible feature toggling.
* __Recipe Count Summary:__ Displays a short message at the bottom to indicate how many recipes are currently shown.
* __Modular Rendering:__ Separates individual recipe display responsibilities to `RecipeView`, maintaining clean separation of concerns.

<img width="1406" height="855" alt="Image" src="https://github.com/user-attachments/assets/1e71a482-9f36-4d55-a01c-fa1e2266a336" />

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

<img width="658" height="436" alt="Image" src="https://github.com/user-attachments/assets/8d531e09-e164-4c3e-b3f7-a2bcdf89c23c" />

## BioCard.js  
The BioCard component is an interactive, flip-style profile card that displays a user’s avatar and name on the front, and their bio with a GitHub link on the back. The card flips on click to reveal more information.

* __Flip Animation:__ Uses CSS 3D transforms with React state to flip the card front/back smoothly.
* __Front Side:__ Shows user image (avatar) and name centered.
* __Back Side:__ Displays the name again, a bio text, and a clickable GitHub icon linking to the user’s profile.
* __Accessibility:__ GitHub link opens in a new tab.
* __Styling:__ Uses Tailwind CSS classes.

<img width="755" height="690" alt="Image" src="https://github.com/user-attachments/assets/b0d1007c-4b0f-4f23-8fb2-66eaacb8d56a" />

<img width="762" height="714" alt="Image" src="https://github.com/user-attachments/assets/a9881965-d196-47fe-8b68-ac2b6944928e" />


## Navbar.js  
The Navbar component provides a simple navigation bar with links to Home, Favorites, and About Us pages. It highlights the active link based on the current URL path.

* __Active Link Highlighting:__ Uses Next.js `usePathname` to determine the current page and applies distinct styling to the active navigation link.
* __Reusable NavLink Component:__ Encapsulates individual links with conditional styling for active/inactive states.
* __Styling:__ Utilizes Tailwind CSS for spacing, colors, rounded corners, and layout with flexbox.
* __Next.js Integration:__ Uses `Link` from `next/link` for client-side routing.

<img width="631" height="109" alt="Image" src="https://github.com/user-attachments/assets/d30b96c1-39fc-45b0-8dc4-86182666b95f" />
