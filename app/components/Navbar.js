// Kuo Yu Lu
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useFavorites } from "../contexts/FavoritesContext";
import Image from "next/image";

function NavLink({ href, isActive, children }) {
	return (
		<Link
			className={`cursor-pointer py-1 px-4 rounded-full transition
        ${isActive ? "bg-emerald-600 text-white hover:bg-emerald-500" : "text-gray-500 hover:bg-gray-200"}`}
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
        ${isActive ? "bg-emerald-600 text-white hover:bg-emerald-500" : "text-gray-400 hover:bg-gray-200"}`}
			href={href}
		>
			{children}
		</Link>
	);
}

export function BurgerMenu() {
	const { favorites } = useFavorites();
	const [isOpen, setIsOpen] = useState(false);
	const pathname = usePathname();
	const burgerRef = useRef(null);

	useEffect(() => {
		function handleOffClick(e) {
			if (burgerRef.current && !burgerRef.current.contains(e.target)) {
				setIsOpen(false);
			}
		}
		document.addEventListener("mousedown", handleOffClick);
		return () => document.removeEventListener("mousedown", handleOffClick);
	}, []);

	return (
		<div
			ref={burgerRef}
			className="md:hidden absolute justify-center items-center cursor-pointer bg-emerald-600 rounded-md w-10 h-10 text-center top-0 right-6 text-orange-50"
		>
			{/* Burger button */}
			<button onClick={() => setIsOpen(!isOpen)} className="text-3xl cursor-pointer">
				&#9776;
			</button>

			{/* Dropdown menu */}
			{isOpen && (
				<div className="absolute right-2 mt-3 flex flex-col bg-white shadow-lg rounded w-40 z-50 text-start border-2 border-emerald-600">
					<BurgerNavLink href="/" isActive={pathname === "/"}>
						<div className="flex gap-2 py-2 ">
							<img
								className={pathname === "/" ? "" : "hidden"}
								width="25"
								height="18"
								src="https://img.icons8.com/ios-glyphs/30/FFFFFF/cutlery.png"
								alt="cutlery"
							/>
							<img
								className={pathname === "/" ? "hidden" : ""}
								width="25"
								height="18"
								src="https://img.icons8.com/ios-glyphs/30/A9A9A9/cutlery.png"
								alt="cutlery"
							/>
							<span className="font-semibold">Home</span>
						</div>
					</BurgerNavLink>

					<BurgerNavLink href="/saved" isActive={pathname === "/saved"}>
						<div className="flex gap-2 py-2">
							<img
								className={pathname === "/saved" ? "" : "hidden"}
								width="25"
								height="18"
								src="https://img.icons8.com/material-outlined/30/FFFFFF/filled-like.png"
								alt="saved"
							/>
							<img
								className={pathname === "/saved" ? "hidden" : ""}
								width="25"
								height="18"
								src="https://img.icons8.com/material-outlined/30/A9A9A9/filled-like.png"
								alt="saved"
							/>
							<span className="font-semibold">Saved</span>
						</div>
					</BurgerNavLink>

					<BurgerNavLink href="/about" isActive={pathname === "/about"}>
						<div className="flex gap-2 py-2 group w-25 items-center">
							<img
								className={pathname === "/about" ? "" : "hidden"}
								width="25"
								height="18"
								src="https://img.icons8.com/ios-glyphs/30/FFFFFF/chef-hat.png"
								alt="about"
							/>
							<img
								className={pathname === "/about" ? "hidden" : ""}
								width="25"
								height="18"
								src="https://img.icons8.com/ios-glyphs/30/A9A9A9/chef-hat.png"
								alt="about"
							/>
							<span className="font-semibold">About</span>
						</div>
					</BurgerNavLink>
				</div>
			)}
		</div>
	);
}

export default function Navbar() {
	const { favorites } = useFavorites();
	const pathname = usePathname();

	return (
		<div className="absolute md:relative top-0 left-0 w-screen z-100 mt-4 mb-5 md:mb-0">
			<div className="flex gap-4 pt-2 px-10 items-center justify-between md:justify-start ">
				{/* Desktop Nav */}
				<div className="hidden md:flex gap-10 items-center justify-center w-full">
					<div>
						<Image width={150} height={150} alt="logo" src={"/cookbook2.png"} />
					</div>

					<NavLink href={"/"} isActive={pathname == "/"}>
						<div className="flex gap-2">
							<img
								className={pathname === "/" ? "" : "hidden"}
								width="25"
								height="18"
								src="https://img.icons8.com/ios-glyphs/30/FFFFFF/cutlery.png"
								alt="home"
							/>
							<img
								className={pathname === "/" ? "hidden" : ""}
								width="25"
								height="18"
								src="https://img.icons8.com/ios-glyphs/30/A9A9A9/cutlery.png"
								alt="home"
							/>
							<span className="font-semibold">Home</span>
						</div>
					</NavLink>

					<NavLink href={"/saved"} isActive={pathname === "/saved"}>
						<div className="flex gap-2">
							<img
								className={pathname === "/saved" ? "" : "hidden"}
								width="25"
								height="18"
								src="https://img.icons8.com/material-outlined/30/FFFFFF/filled-like.png"
								alt="saved"
							/>
							<img
								className={pathname === "/saved" ? "hidden" : ""}
								width="25"
								height="18"
								src="https://img.icons8.com/material-outlined/30/A9A9A9/filled-like.png"
								alt="saved"
							/>
							<span className="font-semibold">Saved ({favorites.length})</span>
						</div>
					</NavLink>

					<NavLink href={"/about"} isActive={pathname === "/about"}>
						<div className="flex gap-2 items-center">
							<img
								className={pathname === "/about" ? "" : "hidden"}
								width="25"
								height="18"
								src="https://img.icons8.com/ios-glyphs/30/FFFFFF/chef-hat.png"
								alt="about"
							/>
							<img
								className={pathname === "/about" ? "hidden" : ""}
								width="25"
								height="18"
								src="https://img.icons8.com/ios-glyphs/30/A9A9A9/chef-hat.png"
								alt="about"
							/>
							<span className="font-semibold">About</span>
						</div>
					</NavLink>
				</div>

				{/* Burger Menu */}
				<BurgerMenu />
			</div>
		</div>
	);
}
