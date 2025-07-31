// FAVORITES PAGE STUB
// AUTHORS Lu, Clarance, Noah, Jasmine, Darryl
"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useFavorites } from "../contexts/FavoritesContext";
import FormFavorites from "../components/FormFavorites";
import RecipeList from "../components/RecipeList";

export default function FavoritesPage() {
	// FAVORITES CONTEXT VALUE & REMOVE
	const { favorites, removeFromFavorites } = useFavorites();

	// FILTERING THE FAVORITES
	const [filteredRecipes, setFilteredRecipes] = useState([]);

	//  THE USER FILTERS FROM THE FORM
	const [activeFilters, setActiveFilters] = useState({});

	// USE THE EFFECT TO SET RECIPES
	useEffect(() => {
		setFilteredRecipes(favorites);
	}, [favorites]);

	// HANDLE FILTERING THE RECIPES AS RECIPES TO SHOW
	const handleFilter = (filters) => {
		// UPDATE THE ACTIVE FILTERS
		setActiveFilters(filters);

		// START FITLERED WITH ALL RECIPES, THEN REMOVE
		// REMOVE IS EASIER THAN ADD, BECAUSE NO CHANCE OF RE-ADD INVALID
		let filtered = [...favorites];

		// Apply cuisine filter
		if (filters.cuisine && filters.cuisine !== "all") {
			filtered = filtered.filter((recipe) => 
				recipe.cuisines && recipe.cuisines.some((cuisine) => 
					cuisine.toLowerCase().includes(filters.cuisine.toLowerCase())
				)
			);
		}

		// Apply diet filters
		if (filters.diets && filters.diets.length > 0) {
			filtered = filtered.filter((recipe) => 
				recipe.diets && filters.diets.every((diet) => 
					recipe.diets.some((recipeDiet) => 
						recipeDiet.toLowerCase().includes(diet.toLowerCase())
					)
				)
			);
		}

		// Apply ready time filter
		if (filters.maxReadyTime) {
			filtered = filtered.filter((recipe) => 
				recipe.readyInMinutes <= filters.maxReadyTime
			);
		}

		// Apply ingredient search
		if (filters.includeIngredients) {
			const searchTerms = filters.includeIngredients
				.toLowerCase()
				.split(",")
				.map((term) => term.trim());

			filtered = filtered.filter((recipe) => 
				recipe.extendedIngredients && searchTerms.some((term) => 
					recipe.extendedIngredients.some((ingredient) => 
						ingredient.name.toLowerCase().includes(term)
					)
				)
			);
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

	// IMPLMENTING REMOVE FUNCTION FROM CONTEXT
	const handleRemoveFavorite = (recipe) => {
		removeFromFavorites(recipe.id);
	};

	// CLEAR ALL FAVORITES
	const clearAllFavorites = () => {
		if (window.confirm("Are you sure you want to remove all favorites?")) {
			favorites.forEach((recipe) => removeFromFavorites(recipe.id));
		}
	};


	return (
		<div className="container  min-h-screen mx-auto px-4 py-8 bg-white rounded-lg">
			<header className="text-center mb-8">
				<h1 className="text-4xl font-bold text-gray-800 mb-2">Saved Recipes</h1>
				<p className="text-gray-600">Your saved recipes, ready for cooking</p>
				{favorites.length > 0 && (
					<div className="mt-4 flex justify-center items-center gap-4">
						<span className="text-sm text-gray-500">
						{favorites.length} recipe{favorites.length !== 1 ? 's' : ''} saved
						</span>
						<button
						onClick={clearAllFavorites}
						className="text-sm text-red-600 hover:text-red-800 underline"
						>
						Clear All
						</button>
					</div>
					)}
			</header>

			{favorites.length === 0 ? (
				
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
