// AUTHORS: Darryl, Jasmine

// RECIPE VIEW, BRIEF DETAILS, FAVE BUTTON, MORE INFO MODAL BUTTON
import { useState } from "react";
import CookingModal from "./CookingModal";

// TODO - RECIPE VIEW COMPONENT WITH THE FUNCS NEEDED FOR PROPER VIEW
export default function RecipeView({ recipe, isFavorite, onToggleFavorite, showFavoriteButton = true, showCookingModal = false }) {
	// GOING TO NEED A MODAL BOOL
	const [isModalOpen, setIsModalOpen] = useState(false);

	// TODO - HANDLE THE MODAL VIEW
	const handleViewRecipe = () => {};

	// TODO - NEED A FAVORITE TOGGLE LOGIC
	const handleFavoriteClick = (e) => {};

	return (
		<>
			<div>
				{/* TODO - USE THE IMAGE URL THE API RETURNS  */}
				<div>
					<img src="www.todo" />

					{/* TODO - FAVORITE TOGGLE BUTTON USING STATE*/}
					{showFavoriteButton && <button>FAVE</button>}
				</div>

				{/* TODO - RECIPE CONTENT */}
				<div>
					<h3>{recipe.title}</h3>

					{/* TODO - STATS */}
					<div>
						{/* SERVINGS FROM API */}
						{recipe.servings && (
							<div>
								{/* WRAP TEXT IN SPAN */}
								<span>{recipe.servings} servings</span>
							</div>
						)}
						{recipe.healthScore && (
							<div>
								{/* WRAP TEXT IN SPAN								 */}
								<span>{recipe.healthScore}% healthy</span>
							</div>
						)}
					</div>

					{/* RECIPE SUMMARY */}
					{recipe.summary && <p>{recipe.summary}</p>}

					{/* TODO - HORIZ ACTION BUTTONS */}
					<div className="flex gap-2">
						{/* VIEW RECIPE MODAL */}
						{showCookingModal && <button>View Recipe</button>}

						{/* RECIPE SOURCE URL */}
						{recipe.sourceUrl && (
							<a
								href={recipe.sourceUrl}
								target="_blank"
								rel="noopener noreferrer"
							>
								Original Recipe
							</a>
						)}
					</div>
				</div>
			</div>

			{/* TODO - COOKING MODAL COMPONENT */}
			{isModalOpen && (
				<CookingModal
					recipe={recipe}
					isOpen={isModalOpen}
					onClose={() => setIsModalOpen(false)}
				/>
			)}
		</>
	);
}
