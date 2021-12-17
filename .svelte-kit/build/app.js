import { respond } from '@sveltejs/kit/ssr';
import root from './generated/root.svelte';
import { set_paths, assets } from './runtime/paths.js';
import { set_prerendering } from './runtime/env.js';
import * as user_hooks from "./hooks.js";

const template = ({ head, body }) => "<!DOCTYPE html>\n<html lang=\"en\">\n\t<head>\n\t\t<meta charset=\"utf-8\" />\n\t\t<link rel=\"icon\" href=\"/favicon.ico\" />\n\t\t<meta name=\"viewport\" content=\"width=device-width, initial-scale=1\" />\n\t\t" + head + "\n\t</head>\n\t<body>\n\t\t<div id=\"svelte\">" + body + "</div>\n\t</body>\n</html>\n";

let options = null;

const default_settings = { paths: {"base":"","assets":""} };

// allow paths to be overridden in svelte-kit preview
// and in prerendering
export function init(settings = default_settings) {
	set_paths(settings.paths);
	set_prerendering(settings.prerendering || false);

	const hooks = get_hooks(user_hooks);

	options = {
		amp: false,
		dev: false,
		entry: {
			file: assets + "/_app/start-41bb6dba.js",
			css: [assets + "/_app/assets/start-61d1577b.css"],
			js: [assets + "/_app/start-41bb6dba.js",assets + "/_app/chunks/vendor-1196987c.js"]
		},
		fetched: undefined,
		floc: false,
		get_component_path: id => assets + "/_app/" + entry_lookup[id],
		get_stack: error => String(error), // for security
		handle_error: (error, request) => {
			hooks.handleError({ error, request });
			error.stack = options.get_stack(error);
		},
		hooks,
		hydrate: true,
		initiator: undefined,
		load_component,
		manifest,
		paths: settings.paths,
		prerender: true,
		read: settings.read,
		root,
		service_worker: null,
		router: true,
		ssr: true,
		target: "#svelte",
		template,
		trailing_slash: "never"
	};
}

// input has already been decoded by decodeURI
// now handle the rest that decodeURIComponent would do
const d = s => s
	.replace(/%23/g, '#')
	.replace(/%3[Bb]/g, ';')
	.replace(/%2[Cc]/g, ',')
	.replace(/%2[Ff]/g, '/')
	.replace(/%3[Ff]/g, '?')
	.replace(/%3[Aa]/g, ':')
	.replace(/%40/g, '@')
	.replace(/%26/g, '&')
	.replace(/%3[Dd]/g, '=')
	.replace(/%2[Bb]/g, '+')
	.replace(/%24/g, '$');

const empty = () => ({});

const manifest = {
	assets: [{"file":"favicon.ico","size":1150,"type":"image/vnd.microsoft.icon"},{"file":"fonts/courier-new/Courier New Bold Italic.ttf","size":506640,"type":"font/ttf"},{"file":"fonts/courier-new/Courier New Bold.ttf","size":691796,"type":"font/ttf"},{"file":"fonts/courier-new/Courier New Italic.ttf","size":589900,"type":"font/ttf"},{"file":"fonts/courier-new/courier-new.ttf","size":684624,"type":"font/ttf"},{"file":"onboarding/dpjy.svg","size":1788,"type":"image/svg+xml"},{"file":"onboarding/lsa.svg","size":1562,"type":"image/svg+xml"},{"file":"onboarding/onBoardPhab01.svg","size":55527,"type":"image/svg+xml"},{"file":"onboarding/onBoardPhab02.svg","size":24013,"type":"image/svg+xml"},{"file":"onboarding/onBoardPhab03.svg","size":29350,"type":"image/svg+xml"},{"file":"onboarding/onBoardPhab04.svg","size":26684,"type":"image/svg+xml"},{"file":"onboarding/onBoardPhab05.svg","size":43961,"type":"image/svg+xml"},{"file":"onboarding/onBoardPhab06.svg","size":12390,"type":"image/svg+xml"},{"file":"onboarding/onBoardPhab07.svg","size":54855,"type":"image/svg+xml"},{"file":"onboarding/rtb.svg","size":1815,"type":"image/svg+xml"},{"file":"onboarding/tpl.svg","size":1942,"type":"image/svg+xml"},{"file":"robots.txt","size":67,"type":"text/plain"},{"file":"wordmark.svg","size":25361,"type":"image/svg+xml"}],
	layout: "src/routes/__layout.svelte",
	error: ".svelte-kit/build/components/error.svelte",
	routes: [
		{
						type: 'page',
						pattern: /^\/$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/index.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					},
		{
						type: 'page',
						pattern: /^\/example\/?$/,
						params: empty,
						a: ["src/routes/__layout.svelte", "src/routes/example.svelte"],
						b: [".svelte-kit/build/components/error.svelte"]
					}
	]
};

// this looks redundant, but the indirection allows us to access
// named imports without triggering Rollup's missing import detection
const get_hooks = hooks => ({
	getSession: hooks.getSession || (() => ({})),
	handle: hooks.handle || (({ request, resolve }) => resolve(request)),
	handleError: hooks.handleError || (({ error }) => console.error(error.stack)),
	externalFetch: hooks.externalFetch || fetch
});

const module_lookup = {
	"src/routes/__layout.svelte": () => import("../../src/routes/__layout.svelte"),".svelte-kit/build/components/error.svelte": () => import("./components/error.svelte"),"src/routes/index.svelte": () => import("../../src/routes/index.svelte"),"src/routes/example.svelte": () => import("../../src/routes/example.svelte")
};

const metadata_lookup = {"src/routes/__layout.svelte":{"entry":"pages/__layout.svelte-a472312b.js","css":["assets/pages/__layout.svelte-f01b6394.css"],"js":["pages/__layout.svelte-a472312b.js","chunks/vendor-1196987c.js"],"styles":[]},".svelte-kit/build/components/error.svelte":{"entry":"error.svelte-bbf650f2.js","css":[],"js":["error.svelte-bbf650f2.js","chunks/vendor-1196987c.js"],"styles":[]},"src/routes/index.svelte":{"entry":"pages/index.svelte-820bfda3.js","css":["assets/pages/index.svelte-cca6e37a.css"],"js":["pages/index.svelte-820bfda3.js","chunks/vendor-1196987c.js"],"styles":[]},"src/routes/example.svelte":{"entry":"pages/example.svelte-cf26074e.js","css":[],"js":["pages/example.svelte-cf26074e.js","chunks/vendor-1196987c.js"],"styles":[]}};

async function load_component(file) {
	const { entry, css, js, styles } = metadata_lookup[file];
	return {
		module: await module_lookup[file](),
		entry: assets + "/_app/" + entry,
		css: css.map(dep => assets + "/_app/" + dep),
		js: js.map(dep => assets + "/_app/" + dep),
		styles
	};
}

export function render(request, {
	prerender
} = {}) {
	const host = request.headers["host"];
	return respond({ ...request, host }, options, { prerender });
}