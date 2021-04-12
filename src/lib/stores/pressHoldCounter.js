import {writable} from '$lib/svlete/store';
import { onMount } from 'svelte';
import CBuffer from '$lib/phab/js/modules/cbuffer.js';
import { easing } from '$lib/phab/js/modules/easings.js';

export const storeSize = writable(0)


