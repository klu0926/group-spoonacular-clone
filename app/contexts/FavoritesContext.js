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

export const FavoritesProvider = ({ children }) => {
	const [favorites, setFavorites] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// LOAD FAVORITES FROM LOCALSTORAGE ON MOUNT
	useEffect(() => {
		// TODO
	}, []);

	// SAVE FAVORITES TO LOCALSTORAGE WHENEVER FAVORITES CHANGE
	useEffect(() => {
		// TODO
	}, [favorites, isLoading]);

	// WHEN BUTTON IS CLICKED ON RECIPE NOT IN FAVORTIES
	const addToFavorites = (recipe) => {
		// TODO
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
		// TODO
	};

	// RETURN RECIPE BY PASSED ID
	const getFavoriteById = (recipeId) => {
		// TODO
		return null;
	};

	// RETURN RECIPES BY PASSED IDS ARRAY?
	const getFavoritesByIds = (recipeIds) => {
		// TODO
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
		// ???? - TBD MAYBE NOT NECESSARY, CONFIRM SPEC
		updateFavorite,
		getFavoritesStats,
	};

	return <FavoritesContext.Provider value={value}>{children}</FavoritesContext.Provider>;
};
