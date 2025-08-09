// Kuo Yu Lu
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";

function NavLink({ href, isActive, children }) {
	return (
		<Link
			className={`cursor-pointer py-1 px-4 rounded-4xl transition
				${isActive ? "bg-orange-500 text-white hover:bg-oragne-500" : "text-gray-500 hover:bg-orange-200"}`}
			href={href}
		>
			{children}
		</Link>
	);
}


function BurgerNavLink({ href, isActive, children }) {
	return (
		<Link
			className={`cursor-pointer py-1 px-4 transition
				${isActive ? "bg-orange-500 text-white hover:bg-oragne-500" : "text-gray-500 hover:bg-orange-200"}`}
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
		<div ref={burgerRef} className="md:hidden absolute justify-center items-center cursor-pointer hover:bg-gray-100 rounded-md w-12 h-12 text-center top-0 right-6 text-orange-600">
			{/* Burger button */}
			<button onClick={() => setIsOpen(!isOpen)} className="text-4xl cursor-pointer">
				{/* Unicode character for ☰ */}
				&#9776;
			</button>

			{/* Dropdown menu */}
			{isOpen && (
				<div className="absolute right-2 mt-3 flex flex-col gap-2 px-2 py-1 bg-white shadow-md rounded w-40 z-50 text-start border-2 border-orange-500">
					<BurgerNavLink href="/" isActive={pathname === "/"}>Home</BurgerNavLink>
					<BurgerNavLink href="/favorites" isActive={pathname === "/favorites"}>Favorites</BurgerNavLink>
					<BurgerNavLink href="/about" isActive={pathname === "/about"}>About Us</BurgerNavLink>
				</div>
			)}
		</div>
	);
}


export default function Navbar() {
	const pathname = usePathname();
	return (
		<div className="absolute md:relative top-0 left-0 w-screen z-100 mt-4 mb-5">
			<div className="flex gap-4 pt-2 px-10 items-center justify-between md:justify-start ">

				{/* Desktop Nav */}
				<div className="hidden md:flex gap-10 items-center justify-center w-full">
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
