// FAVORITE CONTEXT STUB
// DARRYL LECRAW
"use client";

import { createContext, useContext, useState, useEffect } from "react";

const FavoritesContext = createContext();

export const useFavorites = () => {
	// CONTEXT HERE SIMPLIFY IMPORT IN PAGE WITH EASIER SYNTAX
	const context = useContext(FavoritesContext);
	if (!context) {
		throw new Error("useFavorites must be used within a FavoritesProvider");
	}
	return context;
};

// THE CONTEXT PROVIDER OF VALUES & METHODS AVAIL TO ENTIRE APP
export const FavoritesProvider = ({ children }) => {

	// CONTEXT STATE VARS FOR THE ACTUAL FAVORITES & IF DATE IS LOADING
	const [favorites, setFavorites] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// LOAD FAVORITES FROM LOCALSTORAGE ON MOUNT
	useEffect(() => {
		try {
			const savedFavorites = localStorage.getItem("recipe-favorites");
			if (savedFavorites) {
				const parsedFavorites = JSON.parse(savedFavorites);
				setFavorites(Array.isArray(parsedFavorites) ? parsedFavorites : []);
			}
		} catch (error) {
			console.error("Error loading favorites from localStorage:", error);
			setFavorites([]);
		} finally {
			setIsLoading(false);
		}
	}, []);

	// SAVE FAVORITES TO LOCALSTORAGE WHENEVER FAVORITES CHANGE
	useEffect(() => {
		// TODO
	}, [favorites, isLoading]);

	// WHEN BUTTON IS CLICKED ON RECIPE NOT IN FAVORTIES
	// WIP - LOTS OF API MATCHES, NOT ALL NEEDED, TRIM DOWN TO SCOPE/WIREFRAME
	const addToFavorites = (recipe) => {
		setFavorites((prevFavorites) => {
			// HANDLE IF RECIPE IS ALREADY IN FAVORITES
			const isAlreadyFavorite = prevFavorites.some((fav) => fav.id === recipe.id);

			if (isAlreadyFavorite) {
				console.warn("Recipe is already in favorites");
				return prevFavorites;
			}

			// CREATE A CLEAN RECIPE OBJECT WITH ONLY NECESSARY DATA
			// TODO - TRIM DOWN TO SCOPE/WIREFRAME
			const cleanRecipe = {
				id: recipe.id,
				title: recipe.title,
				image: recipe.image,
				readyInMinutes: recipe.readyInMinutes,
				servings: recipe.servings,
				healthScore: recipe.healthScore,
				summary: recipe.summary,
				sourceUrl: recipe.sourceUrl,
				spoonacularSourceUrl: recipe.spoonacularSourceUrl,
				cuisines: recipe.cuisines || [],
				dishTypes: recipe.dishTypes || [],
				diets: recipe.diets || [],
				occasions: recipe.occasions || [],
				extendedIngredients: recipe.extendedIngredients || [],
				analyzedInstructions: recipe.analyzedInstructions || [],
				instructions: recipe.instructions,
				nutrition: recipe.nutrition,
				vegetarian: recipe.vegetarian,
				vegan: recipe.vegan,
				glutenFree: recipe.glutenFree,
				dairyFree: recipe.dairyFree,
				ketogenic: recipe.ketogenic,
				sustainable: recipe.sustainable,
				lowFodmap: recipe.lowFodmap,
				weightWatcherSmartPoints: recipe.weightWatcherSmartPoints,
				gaps: recipe.gaps,
				preparationMinutes: recipe.preparationMinutes,
				cookingMinutes: recipe.cookingMinutes,
				aggregateLikes: recipe.aggregateLikes,
				spoonacularScore: recipe.spoonacularScore,
				creditsText: recipe.creditsText,
				license: recipe.license,
				sourceName: recipe.sourceName,
				pricePerServing: recipe.pricePerServing,
				cheap: recipe.cheap,
				popular: recipe.popular,
				sustainable: recipe.sustainable,
				dateAdded: new Date().toISOString(),
			};

			return [...prevFavorites, cleanRecipe];
		});
	};

	// WHEN BUTTON IS CLICKED ON RECIPE ALREADY IN FAVORTIES
	const removeFromFavorites = (recipeId) => {
		// TODO
	};

	// CHECK IF RECIPE IN FAVORITES FOR UX DISPLAY
	const isFavorite = (recipeId) => {
		// TODO
	};

	// CLEAR ALL, CONVENIENCE FUNCTION
	const clearAllFavorites = () => {
		// EASY :D
		setFavorites([]);
	};

	// RETURN RECIPE BY PASSED ID
	// NOTE - ID IS THE SOLE SOURCE OF TRUTH FOR MATCHING RECIPIES IN CONTEXT
	const getFavoriteById = (recipeId) => {
		return favorites.find((recipe) => recipe.id === recipeId);
	};

	// RETURN RECIPES BY PASSED IDS ARRAY?
	const getFavoritesByIds = (recipeIds) => {
		// TODO - REUSE SINGULAR METHOD ABOVE?
		return null;
	};

	// GET FAVORITES STATISTICS
	const getFavoritesStats = () => {
		// TODO
		return {
			totalFavorites,
			etc,
		};
	};

	// SEARCH FAVORITES
	const searchFavorites = (searchTerm) => {
		// TODO
		return null;
	};

	// VALS AVAIL TO PAGES VIA CONTEXT
	const value = {
		favorites,
		isLoading,
		addToFavorites,
		removeFromFavorites,
		isFavorite,
		clearAllFavorites,
		getFavoriteById,
		getFavoritesByIds,
		searchFavorites,
		getFavoritesStats,
		// ???? - TBD MAYBE NOT NECESSARY, CONFIRM SPEC
		// updateFavorite,
	};

	return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};
