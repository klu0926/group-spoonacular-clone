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
		"African", "American", "British", "Cajun", "Caribbean", "Chinese", "Eastern European", "European",
		"French", "German", "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American",
		"Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese",
	];

	const sortOptions = [
		{ value: "", label: "Default Order" },
		{ value: "title", label: "Recipe Name (A–Z)" },
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
			<div className="w-full flex items-center justify-between text-orange-600">
				<div className="flex flex-col">
					<h2 className="text-base font-semibold">Filter Your Favorites</h2>
					<p className="text-xs text-gray-600">
						{filteredCount} of {totalRecipes} recipes shown
					</p>
				</div>

				<div className="flex items-center gap-4">
					{hasActiveFilters() && (
						<button
							type="button"
							onClick={handleReset}
							className="text-xs text-orange-700 hover:text-orange-800 underline"
						>
							Clear All
						</button>
					)}
					<button
						type="button"
						className="flex items-center gap-2 cursor-pointer"
						onClick={() => setShowMoreForm((s) => !s)}
					>
						{showMoreForm ? "Hide options" : "Show options"}
						{showMoreForm ? (
							<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
								viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
								strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
								<path d="M18 15l-6-6-6 6" />
							</svg>
						) : (
							<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="none"
								viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2"
								strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
								<path d="M6 9l6 6 6-6" />
							</svg>
						)}
					</button>
				</div>
			</div>

			{/* Collapsible body */}
			{showMoreForm && (
				<div className="mt-3">
					{/* Dense grid of quick filters */}
					<div
						className="grid gap-3"
						style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
					>
						{/* Sort */}
						<div className="space-y-1">
							<label htmlFor="sortBy" className="block text-xs font-semibold text-gray-500">
								Sort By
							</label>
							<select
								id="sortBy"
								name="sortBy"
								value={formData.sortBy}
								onChange={handleInputChange}
								className="w-full px-2 py-1.5 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-700 bg-orange-50 text-sm"
							>
								{sortOptions.map((o) => (
									<option key={o.value} value={o.value}>{o.label}</option>
								))}
							</select>
						</div>

						{/* Max time */}
						<div className="space-y-1">
							<label htmlFor="maxReadyTime" className="block text-xs font-semibold text-gray-500">
								Max Time
							</label>
							<select
								id="maxReadyTime"
								name="maxReadyTime"
								value={formData.maxReadyTime}
								onChange={handleInputChange}
								className="w-full px-2 py-1.5 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-700 bg-orange-50 text-sm"
							>
								{timeOptions.map((o) => (
									<option key={o.value} value={o.value}>{o.label}</option>
								))}
							</select>
						</div>

						{/* Cuisine */}
						<div className="space-y-1">
							<label htmlFor="cuisine" className="block text-xs font-semibold text-gray-500">
								Cuisine
							</label>
							<select
								id="cuisine"
								name="cuisine"
								value={formData.cuisine}
								onChange={handleInputChange}
								className="w-full px-2 py-1.5 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-700 bg-orange-50 text-sm"
							>
								<option value="all">All Cuisines</option>
								{cuisineOptions.map((c) => (
									<option key={c} value={c}>{c}</option>
								))}
							</select>
						</div>

						{/* Ingredients search */}
						<div className="space-y-1" style={{ gridColumn: "1 / -1" }}>
							<label htmlFor="includeIngredients" className="block text-xs font-semibold text-gray-500">
								Ingredients
							</label>
							<input
								type="text"
								id="includeIngredients"
								name="includeIngredients"
								value={formData.includeIngredients}
								onChange={handleInputChange}
								placeholder="chicken, tomatoes, cheese"
								className="w-full px-2 py-1.5 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-700 bg-orange-50 text-sm"
							/>
							<p className="text-[11px] text-gray-500 mt-1">
								Find recipes containing specific ingredients
							</p>
						</div>
					</div>

					{/* Dietary filters – compact */}
					<div className="mt-3">
						<span className="block text-xs font-semibold text-gray-500 mb-2">
							Dietary Preferences
						</span>
						<div
							className="grid gap-2"
							style={{ gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))" }}
						>
							{Object.entries(dietFilters).map(([diet, checked]) => (
								<label key={diet} className="flex items-center gap-2">
									<input
										type="checkbox"
										name={diet}
										checked={checked}
										onChange={handleDietChange}
										className="h-4 w-4 rounded border-orange-300 accent-orange-600 focus:ring-2 focus:ring-orange-600"
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
			)}
		</div>
	);
}
