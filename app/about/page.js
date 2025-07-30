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
				<div className="flex flex-wrap justify-center gap-8">
					<BioCard
						name={"Darryl Lecraw"}
						image={"https://avatars.githubusercontent.com/u/6304758"}
						bio={"Bio for Darryl"}
						link={"https://github.com/BossClaw"} />
					<BioCard
						name={"Clarance Leung"}
						image={"https://avatars.githubusercontent.com/u/194448761"}
						bio={"Bio for CL"}
						link={"https://github.com/kn-mn"} />
					<BioCard
						name={"Kuo Yu Lu"}
						image={"https://avatars.githubusercontent.com/u/106499794"}
						bio={`Former cinematic wizard turned code-slinging web dev. Built over 100 epic battle cutscenes. now battles bugs in JavaScript. Part-time SQL whisperer, full-time front-end sorcerer. Can debug faster than you can say “unexpected token.” Studying law, psychology, and car resale all at once because… why not? Dreams in Tailwind CSS and occasionally in APA 7 format.`}
						link={"https://github.com/klu0926"} />
					<BioCard
						name={"Noah Park"}
						image={"#"}
						bio={"Bio for Noah"}
						link={"https://github.com/noahp211"}
					/>
					<BioCard
						name={"Jasmine Sanders"}
						image={"https://avatars.githubusercontent.com/u/172424810"}
						bio={"Bio for Jasmine"}
						link={"https://github.com/Jaysandja3y"}
					/>
				</div>
			</div>
		</div>
	);
}
