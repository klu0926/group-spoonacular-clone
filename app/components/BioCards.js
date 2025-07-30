"use client"

export default function BioCard({ name, image, bio, link}) {
    return (
        <div className="bg-white shadow-md rounded-lg p-6 shadow-gray-200 padding-4 max-w-sm mx-auto margin-4 hover:scale-105 transition-transform duration-300">
            <img src={image} alt="placeholder" className="w-full h-48 object-cover rounded-t-lg mb-4" />
            <h2 className="text-xl font-bold mb-4">{name}</h2>
            <p className="text-gray-700 mb-4">{bio}</p>
            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">{link}</button>
        </div>
    )
}