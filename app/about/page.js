"use client";

import BioCard from "../components/BioCards";

// ABOUT PAGE STUB

export default function AboutPage() {
	// TODO - NOTHING DYNAMIC ON ABOUT PAGE...
	return (
		<div className="min-h-screen bg-blue-800 py-8">
			<div className="container mx-auto my-8 px-4 py-8 bg-white">
				<header className="text-center mb-8">
					<h1 className="text-4xl font-bold text-gray-800 mb-2">The Team</h1>
				</header>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					<BioCard
						name={"Clarance Leung"}
						image={"https://avatars.githubusercontent.com/u/194448761"}
						bio={"Bio for Clarance"}
						link={"https://github.com/kn-mn"}
					/>
				</div>
			</div>
		</div>
	);
}
