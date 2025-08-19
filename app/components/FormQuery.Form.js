"use client";

import { useFormQuery } from "./FormQuery";

export default function FormQueryForm() {
  const {
    formData,
    showMoreForm,
    setShowMoreForm,
    handleInputChange,
    intoleranceOptions,
    sortOptions,
    cuisineOptions,
    dietOptions,
    loading,
    handleSubmit,
    handleReset,
  } = useFormQuery();

  return !showMoreForm ? (
    <div
      className="w-full mt-5 py-2 text-center flex items-center justify-center text-orange-600 bg-orange-100 rounded-md cursor-pointer"
      onClick={() => setShowMoreForm(true)}
    >
      Show options
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M6 9l6 6 6-6" />
      </svg>
    </div>
  ) : (
    <div className="w-full p-2 rounded-2xl bg-orange-100 mt-5">
      <div
        className="w-full text-center flex items-center justify-center text-orange-600 bg-orange-100 rounded-md mb-5 cursor-pointer"
        onClick={() => setShowMoreForm(false)}
      >
        Hide options
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M18 15l-6-6-6 6" />
        </svg>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6 px-4 py-2">
        {/* TWO COLUMN LAYOUT */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT COLUMN */}
          <div className="space-y-4">
            {/* CUISINE */}
            <div>
              <label
                htmlFor="cuisine"
                className="block text-sm font-bold text-gray-500 mb-2"
              >
                Cuisine Type
              </label>
              <select
                id="cuisine"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-600 bg-orange-50"
              >
                <option value="">Any Cuisine</option>
                {cuisineOptions.map((cuisine) => (
                  <option key={cuisine} value={cuisine}>
                    {cuisine}
                  </option>
                ))}
              </select>
            </div>

            {/* INCLUDE INGREDIENTS */}
            <div>
              <label
                htmlFor="includeIngredients"
                className="block text-sm font-bold text-gray-500 mb-2"
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
                  className="w-full px-3 py-2 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-600 bg-orange-50"
              />
            </div>

            {/* EXCLUDE INGREDIENTS */}
            <div>
              <label
                htmlFor="excludeIngredients"
                className="block text-sm font-bold text-gray-500 mb-2"
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
                  className="w-full px-3 py-2 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-600 bg-orange-50"
              />
            </div>
          </div>

          {/* RIGHT COLUMN */}
          <div className="space-y-4">
            {/* Diet */}
            <div>
              <label
                htmlFor="diet"
                className="block text-sm font-bold text-gray-500 mb-2"
              >
                Diet Type
              </label>
              <select
                id="diet"
                name="diet"
                value={formData.diet}
                onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-600 bg-orange-50"
              >
                <option value="">Any Diet</option>
                {dietOptions.map((diet) => (
                  <option key={diet} value={diet}>
                    {diet}
                  </option>
                ))}
              </select>
            </div>

            {/* Intolerances */}
            <div>
              <label
                htmlFor="intolerances"
                className="block text-sm font-bold text-gray-500 mb-2"
              >
                Food Intolerances
              </label>
              <select
                id="intolerances"
                name="intolerances"
                value={formData.intolerances}
                onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-600 bg-orange-50"
              >
                <option value="">No Restrictions</option>
                {intoleranceOptions.map((intolerance) => (
                  <option key={intolerance} value={intolerance}>
                    {intolerance}
                  </option>
                ))}
              </select>
            </div>

            {/* Max Ready Time */}
            <div>
              <label
                htmlFor="maxReadyTime"
                className="block text-sm font-bold text-gray-500 mb-2"
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
                  className="w-full px-3 py-2 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-600 bg-orange-50"
              />
            </div>
          </div>
        </div>

        {/* Calories Range */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="minCalories"
              className="block text-sm font-bold text-gray-500 mb-2"
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
                className="w-full px-3 py-2 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-600 bg-orange-50"
            />
          </div>
          <div>
            <label
              htmlFor="maxCalories"
              className="block text-sm font-bold text-gray-500 mb-2"
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
                className="w-full px-3 py-2 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-600 bg-orange-50"
            />
          </div>
        </div>

        {/* SORT OPTIONS */}
        <div>
          <label
            htmlFor="sort"
            className="block text-sm font-bold text-gray-500 mb-2"
          >
            Sort Results By
          </label>
          <select
            id="sort"
            name="sort"
            value={formData.sort}
            onChange={handleInputChange}
              className="w-full px-3 py-2 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-600 bg-orange-50"
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-orange-600 hover:bg-orange-600 disabled:bg-orange-400 text-white font-semibold py-3 px-6 rounded-lg transition cursor-pointer hover:scale-95"
          >
            {loading ? "Loading..." : "Search Recipes"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-6 py-3 bg-gray-200 text-gray-500 font-semibold rounded-lg hover:bg-gray-300 transition cursor-pointer hover:scale-95"
          >
            Reset
          </button>
        </div>
      </form>
    </div>
  );
}
