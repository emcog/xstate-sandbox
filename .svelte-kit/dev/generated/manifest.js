const c = [
	() => import("../../../src/routes/__layout.svelte"),
	() => import("../components/error.svelte"),
	() => import("../../../src/routes/index.svelte"),
	() => import("../../../src/routes/presshold.svelte"),
	() => import("../../../src/routes/example.svelte"),
	() => import("../../../src/routes/phab.svelte")
];

const d = decodeURIComponent;

export const routes = [
	// src/routes/index.svelte
	[/^\/$/, [c[0], c[2]], [c[1]]],

	// src/routes/presshold.svelte
	[/^\/presshold\/?$/, [c[0], c[3]], [c[1]]],

	// src/routes/example.svelte
	[/^\/example\/?$/, [c[0], c[4]], [c[1]]],

	// src/routes/phab.svelte
	[/^\/phab\/?$/, [c[0], c[5]], [c[1]]]
];

// we import the root layout/error components eagerly, so that
// connectivity errors after initialisation don't nuke the app
export const fallback = [c[0](), c[1]()];