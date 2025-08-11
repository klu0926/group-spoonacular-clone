'use client'
import { useFormQuery } from "./FormQuery";
import Spinner from "./Spinner";

export default function FormQueryFormSearchbar() {
  const {
    formData,
    handleInputChange,
    handleQueryReset,
    intoleranceOptions,
    sortOptions,
    cuisineOptions,
    dietOptions,
    loading,
    handleSubmit,
    handleReset,
  } = useFormQuery();


  return (
    <div className="w-full mt-1">
      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        <div className="flex flex-col gap-5 items-center">

          <div className="relative w-full">
            <input
              type="text"
              id="query"
              name="query"
              value={formData.query}
              onChange={handleInputChange}
              placeholder="e.g., pasta, chicken, chocolate cake..."
              className="w-full px-4 py-2 border-4 border-orange-600 rounded-4xl focus:outline-none focus:border-orange-600 text-orange-600 font-bold"
            />

            {
              loading ? (
                // spinner
                <div className="absolute right-5 top-3">
                  <Spinner size={"5"} />
                </div>
              ) : (
                // reset query button
                <button
                  type="button"
                  className="absolute right-5 top-2 text-orange-600 p-1 rounded-4xl hover:bg-gray-200 hover:scale-90 cursor-pointer transition"
                  onClick={handleQueryReset}
                >
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
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </button>
              )
            }

          </div>
        </div>
      </form >
    </div >
  )
}