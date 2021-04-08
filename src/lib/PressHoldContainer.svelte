<script>
	// ---> Svelte core
	import { onMount } from 'svelte';
// ---> Svelte component
	import PressHoldButton from './PressHoldButton.svelte'
	import PhabTextDisplay from '$lib/PhabTextDisplay.svelte'
	import ExpandingCollapsingCircle from '$lib/ExpandingCollapsingCircle.svelte'

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
		// --- > Comment in to print out
		let firstMark = performance.getEntriesByName('01PhStart', 'mark');
		console.log('first mark = ',firstMark);
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
		let driver = size;
		const suffix = 'px';
		document.documentElement.style.setProperty(`--size`, driver + suffix);
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
		countUp += 1.75 / fps;
		size = easing.easeInOutSine(countUp * 1000 / pHoldCount4.avg() || initialiseBreath, countUp * 1000, sizeOnPress || 0, finish, pHoldCount4.avg() || initialiseBreath);
		loopingIncrementId = requestAnimationFrame(loopingIncrement);
		//store size to pass to loopingDecrement
		sizeOnRelease = size;
		console.log( countUp, sizeOnPress, finish, pHoldCount4.avg(), initialiseBreath)
		changeSize();
	};


	const loopingDecrement = () => {
		countDown += .9 / fps;
		loopingDecrementId = requestAnimationFrame(loopingDecrement);
		size = sizeOnRelease - easing.easeOutSine(countDown * 1000 / lastPhDuration, countDown * 1000, start, sizeOnRelease, lastPhDuration);
		if (size <= 1) { cancelAnimationFrame(loopingDecrementId) }
		//store size to pass to loopingDecrement
		sizeOnPress = size;
		// console.log(size)
		console.log('lastPH', lastPhDuration, 'countDown', countDown, 'start', start, 'sizeOnRelease', sizeOnRelease)
		changeSize();
	}

	// ----> Triggers and loops end

</script>


<div>
	<PressHoldButton on:buttonUp={startReleaseFinishPressHold} on:buttonDown={startPressHoldFinishRelease} />
	<ExpandingCollapsingCircle />
	<PhabTextDisplay />
	<button class="">Hide text</button>

</div>


	<style>
	</style>