// AUTHOR : Kuo Yu Lu
import { useState, useEffect } from 'react';

//main modal component for displaying recipe details
export default function CookingModal({ recipe, isOpen, onClose }) {
	//tracking active tab
	const [activeTab, setActiveTab] = useState('ingredients');
	//tracking checked off ingredients
	const [checkedIngredients, setCheckedIngredients] = useState({});

	//Lock background scrol when modal is open
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'unset';
		}

		return () => {
			document.body.style.overflow = 'unset';
		};
	}, [isOpen]);
	//toggle checkbox state for an ingredient
	const handleIngredientCheck = (index) => {
		setCheckedIngredients(prev => ({
			...prev,
			[index]: !prev[index]
		}));
	};
	// convert total minutes into a readable time (hours,minutes,seconds
	const formatTime = (minutes) => {
		if (!minutes) return 'N/A';
		if (minutes < 60) return `${minutes} min`;
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
	};

	const formatInstructions = (instructions) => {
		if (!instructions) return [];

		// If instructions is a string, try to split it into steps
		if (typeof instructions === 'string') {
			return instructions
				.split(/\d+\.|\n/)
				.filter(step => step.trim().length > 0)
				.map(step => step.trim());
		}

		// If it's an array of instruction objects
		if (Array.isArray(instructions)) {
			return instructions.map(instruction =>
				instruction.step || instruction.text || instruction
			);
		}

		return [];
	};

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 z-50 overflow-y-auto">
			{/* Backdrop (click to close modal) */}
			<div
				className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
				onClick={onClose}
			/>

			{/* Modal */}
			<div className="flex min-h-full items-center justify-center p-4">
				<div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
					{/* Header */}
					<div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-start">
						<div className="flex-1 pr-4">
							<h2 className="text-2xl font-bold text-gray-900 mb-2">
								{recipe.title}
							</h2>
							<div className="flex flex-wrap gap-4 text-sm text-gray-600">
								{recipe.readyInMinutes && (
									<span className="flex items-center">
										{/* clock icon */}
										<svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
										</svg>
										{formatTime(recipe.readyInMinutes)}
									</span>
								)}
								{recipe.servings && (
									<span className="flex items-center">
										{/* serving icon */}
										<svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
										</svg>
										{recipe.servings} servings
									</span>
								)}
								{recipe.healthScore && (
									<span className="flex items-center">
										{/* Healthy icon */}
										<svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
											<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
										</svg>
										{recipe.healthScore}% healthy
									</span>
								)}
							</div>
						</div>

						{/* close modal button*/}
						<button
							onClick={onClose}
							className="flex-shrink-0 p-2 text-gray-400 hover:text-gray-600 transition-colors"
						>
							{/* Cross icon */}
							<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
								<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
							</svg>
						</button>
					</div>

					{/* Tabs */}
					{/* Create tabs for each label */}
					<div className="border-b border-gray-200">
						<nav className="flex px-6">
							{/* Create an array of tabs */}
							{[
								{ id: 'ingredients', label: 'Ingredients', icon: '📝' },
								{ id: 'instructions', label: 'Instructions', icon: '👨‍🍳' },
								{ id: 'nutrition', label: 'Nutrition', icon: '🥗' },
								{ id: 'summary', label: 'Summary', icon: 'ℹ️' }
							].map(tab => (
								/* For each tabs create a tab button*/
								<button
									key={tab.id}
									onClick={() => setActiveTab(tab.id)}
									className={`py-3 px-4 text-sm font-medium border-b-2 transition-colors ${activeTab === tab.id
										? 'border-blue-500 text-blue-600'
										: 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
										}`}
								>
									<span className="mr-2">{tab.icon}</span>
									{tab.label}
								</button>
							))}
						</nav>
					</div>

					{/* Content */}
					<div className="p-6 overflow-y-auto max-h-[60vh]">
						{/* Ingredients Tab */}

						{/* Instructions Tab */}

						{/* Nutrition Tab */}

						{/* Summary Tab */}

					</div>
				</div>
			</div>
		</div>
	);
}

