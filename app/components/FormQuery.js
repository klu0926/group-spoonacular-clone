// FORM FOR THE API QUERY (Provider)
"use client";

import { createContext, useContext, useState, useCallback } from "react";
import FormQueryForm from "./FormQuery.Form";
import FormQueryFormSearchbar from "./FormQuery.Form.Searchbar";

// Create context + hook
export const FormQueryContext = createContext(null);

export const useFormQuery = () => {
	const ctx = useContext(FormQueryContext);
	if (!ctx) throw new Error("useFormQuery must be used within <FormQueryProvider>");
	return ctx;
};

const INITIAL_STATE = {
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
};

// Static options
const CUISINE_OPTIONS = [
	"African", "American", "British", "Cajun", "Caribbean", "Chinese", "Eastern European", "European",
	"French", "German", "Greek", "Indian", "Irish", "Italian", "Japanese", "Jewish", "Korean", "Latin American",
	"Mediterranean", "Mexican", "Middle Eastern", "Nordic", "Southern", "Spanish", "Thai", "Vietnamese",
];

const DIET_OPTIONS = [
	"Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian",
	"Vegan", "Pescetarian", "Paleo", "Primal", "Whole30",
];

const INTOLERANCE_OPTIONS = [
	"Dairy", "Egg", "Gluten", "Grain", "Peanut", "Seafood", "Sesame", "Shellfish", "Soy", "Sulfite", "Tree Nut", "Wheat",
];

const SORT_OPTIONS = [
	{ value: "popularity", label: "Popularity" },
	{ value: "healthiness", label: "Healthiness" },
	{ value: "price", label: "Price" },
	{ value: "time", label: "Cooking Time" },
	{ value: "random", label: "Random" },
];

const FormQuery = ({ onSearch, loading, children }) => {
	const [formData, setFormData] = useState(INITIAL_STATE);

	const handleInputChange = useCallback((e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	}, []);

	const handleSubmit = useCallback((e) => {
		e.preventDefault();
		if (!onSearch) return;

		const trim = (v) => (typeof v === "string" ? v.trim() : v);
		const searchParams = {};

		if (trim(formData.query)) searchParams.query = trim(formData.query);
		if (formData.cuisine) searchParams.cuisine = formData.cuisine;
		if (trim(formData.includeIngredients)) searchParams.includeIngredients = trim(formData.includeIngredients);
		if (trim(formData.excludeIngredients)) searchParams.excludeIngredients = trim(formData.excludeIngredients);
		if (formData.diet) searchParams.diet = formData.diet;
		if (formData.intolerances) searchParams.intolerances = formData.intolerances;
		if (formData.maxReadyTime) searchParams.maxReadyTime = formData.maxReadyTime;
		if (formData.minCalories) searchParams.minCalories = formData.minCalories;
		if (formData.maxCalories) searchParams.maxCalories = formData.maxCalories;

		searchParams.sort = formData.sort || "popularity";

		onSearch(searchParams);
	}, [formData, onSearch]);

	const handleReset = useCallback(() => setFormData(INITIAL_STATE), []);
	const handleQueryReset = useCallback(() => {
		setFormData((prev) => ({
			...prev,
			query: ""
		}));
	}, []);

	// show more form fields
	const [showMoreForm, setShowMoreForm] = useState(true);



	const value = {
		// form
		formData,

		// loading
		loading: !!loading,

		// show more form fields
		showMoreForm,
		setShowMoreForm,

		// handlers
		handleInputChange,
		handleQueryReset,
		handleSubmit,
		handleReset,
		setFormData, // optional, handy sometimes

		// options
		cuisineOptions: CUISINE_OPTIONS,
		dietOptions: DIET_OPTIONS,
		intoleranceOptions: INTOLERANCE_OPTIONS,
		sortOptions: SORT_OPTIONS,
	};

	return (
		<FormQueryContext.Provider value={value}>
			<div className="w-full flex flex-col items-center max-w-6xl z-20">
				{children}
			</div>
		</FormQueryContext.Provider>
	);
}

// Create Compound Component
FormQuery.form = FormQueryForm
FormQuery.search = FormQueryFormSearchbar

export default FormQuery