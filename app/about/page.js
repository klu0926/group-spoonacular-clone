// ABOUT PAGE
// CLARANCE LEUNG
"use client";

import BioCard from "../components/BioCards";

export default function AboutPage() {
	// FINALLY, RETURN THE PAGE w/SAME STYLE
	return (
		<div className="page-wrapper">
			<header className="text-center mb-8">
				<h1 className="text-4xl font-bold text-orange-500 mb-2">THE COOKS</h1>
			</header>
			<div className="grid grid-cols-1 md:flex gap-10 flex-wrap items-center justify-center max-w-3xl">
				<BioCard
					name={"Darryl Lecraw"}
					image={"https://avatars.githubusercontent.com/u/6304758"}
					bio={"Darryl is still thinking about what to write.  Keep your eyes on this space."}
					link={"https://github.com/BossClaw"}
					job={"Sauce Boss"}
				/>
				<BioCard
					name={"Clarance Leung"}
					image={"https://avatars.githubusercontent.com/u/194448761"}
					bio={"Doesn't Overthink things.  Loves Icon Packages."}
					link={"https://github.com/kn-mn"}
					job={"Chef de Clarance"}
				/>
				<BioCard
					name={"Kuo Yu Lu"}
					image={"https://avatars.githubusercontent.com/u/106499794"}
					bio={`Former cinematic wizard turned web dev. Now battling JavaScript bugs, SQL whisperer, front-end sorcerer, and Tailwind dreamer who sometimes thinks in APA 7.`}
					link={"https://github.com/klu0926"}
					job={"Gril-Lu Master"}
				/>

				<BioCard
					name={"Noah Park"}
					image={"https://github.githubassets.com/images/gravatars/gravatar-user-420.png?size=40"}
					bio={"I’m Noah a student at Humber College, I’m an amateur boxer, my favourite movie is Wardogs and I really like pizza."}
					link={"https://github.com/noahp211"}
					job={"Wok in the Park"}
				/>
				<BioCard
					name={"Jasmine Sanders"}
					image={"https://avatars.githubusercontent.com/u/172424810"}
					bio={"Running on caffeine, chaos, and questionable decisions."}
					link={"https://github.com/Jaysandja3y"}
					job={"Jas-mash Potato"}
				/>
			</div >
		</div>
	);
}
