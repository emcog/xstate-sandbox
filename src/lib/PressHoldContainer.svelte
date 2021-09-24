<script>
	// ---> Svelte core
	import { onMount } from 'svelte';
	import { oddsEqualActivePress } from './stores/storePhabButtonState.js';
	import { phabCounter } from './stores/storePhabCounter.js';

// ---> Svelte component
	import PressHoldButton from './PressHoldButton.svelte'
	import ExpandingCollapsingCircle from '$lib/ExpandingCollapsingCircle.svelte'
	import OnBoardPhab from '$lib/OnBoardPhab.svelte';



	// ---> JS components
	import CBuffer from '$lib/phab/js/modules/cbuffer.js';
	import { easing } from '$lib/phab/js/modules/easings.js';


	// ---> Variables

	let loopingIncrementId;
	let loopingDecrementId;
	let size;


	function changeSize() {
		const suffix = 'px';
		document.documentElement.style.setProperty(`--size`, $phabCounter + suffix);
	}

	// ----> Utilites end

	// ----> Triggers and loops start


	function startPressHoldFinishRelease () {
		cancelAnimationFrame(loopingDecrementId);
		loopingIncrement();
	}


	function startReleaseFinishPressHold() {
		cancelAnimationFrame(loopingIncrementId);
		loopingDecrement();
	}


	function loopingIncrement() {
		size += 1.15;
		phabCounter.update(n => n + 1.15);
		loopingIncrementId = requestAnimationFrame(loopingIncrement);
		changeSize();
	}


	function loopingDecrement() {
		loopingDecrementId = requestAnimationFrame(loopingDecrement);
		phabCounter.update(n => n - 0.9);
		if ($phabCounter <= 1) { cancelAnimationFrame(loopingDecrementId) }
		changeSize();
	}

	// ----> Trigger on store update

	$: if($oddsEqualActivePress > 0) {
		if ($oddsEqualActivePress % 2 === 1) {
			startPressHoldFinishRelease()
		} else {
			startReleaseFinishPressHold()
		}
	}

</script>


<div>
	<ExpandingCollapsingCircle />
	<PressHoldButton
		on:phabButtonIsUp={ startReleaseFinishPressHold }
		on:phabButtonIsDown={ startPressHoldFinishRelease }
	/>
	<OnBoardPhab />
</div>


<style>
	div {
      display: grid;
      grid-template-columns: 1fr 375px 1fr;
      grid-template-rows: 2.625fr 375px repeat(3, 1fr);
      width: 100%;
      height: 100%;
	}
</style>