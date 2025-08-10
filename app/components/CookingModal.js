// AUTHOR : Kuo Yu Lu
"use client";
import { useState, useEffect, useRef } from "react";

export default function CookingModal({ recipe, isOpen, onClose }) {
	const [activeTab, setActiveTab] = useState("ingredients");
	const [checkedIngredients, setCheckedIngredients] = useState({});
	const scrollYRef = useRef(0);

	// Robust body scroll lock for mobile
	useEffect(() => {
		if (!isOpen) return;

		// freeze body at current scroll position
		scrollYRef.current = window.scrollY || window.pageYOffset;
		const y = scrollYRef.current;
		const body = document.body;
		body.style.position = "fixed";
		body.style.top = `-${y}px`;
		body.style.left = "0";
		body.style.right = "0";
		body.style.width = "100%";

		return () => {
			const body = document.body;
			body.style.position = "";
			body.style.top = "";
			body.style.left = "";
			body.style.right = "";
			body.style.width = "";
			// restore scroll
			window.scrollTo(0, y);
		};
	}, [isOpen]);

	const handleIngredientCheck = (index) => {
		setCheckedIngredients((prev) => ({ ...prev, [index]: !prev[index] }));
	};

	const formatTime = (minutes) => {
		if (!minutes) return "N/A";
		if (minutes < 60) return `${minutes} min`;
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
	};

	const formatInstructions = (instructions) => {
		if (!instructions) return [];
		if (typeof instructions === "string") {
			return instructions
				.split(/\d+\.\s*|\n+/)
				.map((s) => s.trim())
				.filter(Boolean);
		}
		if (Array.isArray(instructions)) {
			return instructions.map((i) => i.step || i.text || i);
		}
		return [];
	};

	if (!isOpen) return null;

	return (
		// Single fixed root; create two layers via z-index
		<div className="fixed inset-0 z-50">
			{/* Backdrop (lower z) */}
			<div
				className="absolute inset-0 bg-black/70 z-40"
				onClick={onClose}
				onTouchMove={(e) => {
					// prevent background scroll on iOS while finger is on backdrop
					e.preventDefault();
				}}
			/>

			{/* Dialog layer (higher z) */}
			<div className="absolute inset-0 z-50 flex items-center justify-center p-4">
				{/* Use dvh to avoid mobile browser chrome issues */}
				<div className="relative bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[85dvh] overflow-hidden">
					{/* Header (not sticky to avoid iOS bugs); give content its own scroll instead */}
					<div className="bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-start">
						<div className="flex-1 pr-4">
							<h2 className="text-2xl font-bold text-gray-900 mb-2">
								{recipe.title}
							</h2>
							<div className="flex flex-wrap gap-4 text-sm text-gray-600">
								{recipe.readyInMinutes && (
									<span className="flex items-center">
										<svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										{formatTime(recipe.readyInMinutes)}
									</span>
								)}
								{recipe.servings && (
									<span className="flex items-center">
										<svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
										</svg>
										{recipe.servings} servings
									</span>
								)}
								{recipe.healthScore && (
									<span className="flex items-center">
										<svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
										</svg>
										{recipe.healthScore}% healthy
									</span>
								)}
							</div>
						</div>

						<button
							onClick={onClose}
							className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
						>
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					{/* Tabs (auto, not scroll) */}
					<div className="border-b border-gray-200">
						<nav className="-mx-6 px-6 flex overflow-x-auto">
							{[
								{ id: "ingredients", label: "Ingredients", icon: "📝" },
								{ id: "instructions", label: "Instructions", icon: "👨‍🍳" },
								{ id: "nutrition", label: "Nutrition", icon: "🥗" },
								{ id: "summary", label: "Summary", icon: "ℹ️" },
							].map((tab) => (
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`py-3 px-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${activeTab === tab.id
											? "border-blue-500 text-blue-600"
											: "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
										}`}
								>
									<span className="mr-2">{tab.icon}</span>
									{tab.label}
								</button>
							))}
						</nav>
					</div>

					{/* Single internal scroll area; smooth on iOS */}
					<div className="p-6 max-h-[70dvh] overflow-y-auto overscroll-contain">
						{/* Ingredients */}
						{activeTab === "ingredients" && (
							<div>
								<div className="flex justify-between items-center mb-4">
									<h3 className="text-lg font-semibold text-gray-900">
										Ingredients ({recipe.extendedIngredients?.length || 0})
									</h3>
									<button
										onClick={() => setCheckedIngredients({})}
										className="text-sm text-blue-600 hover:text-blue-800 underline"
									>
										Reset Checklist
									</button>
								</div>

								{recipe.extendedIngredients?.length ? (
									<div className="space-y-3">
										{recipe.extendedIngredients.map((ingredient, index) => (
											<div
												key={index}
												className={`flex items-start p-3 rounded-lg border transition-colors ${checkedIngredients[index]
														? "bg-green-50 border-green-200"
														: "bg-gray-50 border-gray-200"
													}`}
												onClick={() => handleIngredientCheck(index)}
											>
												<input
													type="checkbox"
													checked={!!checkedIngredients[index]}
													onClick={(e) => e.stopPropagation()}
													onChange={() => handleIngredientCheck(index)}
													className="mt-1 rounded border-gray-300 text-green-600 focus:ring-green-500"
												/>
												<div className="ml-3 flex-1">
													<div
														className={`font-medium ${checkedIngredients[index]
																? "line-through text-gray-500"
																: "text-gray-900"
															}`}
													>
														{ingredient.amount} {ingredient.unit} {ingredient.name}
													</div>
													{ingredient.original &&
														ingredient.original !==
														`${ingredient.amount} ${ingredient.unit} ${ingredient.name}` && (
															<div className="text-sm text-gray-600 mt-1">
																{ingredient.original}
															</div>
														)}
												</div>
												{ingredient.image && (
													<img
														src={`https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`}
														alt={ingredient.name}
														className="w-8 h-8 rounded ml-2"
													/>
												)}
											</div>
										))}
									</div>
								) : (
									<p className="text-gray-500 italic">
										No ingredients information available.
									</p>
								)}
							</div>
						)}

						{/* Instructions */}
						{activeTab === "instructions" && (
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Cooking Instructions
								</h3>

								{recipe.analyzedInstructions?.length ? (
									<div className="space-y-4">
										{recipe.analyzedInstructions[0].steps.map((step, index) => (
											<div key={index} className="flex">
												<div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
													{step.number}
												</div>
												<div className="flex-1">
													<p className="text-gray-800 leading-relaxed">
														{step.step}
													</p>
													{step.ingredients?.length > 0 && (
														<div className="mt-2 flex flex-wrap gap-1">
															{step.ingredients.map((ingredient, idx) => (
																<span
																	key={idx}
																	className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded"
																>
																	{ingredient.name}
																</span>
															))}
														</div>
													)}
												</div>
											</div>
										))}
									</div>
								) : recipe.instructions ? (
									<div className="space-y-4">
										{formatInstructions(recipe.instructions).map(
											(step, index) => (
												<div key={index} className="flex">
													<div className="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-semibold mr-4">
														{index + 1}
													</div>
													<p className="flex-1 text-gray-800 leading-relaxed">
														{step}
													</p>
												</div>
											)
										)}
									</div>
								) : (
									<p className="text-gray-500 italic">
										No cooking instructions available.
									</p>
								)}
							</div>
						)}

						{/* Nutrition */}
						{activeTab === "nutrition" && (
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Nutritional Information
								</h3>
								{recipe.nutrition?.nutrients ? (
									<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
										{recipe.nutrition.nutrients.slice(0, 8).map((nutrient, i) => (
											<div key={i} className="bg-gray-50 p-4 rounded-lg">
												<div className="flex justify-between items-center">
													<span className="font-medium text-gray-900">
														{nutrient.name}
													</span>
													<span className="text-gray-600">
														{nutrient.amount} {nutrient.unit}
													</span>
												</div>
												{typeof nutrient.percentOfDailyNeeds === "number" && (
													<div className="mt-2">
														<div className="flex justify-between text-sm text-gray-500 mb-1">
															<span>Daily Value</span>
															<span>{nutrient.percentOfDailyNeeds.toFixed(1)}%</span>
														</div>
														<div className="w-full bg-gray-200 rounded-full h-2">
															<div
																className="bg-blue-600 h-2 rounded-full"
																style={{
																	width: `${Math.min(
																		nutrient.percentOfDailyNeeds,
																		100
																	)}%`,
																}}
															/>
														</div>
													</div>
												)}
											</div>
										))}
									</div>
								) : (
									<p className="text-gray-500 italic">
										No nutritional information available.
									</p>
								)}
							</div>
						)}

						{/* Summary */}
						{activeTab === "summary" && (
							<div>
								<h3 className="text-lg font-semibold text-gray-900 mb-4">
									Recipe Summary
								</h3>
								{recipe.summary ? (
									<div
										className="prose max-w-none text-gray-800 leading-relaxed"
										dangerouslySetInnerHTML={{ __html: recipe.summary }}
									/>
								) : (
									<p className="text-gray-500 italic">No summary available.</p>
								)}

								<div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
									{!!recipe.cuisines?.length && (
										<div>
											<h4 className="font-medium text-gray-900 mb-2">Cuisines</h4>
											<div className="flex flex-wrap gap-1">
												{recipe.cuisines.map((c, i) => (
													<span key={i} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm rounded">
														{c}
													</span>
												))}
											</div>
										</div>
									)}
									{!!recipe.dishTypes?.length && (
										<div>
											<h4 className="font-medium text-gray-900 mb-2">Dish Types</h4>
											<div className="flex flex-wrap gap-1">
												{recipe.dishTypes.map((t, i) => (
													<span key={i} className="px-2 py-1 bg-green-100 text-green-800 text-sm rounded">
														{t}
													</span>
												))}
											</div>
										</div>
									)}
								</div>

								{recipe.sourceUrl && (
									<div className="mt-6 pt-4 border-t border-gray-200">
										<a
											href={recipe.sourceUrl}
											target="_blank"
											rel="noopener noreferrer"
											className="inline-flex items-center text-blue-600 hover:text-blue-800 underline"
										>
											View Original Recipe
											<svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
												<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
											</svg>
										</a>
									</div>
								)}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
