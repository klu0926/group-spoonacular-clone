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

	// TODO - CUISINE OPTIONS
	const cuisineOptions = ["Italian", "Canadian", "Greek", "etc..."];

	// TODO - DIET
	const dietOptions = ["Vegan", "Carnivore", "etc.."];

	// TODO - INTOLERANCE/ALLERGIES
	const intoleranceOptions = ["Nuts", ""];

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

		// TODO - OTHER FORM OPTIONS BASED ON WIREFRAMES

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
							<label htmlFor="cuisine">Cuisine Type</label>
							<select
								id="cuisine"
								name="cuisine"
								value={formData.cuisine}
								onChange={handleInputChange}
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

						{/* TODO - ? EXCLUDE INGREDIENTS */}
					</div>

					{/* TODO - MORE RIGHT COLUMN */}
					<div className="space-y-4">
						{/* TODO - Diet */}

						{/* TODO - API ? Intolerances */}

						{/* TODO - Max Ready Time?  REALLY? FROM THE API? WORTH IT OR OUT OF SCOPE? */}
					</div>
				</div>

				{/* TODO - Calories Range FROM API */}

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
