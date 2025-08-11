"use client"

import { FaGithub } from "react-icons/fa";
import { useState } from "react";

export default function BioCard({ name, image, bio, link, job = "COOK" }) {
    const [flipped, setFlipped] = useState(false);

    // add -wbkit and will-change:transform allow fliping to work on safari
    const CARD_BASE =
        "absolute inset-0 rounded-xl shadow-lg p-4 flex flex-col items-center justify-center [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [will-change:transform]";

    return (
        <div
            className="cursor-pointer group [perspective:1000px] w-[220px] h-[300px]"
            onClick={() => setFlipped((p) => !p)}
        >
            {/* 3D wrapper */}
            <div
                className={`relative w-full h-full transition-transform duration-500 ease-in-out [transform-style:preserve-3d]
          ${flipped ? "[transform:rotateY(180deg)]" : "group-hover:[transform:rotateY(15deg)]"}
        `}
            >
                {/* FRONT */}
                <div className={`${CARD_BASE} justify-center bg-orange-100 border-[3px] border-orange-600`}>
                    {/* hat */}
                    <div className="absolute top-4 z-10">
                        <img
                            width="80"
                            height="80"
                            src="https://img.icons8.com/ios/80/ea580c/chef-hat.png"
                            alt="chef-hat"
                        />
                    </div>

                    {/* avatar */}
                    <div className="rounded-full border-4 border-orange-600 bg-orange-600 w-[90px] h-[90px] overflow-hidden flex-shrink-0 z-15">
                        <img
                            src={image || ""}
                            alt={`${name} Avatar`}
                            className="w-full h-full rounded-full object-cover scale-135 "
                        />
                    </div>

                    <div className="mt-4 text-center w-full">
                        <h2 className="font-bold text-orange-600 text-lg uppercase border-b-2">
                            {name}
                        </h2>
                        <span className="text-orange-600 font-bold text-sm">{job}</span>
                    </div>
                </div>

                {/* BACK */}
                <div
                    className={`${CARD_BASE} [transform:rotateY(180deg)] justify-between bg-orange-50`}
                >
                    <h2 className="text-gray-800 mt-4 text-xl font-semibold">{name}</h2>

                    <p className="text-gray-800 mt-2 text-xs text-center line-clamp-15">
                        {bio}
                    </p>

                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${name} GitHub`}
                        className="text-gray-100 mt-4 bg-orange-600 flex gap-1 py-2 px-4 rounded-full hover:scale-110 hover:bg-orange-500 transition"
                        onClick={(e) => e.stopPropagation()} // don't flip when clicking link
                    >
                        <FaGithub className="w-6 h-6" />
                        <span>Github</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
