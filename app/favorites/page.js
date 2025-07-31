// FAVORITES PAGE STUB
// AUTHORS Lu, Clarance, Noah, Jasmine, Darryl
"use client";

// IMPORT REACT LOGIC - TBD ONLY WHAT'S NEEDED
import { useState, useEffect } from "react";

// IMPORT NEXT LINK - FOR EXTERNAL ORIG SOURCE LINKING?
import Link from "next/link";

// IMPORT THE FAVORITES LOGIC
import { useFavorites } from "../contexts/FavoritesContext";

// IMPORT THE COMPONENT STUBS TO DISPLAY FORM AND LIST OF RECIPES
import FormFavorites from "../components/FormFavorites";
import RecipeList from "../components/RecipeList";

export default function FavoritesPage() {
	// WIP - FAVORITES CONTEXT VALUE & REMOVE
	const { favorites, removeFromFavorites } = useFavorites();

	// TODO - FILTERING THE FAVORITES
	const [filteredRecipes, setFilteredRecipes] = useState([]);

	// TODO - THE USER FILTERS FROM THE FORM
	const [activeFilters, setActiveFilters] = useState({});

	// WIP - USE THE EFFECT TO SET RECIPES
	useEffect(() => {
		setFilteredRecipes(favorites);
	}, [favorites]);

	// TODO - MATCH WIREFRAME / SPEC
	// TODO - ?????

	// TODO - ???? HANDLE FILTERING THE RECIPES AS RECIPES TO SHOW
	const handleFilter = (filters) => {
		// UPDATE THE ACTIVE FILTERS
		setActiveFilters(filters);

		// START FITLERED WITH ALL RECIPES, THEN REMOVE
		// TBD - REMOVE IS EASIER THAN ADD, BECAUSE NO CHANCE OF RE-ADD INVALID
		let filtered = [...favorites];

		// TODO - CUISINE STRING
		// TODO - DIET FILTERS
		// TODO - INGREDIENT FILTERS
		// TODO - OTHER API AVAIL LOGIC ON THE recipe OBJ

		// TODO - SORTING  TBD... DO WE REALLY NEED SORTING?
		// Apply cuisine filter
		if (filters.cuisine && filters.cuisine !== "all") {
			filtered = filtered.filter((recipe) => recipe.cuisines && recipe.cuisines.some((cuisine) => cuisine.toLowerCase().includes(filters.cuisine.toLowerCase())));
		}

		// Apply diet filters
		if (filters.diets && filters.diets.length > 0) {
			filtered = filtered.filter((recipe) => recipe.diets && filters.diets.every((diet) => recipe.diets.some((recipeDiet) => recipeDiet.toLowerCase().includes(diet.toLowerCase()))));
		}

		// Apply ready time filter
		if (filters.maxReadyTime) {
			filtered = filtered.filter((recipe) => recipe.readyInMinutes <= filters.maxReadyTime);
		}

		// Apply ingredient search
		if (filters.includeIngredients) {
			const searchTerms = filters.includeIngredients
				.toLowerCase()
				.split(",")
				.map((term) => term.trim());
			filtered = filtered.filter((recipe) => recipe.extendedIngredients && searchTerms.some((term) => recipe.extendedIngredients.some((ingredient) => ingredient.name.toLowerCase().includes(term))));
		}

		// Apply sorting
		if (filters.sortBy) {
			filtered.sort((a, b) => {
				switch (filters.sortBy) {
					case "readyTime":
						return a.readyInMinutes - b.readyInMinutes;
					case "title":
						return a.title.localeCompare(b.title);
					case "healthScore":
						return (b.healthScore || 0) - (a.healthScore || 0);
					default:
						return 0;
				}
			});
		}

		// SET THE NEW LIST FILTERED STATE VAR
		setFilteredRecipes(filtered);
	};

	// WIP - IMPLMENTING REMOVE FUNCTION FROM CONTEXT
	const handleRemoveFavorite = (recipe) => {
		removeFromFavorites(recipe.id);
	};

	// WIP - CLEAR
	const clearAllFavorites = () => {
		if (window.confirm("Are you sure you want to remove all favorites?")) {
			favorites.forEach((recipe) => removeFromFavorites(recipe.id));
		}
	};

	// TODO - RETURN THE PAGE OF FILTERED RECIPES
	return (
		// TODO - GET THE STYLES MATCHING WIREFRAME & NAV BAR & FIRST PAGE
		<div className="container  min-h-screen mx-auto px-4 py-8 bg-white rounded-lg">
			<header className="text-center mb-8">
				<h1 className="text-4xl font-bold text-gray-800 mb-2">Saved Recipes</h1>
			</header>

			{favorites.length === 0 ? (
				// TODO - PROPER UX HANDLE IF NO RECIPES FAVORITED
				<span>No favorites picked - go pick some!</span>
			) : (
				<>
					{/* WIP - FAVORITE FILTER FORM STUB w/PROPS */}
					<div>
						<FormFavorites
							onFilter={handleFilter}
							totalRecipes={favorites.length}
							filteredCount={filteredRecipes.length}
						/>
					</div>

					{/* WIP - RECIPE LIST COMPONENT OF RECIPE VIEWS, WITH QUERY/FAVORITE STATE */}
					<RecipeList
						recipes={filteredRecipes}
						favorites={favorites}
						onToggleFavorite={handleRemoveFavorite}
						showFavoriteButton={true}
						showCookingModal={true}
					/>

					{/* TODO - HANDLE IF NONE MATCH FILTER */}
				</>
			)}
		</div>
	);
}
