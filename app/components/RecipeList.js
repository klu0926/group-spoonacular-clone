// AUTHORS: Darryl, Jasmine

// RECIPE LIST
import RecipeView from "./RecipeView";

// RECIPES FROM QUERY WITH STUB LOGIC
export default function RecipeList({ recipes, favorites, onToggleFavorite, showFavoriteButton = true, showCookingModal = false }) {
	// EARLY RETURN IF NO RECIPES
	if (!recipes || recipes.length === 0) {
		return null;
	}

	// FAVORITE TOGGLING
	const isFavorite = (recipeId) => {
		return favorites.some((fav) => fav.id === recipeId);
	};

	return (
		<div className="recipe-list max-w-6xl z-10">
			{/* NOTE - USE GRID LAYOUT FOR BEST/EASIEST */}
			<div className="grid grid-cols-1  md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-2 md:gap-5">
				{recipes.map((recipe) => (
					// PASS RECIPE DATA TO COMPONENT TO DISPLAY
					// INCLUDE CALLBACKS / HANDLERS TO UPDATE FAVORITE STATE

					<RecipeView
						key={recipe.id}
						recipe={recipe}
						isFavorite={isFavorite(recipe.id)}
						onToggleFavorite={onToggleFavorite}
						showFavoriteButton={showFavoriteButton}
						showCookingModal={showCookingModal}
					/>
				))}
			</div>

			{/* RECIPE COUNT SHOWN / TOTAL FROM API */}
			<div
				className="mt-2 text-gray-400"
			>{recipes.length === 1 ? "1 recipe displayed" : `${recipes.length} recipes displayed`}</div>
		</div>
	);
}
