// QUERY API PAGE
// AUTHORS Lu, Jasmine, Clarance, Noah, Darryl
"use client";

// DEF USE STATE, EFFECT TBD
import { useState, useEffect } from "react";
// WIP - ADDING FAVORTIES CONTEXT
import { useFavorites } from "./contexts/FavoritesContext";

// IMP THE FORM QUERY COMPONENT
import FormQuery from "./components/FormQuery";
// NOTE - LIST STILL JUST STUB
import RecipeList from "./components/RecipeList";

export default function QueryPage() {
	// TODO - USE THE FAVORITES CONTEXT

	// THE RECIPIES, LOADING & ERROR
	const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);

	// RESULTS
	const [totalResults, setTotalResults] = useState(0);

	// OFFSET WILL BE FOR LOADMORE LOGIC
	const [offset, setOffset] = useState(0);
	const [hasMore, setHasMore] = useState(false);

	// FOR THE USER INPUT FORM
	const [currentQuery, setCurrentQuery] = useState(null);

	// WIP THE FAVORITES CONTEXT VALS & LOGIC
	const { favorites, addToFavorites, removeFromFavorites } = useFavorites();

	// HANDLE RECIPES SEARCH FROM FORM QUERY AND IF LOAD MORE BUTTON PRESSED
	const searchRecipes = async (queryParams, isLoadMore = false) => {
		// WIP - MAKING API QUERY AND FILLING PAGE STATE VARS
		console.log("RUNNING SEARCH RECIPES");

		// WIP - SET LOADING AND RESET ERROR
		setLoading(true);
		setError(null);

		// BEGIN ATTEMPT AT API QUERY
		try {
			// GET THE KEY FROM THE ENV FILE
			// NOTE - LOCAL DEV HAS THEIR OWN FILE
			// NOTE - ONLY KEYS PREFIXED WITH NEXT_PUBLIC ARE AVAIL TO THE WEB/CLIENT SIDE
			const apiKey = process.env.NEXT_PUBLIC_API_KEY;
			console.log("ENV API_KEY[" + process.env.NEXT_PUBLIC_API_KEY + "]");
			console.log("USING APIKEY[" + apiKey + "]");

			// WIP - UPDATE THE SEARCHOFFSET FOR LOADMORE BUTTON
			const searchOffset = isLoadMore ? offset : 0;

			// MAKE THE URL BASE
			var url = "https://api.apilayer.com/spoonacular";

			// ADD THE ENDPOINT
			url += "/recipes/complexSearch?";

			// MAKE THE QUERY STRING
			var query_str = "";

			// ENFORCE MAX RETURN AND CURRENT OFFSET
			// NOTE - API DEFAULT IS SUPPOSED TO BE 10, BUT I DON'T TRUST IT
			const MAX_QUERY_NUMBER = 8;
			queryParams.number = MAX_QUERY_NUMBER;
			queryParams.offset = searchOffset;
			queryParams.addRecipeInformation = true;
			queryParams.instructionsRequired = true;
			queryParams.addRecipeNutrition = true;
			queryParams.fillIngredients = true;

			// ADD THE QUERY VALS TO THE URL
			console.log("QUERY PARAMS OBJ FROM THE FORM");
			console.log(queryParams);

			// MAKE SEARCH PARAMS OBJ
			const searchParams = new URLSearchParams({
				...queryParams,
			});

			// MAKE QUERY STRING
			var query_str = searchParams.toString();
			console.log("USING QUERY STRING[" + query_str + "]");

			// ADD QUERY TO URL
			url += query_str;
			console.log("USING URL[" + url + "]");

			// NOTE BEFORE THE FETCH
			var startTime = Date.now();
			console.log("[" + Date.now().toString() + "] FETCH STARTED");

			// V2DO - SPINNER?

			// AWAIT THE RESPONSE DIRECT, FRONTEND
			// TODO - CHANGE TO PROPOSAL FETCH, THEN, THEN, CATCH etc...
			const response = await fetch(url, {
				headers: {
					apikey: apiKey,
				},
			});

			// TIME
			var endTime = Date.now();
			var duration = endTime - startTime;
			console.log("[" + Date.now().toString() + "] FETCH FINISHED IN (" + duration + "ms)");

			// EVAL THE RESPONSE
			if (!response.ok) {
				console.log("REPONSE NOT OK!![" + response.status + "]");
				throw new Error("Failed to fetch recipes " + response.statusText);
			}

			// DESERIALIZE THE QUERY DATA AS AN ARRAY OF RECIPE OBJECTS
			const query_returned_recipe_obj_arr = await response.json();

			// HANDLE IF QUERY WAS FROM LOADMORE
			// NOTE - CHANGE OF QUERY, RESETS
			if (isLoadMore) {
				setRecipes((prev) => [...prev, ...query_returned_recipe_obj_arr.results]);
			} else {
				setRecipes(query_returned_recipe_obj_arr.results);
				setOffset(0);
			}

			// UPDATE VALS
			setTotalResults(query_returned_recipe_obj_arr.totalResults);

			// DUMP TOTAL TO CONSOLE
			console.log("TOTAL RESULTS[" + query_returned_recipe_obj_arr.totalResults + "]");

			// UPDATE VIZ OF HAS MORE BUTTON
			setHasMore(query_returned_recipe_obj_arr.results.length === MAX_QUERY_NUMBER && searchOffset + MAX_QUERY_NUMBER < query_returned_recipe_obj_arr.totalResults);

			// UPDATE THE OFFSET STATE VAR VALUE
			setOffset(searchOffset + query_returned_recipe_obj_arr.results.length);

			// UPDAT THE FORM QUERY PARAMS
			setCurrentQuery(queryParams);
		} catch (err) {
			setError(err.message);
			console.error("Error fetching recipes:", err);
		} finally {
			setLoading(false);
		}
	};

	// WIP - LOAD MORE BUTTON HANDLING
	const loadMoreRecipes = () => {
		if (currentQuery && hasMore && !loading) {
			searchRecipes(currentQuery, true);
		}
	};

	// WIP - TOGGLE FAVORITES ON QUERY RESULT
	const handleToggleFavorite = (recipe) => {
		// DETERMIME IF RECIPE IS FAVORITE IF favorites context HAS ANY MATCHING ID
		const isFavorite = favorites.some((fav) => fav.id === recipe.id);

		// UPDATE RECIPE FAVORITE STATE & BUTTON VIZ
		if (isFavorite) {
			removeFromFavorites(recipe.id);
		} else {
			addToFavorites(recipe);
		}
	};

	return (
		<div className="flex flex-col items-center w-screen min-h-screen p-4">
			{/* background images */}
			<div className="relative w-[1800px] bg-red-300 h-0 z-0">

				<div className="absolute top-1 right-10 opacity-5 transform rotate-12">
					<img width="250" height="250" src="https://img.icons8.com/ios/250/salad--v1.png" alt="salad--v1" />
				</div>

				<div className="absolute top-40 left-0 opacity-5 transform rotate-6">
					<img width="250" height="250" src="https://img.icons8.com/ios/250/pizza.png" alt="pizza" />
				</div>

				<div className="absolute top-150 left-24 opacity-5 transform rotate-6">
					<img width="250" height="250" src="https://img.icons8.com/ios/250/doughnut.png" alt="doughnut" />
				</div>

				<div className="absolute top-170 right-26 opacity-5 transform rotate-190">
					<img width="250" height="250" src="https://img.icons8.com/ios/250/sandwich.png" alt="sandwich" />
				</div>
			</div>


			{/* MIDDLE CONTENT */}
			<div className="min-h-screen w-full flex flex-col items-center">

				{/* WIP - SEARCH FORM COMPONENT */}
				<FormQuery
					onSearch={searchRecipes}
					loading={loading}
				>
					<FormQuery.search />
					<FormQuery.form />
				</FormQuery>

				{/* WIP - ERROR DISPLAY MESG */}
				{error && (
					<div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6 w-screen">
						<strong>Error:</strong> {error}
					</div>
				)}

				{/* WIP - RESULTS FROM API WHICH INCLUDES TOTAL ON EVERY RETURN*/}
				{totalResults > 0 && (
					<div className="mb-4 w-full py-1 mt-2 text-center">
						<p className="text-gray-400">
							Found {totalResults} recipes. Showing {recipes.length} results.
						</p>
					</div>
				)}

				{/* WIP - RECIPE LIST COMPONENT */}
				<RecipeList
					recipes={recipes}
					favorites={favorites}
					onToggleFavorite={handleToggleFavorite}
					showFavoriteButton={true}
				/>

				{/* WIP - LOAD MORE BUTTON */}
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

				{/* WIP - NO RESULTS */}
				{!loading && recipes.length === 0 && currentQuery && (
					<div className="text-center py-12">
						<p className="text-gray-500 text-lg">No recipes found. Try adjusting your search criteria.</p>
					</div>
				)}
			</div>

			{/* footer*/}
			<div className="flex flex-col justify-center items-center py-5 w-full mt-5 text-center">
				<p className="text-gray-500 text-sm">
					Recipe data provided by{" "}
					<a
						href="https://spoonacular.com/food-api"
						target="_blank"
						rel="noopener noreferrer"
						className="text-orange-600 hover:underline"
					>
						Spoonacular API
					</a>
				</p>

				<p className="text-gray-500 text-sm">
					View the project on{" "}
					<a
						href="https://github.com/klu0926/group-spoonacular-clone"
						target="_blank"
						rel="noopener noreferrer"
						className="text-orange-600 hover:underline"
					>
						GitHub
					</a>
					.
				</p>
			</div>
		</div>
	);
}
