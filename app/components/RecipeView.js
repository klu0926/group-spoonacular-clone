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
			<div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
				{/* Recipe Image  */}
				<div className="relative">
					<img
						src={recipe.image || "/api/placeholder/300/200"}
						alt={recipe.title}
						className="w-full h-48 object-cover"
						onError={(e) => {
							e.target.src = "/api/placeholder/300/200";
						}}
					/>

					{/* TODO - FAVORITE TOGGLE BUTTON USING STATE*/}
					{showFavoriteButton && (
						<button
							onClick={handleFavoriteClick}
							className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${isFavorite ? "bg-red-500 text-white hover:bg-red-600" : "bg-white text-gray-400 hover:text-red-500 hover:bg-gray-50"}`}
							aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
						>
							<svg
								className="w-5 h-5"
								fill="currentColor"
								viewBox="0 0 20 20"
							>
								<path
									fillRule="evenodd"
									d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
									clipRule="evenodd"
								/>
							</svg>
						</button>
					)}
				</div>

				{/* TODO - RECIPE CONTENT */}
				<div className="p-4">
					<h3 className="font-semibold text-lg text-gray-800 mb-2 line-clamp-2">{recipe.title}</h3>

					{/* TODO - STATS */}
					<div className="grid grid-cols-2 gap-4 text-sm text-gray-600 mb-4">
						{/* SERVINGS FROM API */}
						{recipe.servings && (
							<div className="flex flex-wrap gap-1 mb-3">
								{/* WRAP TEXT IN SPAN */}
								<span>{recipe.servings} servings</span>
							</div>
						)}
						{recipe.healthScore && (
							<div className="flex items-center">
								{/* WRAP TEXT IN SPAN								 */}
								<span className="mr-1">{recipe.healthScore}% healthy</span>
							</div>
						)}
					</div>

					{/* RECIPE SUMMARY */}
					{recipe.summary && <p
						className="text-gray-600 text-sm line-clamp-3 mb-4"
						>
						{recipe.summary}
						</p>}

					{/* TODO - HORIZ ACTION BUTTONS */}
					<div className="flex gap-2">
						{/* VIEW RECIPE MODAL */}
						{showCookingModal && <button
							className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors"
							>
							View Recipe</button>}

						{/* RECIPE SOURCE URL */}
						{recipe.sourceUrl && (
							<a
								href={recipe.sourceUrl}
								target="_blank"
								rel="noopener noreferrer"
								className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-md text-sm font-medium text-center transition-colors"
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
