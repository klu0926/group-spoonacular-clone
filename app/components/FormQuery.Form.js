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

      <form onSubmit={handleSubmit} className="px-3 py-2">
        {/* Controls grid: packs tightly, wraps as needed */}
        <div
          className="grid gap-3"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}
        >
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
              <option value="">Any</option>
              {cuisineOptions.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Diet */}
          <div className="space-y-1">
            <label htmlFor="diet" className="block text-xs font-semibold text-gray-500">
              Diet
            </label>
            <select
              id="diet"
              name="diet"
              value={formData.diet}
              onChange={handleInputChange}
              className="w-full px-2 py-1.5 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-700 bg-orange-50 text-sm"
            >
              <option value="">Any</option>
              {dietOptions.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* Intolerances */}
          <div className="space-y-1">
            <label htmlFor="intolerances" className="block text-xs font-semibold text-gray-500">
              Intolerances
            </label>
            <select
              id="intolerances"
              name="intolerances"
              value={formData.intolerances}
              onChange={handleInputChange}
              className="w-full px-2 py-1.5 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-700 bg-orange-50 text-sm"
            >
              <option value="">None</option>
              {intoleranceOptions.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          {/* Max Ready Time */}
          <div className="space-y-1">
            <label htmlFor="maxReadyTime" className="block text-xs font-semibold text-gray-500">
              Max Time (min)
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
              className="w-full px-2 py-1.5 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-700 bg-orange-50 text-sm"
            />
          </div>

          {/* Include Ingredients */}
          <div className="space-y-1">
            <label htmlFor="includeIngredients" className="block text-xs font-semibold text-gray-500">
              Include
            </label>
            <input
              type="text"
              id="includeIngredients"
              name="includeIngredients"
              value={formData.includeIngredients}
              onChange={handleInputChange}
              placeholder="tomatoes, cheese, basil"
              className="w-full px-2 py-1.5 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-700 bg-orange-50 text-sm"
            />
          </div>

          {/* Exclude Ingredients */}
          <div className="space-y-1">
            <label htmlFor="excludeIngredients" className="block text-xs font-semibold text-gray-500">
              Exclude
            </label>
            <input
              type="text"
              id="excludeIngredients"
              name="excludeIngredients"
              value={formData.excludeIngredients}
              onChange={handleInputChange}
              placeholder="nuts, shellfish"
              className="w-full px-2 py-1.5 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-700 bg-orange-50 text-sm"
            />
          </div>

          {/* Calories Range (inline pair) */}
          <div className="space-y-1">
            <span className="block text-xs font-semibold text-gray-500">Calories</span>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="minCalories"
                name="minCalories"
                value={formData.minCalories}
                onChange={handleInputChange}
                placeholder="Min"
                min="0"
                className="w-full px-2 py-1.5 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-700 bg-orange-50 text-sm"
              />
              <span className="text-gray-400 text-sm">–</span>
              <input
                type="number"
                id="maxCalories"
                name="maxCalories"
                value={formData.maxCalories}
                onChange={handleInputChange}
                placeholder="Max"
                min="0"
                className="w-full px-2 py-1.5 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-700 bg-orange-50 text-sm"
              />
            </div>
          </div>

          {/* Sort */}
          <div className="space-y-1">
            <label htmlFor="sort" className="block text-xs font-semibold text-gray-500">
              Sort By
            </label>
            <select
              id="sort"
              name="sort"
              value={formData.sort}
              onChange={handleInputChange}
              className="w-full px-2 py-1.5 border border-orange-400 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-600 text-orange-700 bg-orange-50 text-sm"
            >
              {sortOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="flex-1 bg-orange-600 hover:bg-orange-600 disabled:bg-orange-400 text-white font-semibold py-2.5 px-4 rounded-lg transition cursor-pointer hover:scale-99 text-sm"
          >
            {loading ? "Loading..." : "Search Recipes"}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="px-4 py-2.5 bg-gray-200 text-gray-600 font-semibold rounded-lg hover:bg-gray-300 transition cursor-pointer hover:scale-95 text-sm"
          >
            Reset
          </button>
        </div>
      </form>


    </div>
  );
}
