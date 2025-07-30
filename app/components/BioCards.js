"use client"

import { useState } from "react";

export default function BioCard({ name, image, bio, link }) {

    const [flipped, setFlipped] = useState(false);

    return (
        <div className="cursor-pointer group [perspective:1000px] w-64 h-80" onClick={() => setFlipped(prev => !prev)}>
            <div className={`relative w-full h-full duration-700 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
                {/* Front */}
                <div className="absolute inset-0 [backface-visibility:hidden] flex flex-col items-center shadow-lg">
                    <img src={image} alt={name} className="" />
                    <h2 className="text-gray-800">{name}</h2>
                </div>
                {/* Back */}
                <div className='absolute inset-0 [transform:rotateY(180deg)] [backface-visibility:hidden] flex flex-col items-center shadow-lg'>
                    <h2 className="text-gray-800">{name}</h2>
                    <p className="text-gray-800">{bio}</p>
                    <a href={link} className="block w-6 h-6"><img src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="GitHub Link" className="w-full h-full"/></a>
                </div>
            </div>
        </div>
    );
}