// Kuo Yu Lu
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

function NavLink({ href, isActive, children }) {
	return (
		<Link
			className={`cursor-pointer hover:text-orange-400 ${isActive ? "text-orange-500" : "text-gray-800"}`}
			href={href}
		>
			{children}
		</Link>
	);
}

export function BurgerMenu() {
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const burgerRef = useRef(null)

	// check off click
	useEffect(() => {

		function handleOffClick(e) {
			// If burger ref exist
			// And click target is Not in its children
			if (burgerRef.current && !burgerRef.current.contains(event.target)) {
				setIsOpen(false)
			}
		}

		document.addEventListener('mousedown', handleOffClick)

		// Clean up
		return () => {
			document.removeEventListener("mousedown", handleOffClick);
		};

	}, [isOpen])


	return (
		<div ref={burgerRef} className="md:hidden justify-center items-center cursor-pointer hover:bg-gray-100 rounded-md w-10 h-10 text-center">
			{/* Burger button */}
			<button onClick={() => setIsOpen(!isOpen)} className="text-3xl cursor-pointer">
				{/* Unicode character for ☰ */}
				&#9776;
			</button>

			{/* Dropdown menu */}
			{isOpen && (
				<div className="absolute right-6 mt-3 flex flex-col gap-2 px-2 py-1 bg-white border shadow-md rounded w-30 z-50 text-start">
					<NavLink href="/" isActive={pathname === "/"}>Home</NavLink>
					<NavLink href="/favorites" isActive={pathname === "/favorites"}>Favorites</NavLink>
					<NavLink href="/about" isActive={pathname === "/about"}>About Us</NavLink>
				</div>
			)}
		</div>
	);
}


export default function Navbar() {
	const pathname = usePathname();
	return (
		<div className="fixed top-0 left-0 w-screen  border-b-1 border-black bg-white">
			<div className="flex gap-4 pt-2 px-10 items-center justify-between md:justify-start ">
				<Link
					href={"/"}
				>
					<span
						className="font-bold text-2xl md:text-3xl me-3"
					>
						DA COOKBOOK
					</span>
				</Link>

				{/* Desktop Nav */}
				<div className="hidden md:flex gap-4 ">
					<NavLink
						href={"/"}
						isActive={pathname == "/"}
					>
						Home
					</NavLink>
					<NavLink
						href={"/favorites"}
						isActive={pathname === "/favorites"}
					>
						Favorites
					</NavLink>
					<NavLink
						href={"/about"}
						isActive={pathname === "/about"}
					>
						About Us
					</NavLink>
				</div>


				{/* Burger Menu */}
				<BurgerMenu />

			</div>
		</div>
	);
}
