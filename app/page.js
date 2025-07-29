"use client";

// QUERY API PAGE
import { useState, useEffect } from "react";
import FormQuery from "./components/FormQuery";

export default function QueryPage() {
	// TODO - USE THE FAVORITES CONTEXT

	// TODO - PAGE STATE VARS	
	const [recipes, setRecipes] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [totalResults, setTotalResults] = useState(0);
	const [hasMore, setHasMore] = useState(false);

	// HANDLE RECIPIES SEARCH FROM FORM QUERY AND IF LOAD MORE BUTTON PRESSED
	const searchRecipes = async (queryParams, isLoadMore = false) => {
		// TODO - API LOGIC
		// TODO - FORM LOGIC
		// TODO - MORE / NEW
		// TODO - UPDATE PAGE STATE VARS
		// TODO - CATCH & HANDLE ERRORS
	};

	// TODO - LOAD MORE BUTTON HANDLING

	// TODO - TOGGLE FAVORITES ON QUERY RESULT

	// FINALLY, RETURN THE PAGE
	return (
		// WRAP IN DIVS FOR LAYOUT
		<div className="min-h-screen bg-blue-800">
			<div className="container mx-auto px-4 py-8 ">
				<header className="text-center mb-8">
					<h1 className="text-4xl font-bold text-gray-800 mb-2">Query for Recipes</h1>
				</header>

				{/* TODO - SEARCH FORM COMPONENT */}
				<div>
					<FormQuery
						onSearch={searchRecipes}
						loading={loading}
					/>
				</div>

				{/* TODO - ERROR DISPLAY SOMEHOW */}
				{error && (
					<div className="bg-red-100">
						<strong>Error:</strong> {error}
					</div>
				)}

				{/* TODO - RESULTS FROM API WHICH INCLUDES TOTAL ON EVERY RETURN*/}
				{totalResults > 0 && (
					<div className="mb-6">
						<p className="text-gray-600">Found ???? recipes. Showing ??? results.</p>
					</div>
				)}

				{/* TODO - RECIPE LIST COMPONENT */}

				{/* TODO - LOAD MORE BUTTON */}
				{hasMore && (
					<div>
						<button>{loading ? "Loading..." : "Load More Recipes"}</button>
					</div>
				)}

				{/* TODO - NO RESULTS */}
				{!loading && recipes.length === 0 && (
					<div className="text-center">
						<p>No recipes found. Try adjusting your search criteria.</p>
					</div>
				)}
			</div>
		</div>
	);
}
