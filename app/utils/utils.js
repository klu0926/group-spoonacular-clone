// HELPFUL UTILS ACROSS THE PROJ

export const stripHtmlTags = (html) => {
	if (!html) return "";
	return html.replace(/<[^>]*>/g, "");
};
