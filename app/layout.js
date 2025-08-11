// AUTHORS: Lu, Darryl

// CONTEXT
import Image from "next/image";
import "./contexts/FavoritesContext";
import { FavoritesProvider } from "./contexts/FavoritesContext";

// COMPONENTS
import Navbar from "./components/Navbar";

// STYLES
import "./globals.css";

// FONTS
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

// APP META DATA
export const metadata = {
	title: "CPAN114 - Spoonacular API",
	description: "A nice little Spoonacular API APP to find new recipes, save them, and view them for cooking!",
};

// ROOT LAYOUT THAT WRAPS THE APP
export default function RootLayout({ children }) {
	return (
		<FavoritesProvider>
			<html lang="en">
				<body className={`${geistSans.variable} ${geistMono.variable} antialiased w-screen h-screen`}>
					<Navbar />

					{/* content page*/}
					<div className="flex flex-col items-center w-screen min-h-screen">
						{/* background images */}
						<div className="relative w-[1800px] bg-red-300 h-0 z-0">

							<div className="absolute top-[-40px] right-50 opacity-5 transform rotate-12">
								<img width="250" height="250" src="https://img.icons8.com/ios/250/salad--v1.png" alt="salad--v1" />
							</div>

							<div className="absolute top-40 left-50 opacity-5 transform rotate-260">
								<img width="250" height="250" src="https://img.icons8.com/ios/250/pizza.png" alt="pizza" />
							</div>

							<div className="absolute top-150 left-24 opacity-5 transform rotate-6">
								<img width="250" height="250" src="https://img.icons8.com/ios/250/doughnut.png" alt="doughnut" />
							</div>

							<div className="absolute top-170 right-56 opacity-5 transform rotate-170">
								<img width="250" height="250" src="https://img.icons8.com/ios/250/sandwich.png" alt="sandwich" />
							</div>
						</div>
						{children}

					</div>




					{/* footer*/}
					<div className="flex flex-col justify-center items-center py-5 w-full mt-5 text-center">

						<div className="block md:hidden">
							<Image width={150} height={150} alt="logo" src={"/cookbook2.png"} />
						</div>


						<p className="text-gray-500 text-sm">
							Recipe data provided by{" "}
							<a
								href="https://spoonacular.com/food-api"
								target="_blank"
								rel="noopener noreferrer"
								className="text-orange-600 hover:underline"
							>
								Spoonacular API
							</a>
						</p>

						<p className="text-gray-500 text-sm">
							View the project on{" "}
							<a
								href="https://github.com/klu0926/group-spoonacular-clone"
								target="_blank"
								rel="noopener noreferrer"
								className="text-orange-600 hover:underline"
							>
								GitHub
							</a>
							.
						</p>
					</div>
				</body>
			</html>
		</FavoritesProvider>
	);
}
