"use client"

import { FaGithub } from "react-icons/fa";
import { useState } from "react";

export default function BioCard({ name, image, bio, link, job = 'COOK' }) {

    const [isFront, setIsFront] = useState(true);   // Track if showing front side
    const [initHover, setInitHover] = useState(false);

    const CARD_BASE =
        "absolute inset-0 rounded-xl shadow-lg p-4 flex flex-col items-center justify-center [backface-visibility:hidden]";

    return (
        <div
            className="cursor-pointer group [perspective:1000px] w-[220px] h-[300px]"
            onClick={() => {
                setIsFront(prev => !prev); // toggle between front/back
                setInitHover(false);
            }}
            onMouseEnter={() => {
                setInitHover(true);
            }}
            onMouseLeave={() => {
                setInitHover(false);
            }}
        >
            <div
                className={`relative w-full h-full duration-500 [transform-style:preserve-3d] ${isFront
                    ? initHover
                        ? "hover:[transform:rotateY(25deg)]"
                        : ""
                    : "[transform:rotateY(180deg)]"
                    }`}
            >
                {/* Front */}
                <div
                    className={`${CARD_BASE} justify-center bg-orange-100 border-3 border-orange-400`}
                >
                    {/* hat */}
                    <div className="absolute top-4 z-10">
                        <img
                            width="80"
                            height="80"
                            src="https://img.icons8.com/ios/80/f97316/chef-hat.png"
                            alt="chef-hat"
                        />
                    </div>

                    {/* avatar */}
                    <div className="related rounded-full border-4 border-orange-400 w-[90px] h-[90px] overflow-hidden flex-shrink-0 z-15">
                        <img
                            src={image || ""}
                            alt={`${name} Avatar`}
                            className="w-full h-full rounded-full transform-gpu object-cover scale-140"
                        />
                    </div>

                    <div className="mt-4 text-center w-full">
                        <h2 className="font-bold text-orange-500 text-lg uppercase border-b-2">
                            {name}
                        </h2>
                        <span className="text-orange-500 font-bold text-sm">
                            {job}
                        </span>
                    </div>
                </div>

                {/* Back */}
                <div
                    className={`${CARD_BASE} [transform:rotateY(180deg)] justify-between bg-gray-200`}
                >
                    <h2 className="text-gray-800 mt-4 text-xl font-semibold">
                        {name}
                    </h2>
                    <p className="text-gray-800 mt-2 text-xs text-center line-clamp-15">
                        {bio}
                    </p>

                    <a
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${name} GitHub`}
                        className="text-gray-100 mt-4 bg-gray-400 flex gap-1 py-2 px-4 rounded-full hover:scale-110 hover:bg-gray-600 transition"
                        onClick={(e) => {
                            e.stopPropagation(); // prevent flipping when clicking link
                        }}
                    >
                        <span>
                            <FaGithub className="w-6 h-6" />
                        </span>
                        <span>Github</span>
                    </a>
                </div>
            </div>
        </div>
    );
}
