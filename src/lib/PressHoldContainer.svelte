<script>
	// ---> Svelte core
	import { onMount } from 'svelte';
// ---> Svelte component
	import PressHoldButton from './PressHoldButton.svelte'
	import PhabTextDisplay from '$lib/PhabTextDisplay.svelte'

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

	// initialise elapsedTimeUp with a value so counter works on first use
	let elapsedTimeUp = 0;
	let elapsedTimeDown;



	let finish = onMount(() => { finish = window.innerWidth * .98; });



	const startPressHoldFinishRelease = () => {
		cancelAnimationFrame(loopingDecrementId);
		measureDurationOfPressHold1of2()
		loopingIncrement();
	}

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
		console.log(markPressHold)
	}

	const startReleaseFinishPressHold = () => {
		cancelAnimationFrame(loopingIncrementId);
		measureDurationOfPressHold2of2()
		loopingDecrement();
	};


	const loopingIncrement = () => {
		size += 1;

		loopingIncrementId = requestAnimationFrame(loopingIncrement);
	};


	const loopingDecrement = () => {
		size -= 1;
		loopingDecrementId = requestAnimationFrame(loopingDecrement);
		if (size <= 1) { cancelAnimationFrame(loopingDecrementId) }
	};

</script>


<div>
<PressHoldButton on:buttonUp={startReleaseFinishPressHold} on:buttonDown={startPressHoldFinishRelease} />

<div class="gradient-bg fill-the-view">

	<div class="feedback-onboarding-wrapper">
		<!--		<img src={wordmark} alt="phab" class="logo"/>-->
		<div data-sizing="px" id="feedback-circle"></div>

		<div id='signifier__circle-outline' class='on-boarding-wrapper'></div>


		<PhabTextDisplay />


<!--		<button id="press-hold-button"-->
<!--						on:mousedown={handlePressHoldStart}-->
<!--						on:touchstart={handlePressHoldStart}-->
<!--						on:mouseup={handlePressHoldRelease}-->
<!--						on:touchend={handlePressHoldRelease}>-->
<!--		</button>-->

		<button class="">Hide text</button>

	</div>
</div>
</div>


	<style>
      .feedback-onboarding-wrapper {
          display: grid;
          grid-template-columns: 1fr 375px 1fr;
          grid-template-rows: 2.625fr 375px repeat(3, 1fr);
          width: 100%;
          height: 100%;
      }


      #feedback-circle {
          justify-self: center;
          align-self: center;
          grid-column: 1/-1;
          grid-row: 1/-1;
          z-index: 1;
          border-radius: 9999px;
          width: var(--size);
          height: var(--size);
          box-shadow: 0 0 10px 10px rgba(255, 255, 255, .6);
          background-color: rgba(255, 255, 255, 0.9);

      }


      .gradient-bg{ background-image: linear-gradient(to bottom, #7de3a9, #5fc189 21%, #1b442d 95%); }

      #signifier__circle-outline {
          border-radius: 999%;

          width: 302px;
          height: 302px;
          margin: 0 auto;
          -webkit-filter: blur(2px);
          filter: blur(2px);
          /*box-shadow: 0 0 31px 0 rgba(100, 100, 100, 0.5);*/
          box-shadow: inset 0 0 31px 0 rgba(255, 255, 255, 0.125), 0 0 31px 0 rgba(255, 255, 255, 0.125) ;
          border: solid 3px rgba(0, 0, 0, 0.25);

      }

      .fill-the-view {
          width: 100vw;
          height: 100vh;
      }

	</style>