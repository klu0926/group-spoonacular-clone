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
		<div className="page-wrapper">
			<header className="text-center mb-4">
				<h1 className="text-4xl font-bold text-orange-500 my-2">SAVED RECIPES</h1>
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

			{/* no favorties */}
			{favorites.length === 0 ? (
				<div className="text-center py-16">
					<div className="text-6xl mb-4">🍽️</div>
					<h2 className="text-2xl font-semibold text-orange-500 mb-2">
						No Favorites Yet
					</h2>

					<Link
						href="/"
						className="inline-block bg-orange-500 hover:bg-orange-600 text-white font-semibold py-3 px-6 rounded-lg transition hover:scale-95"
					>
						Discover recipes!
					</Link>
				</div>
			) : (
				<>
					{/* FAVORITE FILTER FORM STUB w/PROPS */}
					<div className="w-full flex justify-center max-w-2xl">
						<FormFavorites
							onFilter={handleFilter}
							totalRecipes={favorites.length}
							filteredCount={filteredRecipes.length}
						/>
					</div>

					{/* Results Summary */}
					<div className="mb-6 flex justify-between items-center">
						{/* Clear filter button */}
						{Object.keys(activeFilters).length > 0 && (
							<button
								onClick={() => {
									setActiveFilters({});
									setFilteredRecipes(favorites);
								}}
								className="text-sm text-blue-600 hover:text-blue-800 underline"
							>
								Clear Filters
							</button>
						)}
					</div>

					{/* RECIPE LIST COMPONENT OF RECIPE VIEWS, WITH QUERY/FAVORITE STATE */}
					<RecipeList
						recipes={filteredRecipes}
						favorites={favorites}
						onToggleFavorite={handleRemoveFavorite}
						showFavoriteButton={true}
						showCookingModal={true}
					/>

					{/* HANDLE IF NONE MATCH FILTER */}
					{filteredRecipes.length === 0 && favorites.length > 0 && (
						<div className="text-center py-12">
							<p className="text-gray-500 text-lg">
								No recipes match your current filters. Try adjusting your criteria.
							</p>
						</div>
					)}
				</>
			)}
		</div>
	);
}
