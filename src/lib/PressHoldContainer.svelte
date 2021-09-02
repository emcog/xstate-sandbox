<script>
	// ---> Svelte core
	import { onMount } from 'svelte';
// ---> Svelte component
	import PressHoldButton from './PressHoldButton.svelte'
	import PhabTextDisplay from '$lib/PhabTextDisplay.svelte'
	import ExpandingCollapsingCircle from '$lib/ExpandingCollapsingCircle.svelte'
	import OnBoardPhab from '$lib/OnBoardPhab.svelte'

	// ---> JS components
	import CBuffer from '$lib/phab/js/modules/cbuffer.js';
	import { easing } from '$lib/phab/js/modules/easings.js';


	// ---> Variables
	const pHoldCount4 = new CBuffer(4); // buffer of last 4 presses in milliseconds
	const initialiseBreath = 6000; //ms

	let lastPhDuration;
	let loopingIncrementId;
	let markPressHold;
	let loopingDecrementId;

	const fps = 60;

	let start = 0;

	let sizeOnPress;
	let sizeOnRelease;
	let size = 0;

	// assign a value to elapsedTimeUp on first use
	let countUp = 0;
	let countDown = 0;

	let finish = onMount(() => { finish = window.innerWidth * .98; });

	// ----> Utilities start

	const measureDurationOfPressHold1of2 = () => {
		performance.clearMarks('01PhStart', '02PhEndIntStart'); //clear any previous markers
		performance.mark('01PhStart'); //mark the start of the PressHold
		// let firstMark = performance.getEntriesByName('01PhStart', 'mark');
		// console.log('first mark = ',firstMark);
	}

	const measureDurationOfPressHold2of2 = () => {
		performance.mark('02PhEndIntStart'); // mark the end of the PressHold & start of Interval
		performance.measure('pressing', '01PhStart', '02PhEndIntStart'); //calculate the PressHold duration
		markPressHold = performance.getEntriesByName('pressing', 'measure'); //returns an array value
		// console.log(markPressHold)
	}

	const conditionalPressHoldDuration = () => {
		if (markPressHold.length < 2) {
			lastPhDuration = initialiseBreath;
		} else {
			lastPhDuration = markPressHold.pop().duration;
		}
	}

	const changeSize = () => {
		const suffix = 'px';
		document.documentElement.style.setProperty(`--size`, size + suffix);
	}

	// ----> Utilites end

	// ----> Triggers and loops start

	const startPressHoldFinishRelease = () => {
		cancelAnimationFrame(loopingDecrementId);
		measureDurationOfPressHold1of2()
		loopingIncrement();
	}

	const startReleaseFinishPressHold = () => {
		cancelAnimationFrame(loopingIncrementId);
		measureDurationOfPressHold2of2()
		conditionalPressHoldDuration()
		// Push the last press hold duration to buffer
		pHoldCount4.push(lastPhDuration);
		loopingDecrement();
	};


	const loopingIncrement = () => {
		size += 1.15;
		console.log(size)

		// countUp += 1.75 / fps;
		// size = easing.easeInOutSine(countUp * 1000 / pHoldCount4.avg() || initialiseBreath, countUp * 1000, sizeOnPress || 0, finish, pHoldCount4.avg() || initialiseBreath);
		loopingIncrementId = requestAnimationFrame(loopingIncrement);
		//store size to pass to loopingDecrement
		// sizeOnRelease = size;
		// console.log( 'countUp', countUp, 'size on press', sizeOnPress, 'finish', finish, 'phC4 avg', pHoldCount4.avg(), 'initalB', initialiseBreath)
		changeSize();
	};


	const loopingDecrement = () => {
		size -= .9;
		// countDown += .9 / fps;
		loopingDecrementId = requestAnimationFrame(loopingDecrement);
		// size = sizeOnRelease - easing.easeOutSine(countDown * 1000 / lastPhDuration, countDown * 1000, start, sizeOnRelease, lastPhDuration);
		if (size <= 1) { cancelAnimationFrame(loopingDecrementId) }
		//store size to pass to loopingDecrement
		// sizeOnPress = size;
		// console.log(size)
		console.log('lastPH', lastPhDuration, 'countDown', countDown, 'countUp', countUp, 'start', start, 'sizeOnRelease', sizeOnRelease)
		changeSize();
	}

	// ----> Triggers and loops end

</script>


<div>
	<ExpandingCollapsingCircle />
	<PhabTextDisplay />
	<PressHoldButton on:buttonUp={startReleaseFinishPressHold} on:buttonDown={startPressHoldFinishRelease} />
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