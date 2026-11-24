// biome-ignore lint/suspicious/noShadowRestrictedNames: <toString from mdast-util-to-string>
import { toString } from "mdast-util-to-string";
import getReadingTime from "reading-time";
import sanitizeHtml from "sanitize-html";
import { visit } from "unist-util-visit";

export function remarkReadingTime() {
	return (tree, { data }) => {
		const text = [toString(tree, { includeHtml: false })];
		visit(tree, "html", ({ value }) => {
			text.push(
				sanitizeHtml(value, {
					allowedTags: [],
					nonTextTags: [
						"script",
						"style",
						"svg",
						"textarea",
						"option",
						"noscript",
					],
					textFilter: (chunk) => ` ${chunk} `,
				}),
			);
		});
		const readingTime = getReadingTime(text.join(" "));
		data.astro.frontmatter.minutes = Math.max(
			1,
			Math.round(readingTime.minutes),
		);
		data.astro.frontmatter.words = readingTime.words;
	};
}
