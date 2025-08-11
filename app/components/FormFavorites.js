// FORM FOR FILTERING THE FAVORITES
// AUTHORS - JASMINE, CLARANCE, NOAH

import { useState } from "react";

export default function FormFavorites({ onFilter, totalRecipes, filteredCount }) {
	const [showMoreForm, setShowMoreForm] = useState(true);

	const [formData, setFormData] = useState({
		cuisine: "all",
		maxReadyTime: "",
		includeIngredients: "",
		sortBy: "",
	});

	const [dietFilters, setDietFilters] = useState({
		vegetarian: false,
		vegan: false,
		glutenFree: false,
		dairyFree: false,
		ketogenic: false,
	});

	const cuisineOptions = [
		"African", "American", "British", "Cajun", "Caribbean", "Chinese", "Eastern European", "European", "French", "German", "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American", "Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese",
	];

	const sortOptions = [
		{ value: "", label: "Default Order" },
		{ value: "title", label: "Recipe Name (A-Z)" },
		{ value: "readyTime", label: "Cooking Time (Shortest First)" },
		{ value: "healthScore", label: "Health Score (Highest First)" },
	];

	const timeOptions = [
		{ value: "", label: "Any Time" },
		{ value: "15", label: "Under 15 minutes" },
		{ value: "30", label: "Under 30 minutes" },
		{ value: "45", label: "Under 45 minutes" },
		{ value: "60", label: "Under 1 hour" },
		{ value: "120", label: "Under 2 hours" },
	];

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		const newFormData = { ...formData, [name]: value };
		setFormData(newFormData);
		applyFilters(newFormData, dietFilters);
	};

	const handleDietChange = (e) => {
		const { name, checked } = e.target;
		const newDietFilters = { ...dietFilters, [name]: checked };
		setDietFilters(newDietFilters);
		applyFilters(formData, newDietFilters);
	};

	const applyFilters = (formFilters, dietaryFilters) => {
		const filters = {
			...formFilters,
			diets: Object.entries(dietaryFilters)
				.filter(([, checked]) => checked)
				.map(([diet]) => diet),
		};
		onFilter(filters);
	};

	const handleReset = () => {
		const resetFormData = { cuisine: "all", maxReadyTime: "", includeIngredients: "", sortBy: "" };
		const resetDietFilters = { vegetarian: false, vegan: false, glutenFree: false, dairyFree: false, ketogenic: false };
		setFormData(resetFormData);
		setDietFilters(resetDietFilters);
		applyFilters(resetFormData, resetDietFilters);
	};

	const hasActiveFilters = () =>
		formData.cuisine !== "all" ||
		formData.maxReadyTime !== "" ||
		formData.includeIngredients !== "" ||
		formData.sortBy !== "" ||
		Object.values(dietFilters).some(Boolean);

	return (
		<div className="w-full p-4 px-6 rounded-2xl bg-orange-100 z-10">
			{/* Toggle header */}
			{showMoreForm ? (
				<div className="w-full flex items-center justify-end text-orange-600">
					<button
						type="button"
						className="flex items-center gap-2 cursor-pointer"
						onClick={() => setShowMoreForm(false)}
					>
						Hide options
						<svg
							xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
							viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
							strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
						>
							<path d="M18 15l-6-6-6 6" />
						</svg>
					</button>
				</div>
			) : (
				<div
					className="w-full text-center flex items-center justify-end text-orange-600 rounded-md cursor-pointer"
					onClick={() => setShowMoreForm(true)}
				>
					Show options
					<svg
						xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none"
						viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
						strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"
						className="ml-1"
					>
						<path d="M6 9l6 6 6-6" />
					</svg>
				</div>
			)}

			{/* Collapsible body */}
			{showMoreForm && (
				<>
					<div className="flex justify-between items-center mb-4">
						<div className="w-full">
							<h2 className="text-lg font-semibold text-orange-600">Filter Your Favorites</h2>
							<p className="text-sm text-gray-600">
								{filteredCount} of {totalRecipes} recipes shown
							</p>
						</div>

						{hasActiveFilters() && (
							<button
								type="button"
								onClick={handleReset}
								className="text-sm text-orange-600 hover:text-orange-700 underline"
							>
								Clear All Filters
							</button>
						)}
					</div>

					{/* Quick Filters */}
					<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
						<div>
							<label htmlFor="sortBy" className="block text-sm font-bold text-gray-500 mb-2">
								Sort Results By
							</label>
							<select
								id="sortBy"
								name="sortBy"
								value={formData.sortBy}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-600"
							>
								{sortOptions.map((option) => (
									<option key={option.value} value={option.value}>{option.label}</option>
								))}
							</select>
						</div>

						<div>
							<label htmlFor="maxReadyTime" className="block text-sm font-bold text-gray-500 mb-2">
								Max Cooking Time
							</label>
							<select
								id="maxReadyTime"
								name="maxReadyTime"
								value={formData.maxReadyTime}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-600"
							>
								{timeOptions.map((option) => (
									<option key={option.value} value={option.value}>{option.label}</option>
								))}
							</select>
						</div>

						<div>
							<label htmlFor="cuisine" className="block text-sm font-bold text-gray-500 mb-2">
								Cuisine Type
							</label>
							<select
								id="cuisine"
								name="cuisine"
								value={formData.cuisine}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-600"
							>
								<option value="all">All Cuisines</option>
								{cuisineOptions.map((cuisine) => (
									<option key={cuisine} value={cuisine}>{cuisine}</option>
								))}
							</select>
						</div>
					</div>

					{/* More Filters */}
					<div className="pt-4 space-y-4">
						{/* Ingredient Search */}
						<div>
							<label htmlFor="includeIngredients" className="block text-sm font-bold text-gray-500 mb-2">
								Search by Ingredients
							</label>
							<input
								type="text"
								id="includeIngredients"
								name="includeIngredients"
								value={formData.includeIngredients}
								onChange={handleInputChange}
								placeholder="e.g., chicken, tomatoes, cheese"
								className="w-full px-3 py-2 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-600"
							/>
							<p className="text-xs text-gray-500 mt-1">
								Find recipes containing specific ingredients
							</p>
						</div>

						{/* Dietary Filters */}
						<div>
							<span className="block text-sm font-bold text-gray-500 mb-2">Dietary Preferences</span>
							<div className="grid grid-cols-2 md:grid-cols-5 gap-3">
								{Object.entries(dietFilters).map(([diet, checked]) => (
									<label key={diet} className="flex items-center gap-2">
										<input
											type="checkbox"
											name={diet}
											checked={checked}
											onChange={handleDietChange}
											className="rounded border-orange-300 accent-orange-600 focus:ring-2 focus:ring-orange-600"
										/>
										<span className="text-sm text-gray-700">
											{diet === "glutenFree"
												? "Gluten-Free"
												: diet === "dairyFree"
													? "Dairy-Free"
													: diet.charAt(0).toUpperCase() + diet.slice(1)}
										</span>
									</label>
								))}
							</div>
						</div>
					</div>
				</>
			)}
		</div>
	);
}
