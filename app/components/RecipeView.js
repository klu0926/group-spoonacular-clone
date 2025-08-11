// RECIPE VIEW, BRIEF DETAILS, FAVE BUTTON, MORE INFO MODAL BUTTON
import { useState } from "react";
import CookingModal from "./CookingModal";
import { stripHtmlTags } from "../utils/utils";

export default function RecipeView({ recipe, isFavorite, onToggleFavorite, showFavoriteButton = true, showCookingModal = true }) {

	const [isModalOpen, setIsModalOpen] = useState(false);

	// FAVORITE TOGGLE LOGIC
	const handleFavoriteClick = (e) => {
		e.preventDefault();   // stop the anchor navigation
		e.stopPropagation();
		onToggleFavorite(recipe);
	};

	// HANDLE THE MODAL VIEW
	const handleViewRecipe = () => {
		if (showCookingModal) {
			setIsModalOpen(true);
		}
	};

	const formatTime = (minutes) => {
		if (!minutes) return "N/A";
		if (minutes < 60) return `${minutes} min`;
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
	};

	const getDietBadges = () => {
		const badges = [];
		if (recipe.vegetarian) badges.push("Vegetarian");
		if (recipe.vegan) badges.push("Vegan");
		if (recipe.glutenFree) badges.push("Gluten-Free");
		if (recipe.dairyFree) badges.push("Dairy-Free");
		if (recipe.ketogenic) badges.push("Keto");
		return badges;
	};

	return (
		<>
			<div className="
						h-full bg-white md:shadow-md
						grid grid-cols-[2fr_3fr] gap-2
						md:grid-cols-1 md:grid-rows-[200px_1fr] md:gap-0 md:pb-4
						relative rounded-lg overflow-hidden md:hover:shadow-lg transition-shadow duration-300
					">

				{/* FAVORITE TOGGLE BUTTON USING STATE*/}
				{showFavoriteButton && (
					<button
						onClick={handleFavoriteClick}
						className={`absolute z-15 top-4 left-2 p-1 shadow-md rounded-full transition-colors ${isFavorite ? "bg-orange-600 text-white hover:bg-orange-600" : "bg-white text-gray-400 hover:text-orange-600 hover:bg-gray-50"}`}
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

				{/* Recipe Image  */}
				<div className="relative py-2 md:py-0 overflow-hidden">
					<img
						src={recipe.image || "/api/placeholder/300/200"}
						alt={recipe.title}
						className="object-cover w-full h-full rounded-md md:rounded-none"
						onError={(e) => {
							e.target.src = "/api/placeholder/300/200";
						}}
					/>
				</div>

				{/* RECIPE CONTENT */}
				<div className="px-2 md:px-4 h-full">
					{/* Title */}
					<div className="flex items-center">
						<h3 className="font-semibold text-md md:text-lg text-gray-800 mt-2 mb-2 md:mt-2 md:mb-2">{recipe.title}</h3>
					</div>

					{/* Diet Badges */}
					{getDietBadges().length > 0 && (
						<div className="flex flex-wrap gap-1 mb-3">
							{getDietBadges().map((badge, index) => (
								<span
									key={index}
									className="px-2 py-1 bg-orange-100 text-orange-600 text-xs rounded-full"
								>
									{badge}
								</span>
							))}
						</div>
					)}

					{/* Recipe STATS */}
					<div className="flex gap-4 justify-start md:justify-center items-center text-sm mb-2 border-b-1 border-b-gray-200">
						{/* Ready Time Badge */}
						{recipe.readyInMinutes && <div className="flex items-center">
							<span className="mr-1">
								<img width="20" height="20" src="https://img.icons8.com/material-outlined/20/clock--v1.png" alt="clock--v1" />
							</span>
							<span>{formatTime(recipe.readyInMinutes) + "s"}</span>
						</div>}


						{recipe.servings && (
							<div className="flex items-center">
								<span className="mr-1">
									<img width="28" height="28" src="https://img.icons8.com/windows/30/conference-call.png" alt="conference-call" />
								</span>
								<span>{recipe.servings}</span>
							</div>
						)}

						{recipe.healthScore && (
							<div className="flex items-center">
								<span className="mr-1">
									<img width="20" height="20" src="https://img.icons8.com/material-outlined/20/heart-health.png" alt="heart-health" />
								</span>
								<span>{recipe.healthScore}%</span>
							</div>
						)}
					</div>

					{/* RECIPE SUMMARY */}
					{recipe.summary && <p className="text-gray-600 text-sm line-clamp-3 mb-2 md:mb-4 md:mt-2">{stripHtmlTags(recipe.summary)}</p>}

					{/* ACTION BUTTONS */}
					<div className="grid grid-cols-2 gap-2">
						{showCookingModal && (
							<button
								onClick={handleViewRecipe}
								className=" bg-orange-600 hover:bg-orange-500 text-white py-2 rounded-md text-sm font-medium transition cursor-pointer hover:scale-95"
							>
								View Recipe
							</button>
						)}

						{recipe.sourceUrl && (
							<button
								className=" bg-gray-400 hover:bg-gray-500 text-white py-2 rounded-md text-sm font-medium transition cursor-pointer hover:scale-95"
								onClick={() => {
									// open new tab to recipe source url
									if (recipe.sourceUrl) {
										window.open(recipe.sourceUrl, "_blank", "noopener,noreferrer");
									}
								}}
							>
								Source
							</button>
						)}
					</div>

					{/* Cuisines */}
					{recipe.cuisines && recipe.cuisines.length > 0 && (
						<div className="hidden mt-3 pt-3 border-t border-gray-100">
							<div className="flex flex-wrap gap-1">
								{recipe.cuisines.slice(0, 3).map((cuisine, index) => (
									<span
										key={index}
										className="px-2 py-1 bg-orange-400 text-white text-xs rounded"
									>
										{cuisine}
									</span>
								))}
								{recipe.cuisines.length > 3 && <span className="px-2 py-1 bg-gray-50 text-gray-600 text-xs rounded">+{recipe.cuisines.length - 3} more</span>}
							</div>
						</div>
					)}
				</div>
			</div>

			{/* COOKING MODAL COMPONENT */}
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
