// FORM FOR THE API QUERY
import { useState } from "react";

export default function FormQuery({ onSearch, loading }) {
	// TODO - BASE FORM OPTIONS FROM API
	// TODO - WHAT ARE NEEDED, OUT OF SCOPE, ETC...
	const [formData, setFormData] = useState({
		query: "",
		cuisine: "",
		includeIngredients: "",
		excludeIngredients: "",
		diet: "",
		intolerances: "",
		maxReadyTime: "",
		minCalories: "",
		maxCalories: "",
		sort: "popularity",
	});

// CUISINE OPTIONS
	const cuisineOptions = [
		"African",
		"American",
		"British",
		"Cajun",
		"Caribbean",
		"Chinese",
		"Eastern European",
		"European",
		"French",
		"German",
		"Greek",
		"Indian",
		"Irish",
		"Italian",
		"Japanese",
		"Jewish",
		"Korean",
		"Latin American",
		"Mediterranean",
		"Mexican",
		"Middle Eastern",
		"Nordic",
		"Southern",
		"Spanish",
		"Thai",
		"Vietnamese",
	];

	// DIET
	const dietOptions = ["Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan", "Pescetarian", "Paleo", "Primal", "Whole30"];


	// INTOLERANCE/ALLERGIES
	const intoleranceOptions = ["Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat"];


	// TODO - SORT
	const sortOptions = [
		{ value: "popularity", label: "Popularity" },
		// ETC...
	];

	// TODO - HANDLE INPUT FORM CHANGES, NAME/KEY VALUE PAIR
	const handleInputChange = (e) => {
		// UTIL FUNCTION TO WORK ON MULTIPLE INPUT FIELDS
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	// HANDLE THE FORM SUBMISSION
	const handleSubmit = (e) => {
		// DONT PROC FORM NORMALLY
		e.preventDefault();

		// BUILD SEARCH PARAMETERS DICT
		const searchParams = {};

		// BASIC SEARCH QUERY EG - FISH, EGGS
		if (formData.query.trim()) {
			searchParams.query = formData.query.trim();
		}

		// SET CUISINE
		if (formData.cuisine) {
			searchParams.cuisine = formData.cuisine;
		}

		// TODO - OTHER FORM OPTIONS BASED ON 
		// INGREDIENTS
		if (formData.includeIngredients.trim()) {
			searchParams.includeIngredients = formData.includeIngredients.trim();
		}

		if (formData.excludeIngredients.trim()) {
			searchParams.excludeIngredients = formData.excludeIngredients.trim();
		}

		// DIET
		if (formData.diet) {
			searchParams.diet = formData.diet;
		}

		// INTOLERANCES
		if (formData.intolerances) {
			searchParams.intolerances = formData.intolerances;
			}

		// SORT OPTION
		searchParams.sort = formData.sort;

		// TRIGGER THE ONSEARCH CALLBACK FROM PAGE TO HIT THE API
		onSearch(searchParams);
	};

	// RESET
	const handleReset = () => {
		setFormData({
			query: "",
			cuisine: "",
			// TODO -
			sort: "popularity",
		});
	};

	return (
		<>
			{/* TODO - ADD handleSubmit() TO BE THE HANDLER FROM page.js TO ACCESS API */}
			<form>
				<div>
					{/* FORM INPUTS */}
					<label htmlFor="query">Search Recipes</label>

					<input
						type="text"
						id="query"
						name="query"
						value={formData.query}
						onChange={handleInputChange}
						placeholder="e.g., pasta, chicken, chocolate cake..."
						className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>

				{/* TWO COLUMN LAYOUT FOR FILTERS, NOT SAME AS WIREFRAME BUT BETTER UX */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
					{/* LEFT COLUMN */}
					<div className="space-y-4">
						{/* CUISINE */}
						<div>
							<label 
								htmlFor="cuisine"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Cuisine Type
							</label>
							<select
								id="cuisine"
								name="cuisine"
								value={formData.cuisine}
								onChange={handleInputChange}
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							>
								<option value="">Any Cuisine</option>
								{cuisineOptions.map((cuisine) => (
									<option
										key={cuisine}
										value={cuisine}
									>
										{cuisine}
									</option>
								))}
							</select>
						</div>

						{/* INCLUDE INGREDIENTS */}
						<div>
							<label
								htmlFor="includeIngredients"
								className="block text-sm font-medium text-gray-700 mb-2"
							>
								Include Ingredients
							</label>
							<input
								type="text"
								id="includeIngredients"
								name="includeIngredients"
								value={formData.includeIngredients}
								onChange={handleInputChange}
								placeholder="e.g., tomatoes, cheese, basil"
								className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
							/>
							<p className="text-xs text-gray-500 mt-1">Separate multiple ingredients with commas</p>
						</div>

						{/* EXCLUDE INGREDIENTS */}
						<div>
						<label
							htmlFor="excludeIngredients"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Exclude Ingredients
						</label>
						<input
							type="text"
							id="excludeIngredients"
							name="excludeIngredients"
							value={formData.excludeIngredients}
							onChange={handleInputChange}
							placeholder="e.g., nuts, shellfish"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					</div>

					{/* MORE RIGHT COLUMN */}
					<div className="space-y-4">
						{/* Diet */}
						<div>
						<label
							htmlFor="diet"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Diet Type
						</label>
						<select
							id="diet"
							name="diet"
							value={formData.diet}
							onChange={handleInputChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						>
							<option value="">Any Diet</option>
							{dietOptions.map((diet) => (
								<option
									key={diet}
									value={diet}
								>
									{diet}
								</option>
							))}
						</select>
					</div>

						{/* Intolerances */}
						<div>
						<label
							htmlFor="intolerances"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Food Intolerances
						</label>
						<select
							id="intolerances"
							name="intolerances"
							value={formData.intolerances}
							onChange={handleInputChange}
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						>
							<option value="">No Restrictions</option>
							{intoleranceOptions.map((intolerance) => (
								<option
									key={intolerance}
									value={intolerance}
								>
									{intolerance}
								</option>
							))}
						</select>
					</div>

						{/* TODO - Max Ready Time?  REALLY? FROM THE API? WORTH IT OR OUT OF SCOPE? */}
					<div>
						<label
							htmlFor="maxReadyTime"
							className="block text-sm font-medium text-gray-700 mb-2"
						>
							Max Cooking Time (minutes)
						</label>
						<input
							type="number"
							id="maxReadyTime"
							name="maxReadyTime"
							value={formData.maxReadyTime}
							onChange={handleInputChange}
							placeholder="e.g., 30"
							min="1"
							max="300"
							className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
						/>
					</div>
					</div>
				</div>

				{/* TODO - Calories Range FROM API */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
				<div>
					<label
						htmlFor="minCalories"
						className="block text-sm font-medium text-gray-700 mb-2"
					>
						Min Calories
					</label>
					<input
						type="number"
						id="minCalories"
						name="minCalories"
						value={formData.minCalories}
						onChange={handleInputChange}
						placeholder="e.g., 200"
						min="0"
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>
				<div>
					<label
						htmlFor="maxCalories"
						className="block text-sm font-medium text-gray-700 mb-2"
					>
						Max Calories
					</label>
					<input
						type="number"
						id="maxCalories"
						name="maxCalories"
						value={formData.maxCalories}
						onChange={handleInputChange}
						placeholder="e.g., 800"
						min="0"
						className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
					/>
				</div>
				</div>

				{/* TODO - SORT OPTIONS VIA DROP DOWN*/}
				<div>
					<label htmlFor="sort">Sort Results By</label>
					<select
						id="sort"
						name="sort"
					>
						{/* TODO - FILL FROM THE OPTIONS ARRAY */}
					</select>
				</div>

				{/* HORIZ FORM QUERY BUTTS */}
				<div className="flex gap-4 pt-4">
					{/* TODO - PREVENT DOUBLE SUBMIT ON LONG QUERY VIA loading BOOL */}
					<button type="submit">{loading ? <div>LOADGIN!!</div> : "Search Recipes"}</button>

					{/* RESET BUTTON & LOGIC FROM FORM CONTEXT */}
					<button
						type="button"
						className="px-6 py-3 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition-colors"
					>
						Reset
					</button>
				</div>
			</form>
		</>
	);
}
