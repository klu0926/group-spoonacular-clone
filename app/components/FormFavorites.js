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
	const cuisineOptions = ["Italian", "Greek", "Chinese", "Candy", "etc..."];

	// TODO - GET SORT FROM PREV PAGE...
	const sortOptions = [
		{ value: "", label: "Default Order" },
		{ value: "rev", label: "Reverse Default Order" },
		{ value: "etc", label: "etc..." },
	];

	// TODO - OFFER OTHER SORT OPTIONS FROM API RECIPE JSON OBJ

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
