// FORM FOR FILTERING THE FAVORITES
// AUTHORS - JASMINE, LU, CLARANCE, NOAH

// IMPORT REACT LOGIC
import { useState } from "react";

export default function FormFavorites({ onFilter, totalRecipes, filteredCount }) {
	// STORE THE FORM VALS ON STATE
	const [formData, setFormData] = useState({
		cuisine: "all",
		maxReadyTime: "",
		includeIngredients: "",
		sortBy: "",
	});

	// TODO - LIKE THE QUERY FORM
	// TODO - MAKE ONE VALUE RE-USED IN BOTH PAGES???
	const cuisineOptions = [
    'African', 'American', 'British', 'Cajun', 'Caribbean', 'Chinese',
    'Eastern European', 'European', 'French', 'German', 'Greek', 'Indian',
    'Irish', 'Italian', 'Japanese', 'Jewish', 'Korean', 'Latin American',
    'Mediterranean', 'Mexican', 'Middle Eastern', 'Nordic', 'Southern',
    'Spanish', 'Thai', 'Vietnamese'
  ];
   // Sort Options
	const sortOptions = [
    { value: '', label: 'Default Order' },
    { value: 'title', label: 'Recipe Name (A-Z)' },
    { value: 'readyTime', label: 'Cooking Time (Shortest First)' },
    { value: 'healthScore', label: 'Health Score (Highest First)' }
  ];

  const timeOptions = [
    { value: '', label: 'Any Time' },
    { value: '15', label: 'Under 15 minutes' },
    { value: '30', label: 'Under 30 minutes' },
    { value: '45', label: 'Under 45 minutes' },
    { value: '60', label: 'Under 1 hour' },
    { value: '120', label: 'Under 2 hours' }
  ];

	// WIP - HANDLE CHANGES TO THE FORM VALUES
	// NOTE - THIS IS NEARLY 1:1 KVP FROM QUERY FORM LOGIC
	const handleInputChange = (e) => {
		// GET IT AND SET IT
		const { name, value } = e.target;
		const newFormData = {
			...formData,
			[name]: value,
		};
		// DO STUFF WITH THE NEW VALUE
	};

	// ???? - OTHER FORM STUFF?

	// TODO - A FORM VALUE RESET
	const handleReset = () => {
		// JUST REMAKE THE FORM QUERY OBJ...?
	};

	// FINALLY, RETURN THE FORM VIEW
	return (
		/* TODO -MATCH OG OUTER WRAPPER */
		<div>
			{/* TODO - INNER WRAPPERUPDATE VALS FROM QUERY FORM TO FIT FAVORITES FORM */}
			<div>
				{/* TODO - USER FEEDBACK ABOUT FILTER, IN CASE NONE ARE SHOWN */}

				{/* TODO - CLEAR FILTERS */}

				{/* TODO - CLEAR ALL FAVORITED RECIPES */}

				{/* TODO - MATCH THE WIREFRAME / PROPOSAL */}
			</div>

			{/* TODO - FORM FILTERS VIA TYPE- IN TEXT */}

			{/* TODO - FORM FILTERS VIA TOGGLE BUTTONS - Vegan, Gluten, Vegetarian, Keto, etc... FROM WIREFRAME */}
		</div>
	);
}
