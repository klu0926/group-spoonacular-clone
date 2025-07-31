"use client"

import { FaGithub } from "react-icons/fa";
import { useState } from "react";

export default function BioCard({ name, image, bio, link }) {

    const [flipped, setFlipped] = useState(false);
    const CARD_BASE = "absolute inset-0 rounded-xl bg-white shadow-lg p-4 flex flex-col items-center justify-center [backface-visibility:hidden]";


    return (
        <div className="cursor-pointer group [perspective:1000px] w-64 h-80" onClick={() => setFlipped(prev => !prev)}>
            <div className={`relative w-full h-full duration-700 [transform-style:preserve-3d] ${flipped ? "[transform:rotateY(180deg)]" : ""}`}>
                {/* Front */}
                <div className={`${CARD_BASE} justify-center`}>
                    <img src={image || null } alt={`${name} Avatar`} className="h-24 w-24 rounded-full object-cover" />
                    <h2 className="text-gray-800 mt-4 text-xl font-semibold">{name}</h2>
                </div>
                {/* Back */}
                <div className={`${CARD_BASE} [transform:rotateY(180deg)] justify-between`}>
                    <h2 className="text-gray-800 mt-4 text-xl font-semibold">{name}</h2>
                    <p className="text-gray-800 mt-2 text-xs text-center line-clamp-15">{bio}</p>
                    {/* <a href={link} className="block w-6 h-6"><img fill={true} src="https://github.githubassets.com/assets/GitHub-Mark-ea2971cee799.png" alt="GitHub Link" className="w-full h-full"/></a> */}
                    <a href={link} target="_blank" rel="noopener noreferrer" aria-label={`${name} GitHub`} className="text-black mt-4 w-6 h-6 hover:scale-110 transition-transform" onClick={e => { e.stopPropagation(); }}>
                        <FaGithub className="w-full h-full" />
                    </a>
                </div>
            </div >
        </div >
    );
}