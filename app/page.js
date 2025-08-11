// QUERY API PAGE
// AUTHORS Lu, Jasmine, Clarance, Noah, Darryl
"use client";

import { useState } from "react";
import { useFavorites } from "./contexts/FavoritesContext";
import FormQuery from "./components/FormQuery";
import RecipeList from "./components/RecipeList";

export default function QueryPage() {
	const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [totalResults, setTotalResults] = useState(0);
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(false);
	const [currentQuery, setCurrentQuery] = useState(null);

	const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

	const searchRecipes = async (queryParams, isLoadMore = false) => {
		setLoading(true);
		setError(null);

		try {
			const MAX_QUERY_NUMBER = 8;
			const searchOffset = isLoadMore ? offset : 0;

			const params = new URLSearchParams({
				...queryParams,
				number: String(MAX_QUERY_NUMBER),
				offset: String(searchOffset),
				// You can pass these, but the API route also enforces them server-side
				addRecipeInformation: "true",
				instructionsRequired: "true",
				addRecipeNutrition: "true",
				fillIngredients: "true",
			});

			const url = `/api/recipes?${params.toString()}`;

			const startTime = Date.now();
			const response = await fetch(url, { method: "GET" });
			const duration = Date.now() - startTime;
			console.log(`[${Date.now()}] /api/recipes finished in ${duration}ms`);

			if (!response.ok) {
				const { message } = await response.json().catch(() => ({ message: response.statusText }));
				throw new Error(message || `Failed to fetch recipes (${response.status})`);
			}

			const data = await response.json(); // { results, totalResults, ... }

			if (isLoadMore) {
				setRecipes((prev) => [...prev, ...(data.results || [])]);
			} else {
				setRecipes(data.results || []);
				setOffset(0);
			}

			setTotalResults(data.totalResults || 0);

			const returnedCount = (data.results || []).length;
			const nextOffset = searchOffset + returnedCount;

			setHasMore(returnedCount === MAX_QUERY_NUMBER && nextOffset < (data.totalResults || 0));
			setOffset(nextOffset);
			setCurrentQuery(queryParams);
		} catch (err) {
			console.error("Error fetching recipes:", err);
			setError(String(err.message || err));
		} finally {
			setLoading(false);
		}
	};

	const loadMoreRecipes = () => {
		if (currentQuery && hasMore && !loading) {
			searchRecipes(currentQuery, true);
		}
	};

	const handleToggleFavorite = (recipe) => {
		const isFavorite = favorites.some((fav) => fav.id === recipe.id);
		if (isFavorite) removeFromFavorites(recipe.id);
		else addToFavorites(recipe);
	};

	return (
		<div className="page-wrapper">
			<header className="text-center mb-4">
				<h1 className="text-2xl md:text-4xl font-bold text-orange-600 my-2">FIND RECIPES</h1>
			</header>

			<FormQuery onSearch={searchRecipes} loading={loading}>
				<FormQuery.search />
				<FormQuery.form />
			</FormQuery>

			{error && (
				<div id="error-div" className="absolute top-5 z-100 w-2xl">
					<div className="relative w-full bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
						<span><strong>Error:</strong> {error}</span>
						<button
							className="absolute p-1 rounded-full right-2 top-2 font-bold"
							type="button"
							onClick={() => {
								const errorDiv = document.getElementById("error-div");
								if (errorDiv) errorDiv.remove();
							}}
						>
							x
						</button>
					</div>
				</div>
			)}

			{totalResults > 0 && (
				<div className="mb-4 w-full py-1 mt-2 text-center">
					<p className="text-gray-400">
						Found {totalResults} recipes. Showing {recipes.length} results.
					</p>
				</div>
			)}

			<RecipeList
				recipes={recipes}
				favorites={favorites}
				onToggleFavorite={handleToggleFavorite}
				showFavoriteButton={true}
			/>

			{hasMore && (
				<div className="text-center mt-8">
					<button
						onClick={loadMoreRecipes}
						disabled={loading}
						className="bg-orange-500 hover:bg-orange-600 disabled:bg-orange-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors cursor-pointer"
					>
						{loading ? "Loading..." : "Load More Recipes"}
					</button>
				</div>
			)}

			{!loading && recipes.length === 0 && currentQuery && (
				<div className="text-center py-12">
					<p className="text-gray-500 text-lg">
						No recipes found. Try adjusting your search criteria.
					</p>
				</div>
			)}
		</div>
	);
}
