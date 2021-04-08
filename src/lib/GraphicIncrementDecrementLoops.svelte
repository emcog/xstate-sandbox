<script>
	// ---> Svelte components
	import PressHoldButton from '$lib/PressHoldButton.svelte'
	import PhabTextDisplay from '$lib/PhabTextDisplay.svelte'

	// ---> JS components
	import { onMount } from 'svelte';
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
	let finish;
	let sizeOnPress;
	let sizeOnRelease;
	let size;

	// initialise elapsedTimeUp with a value so counter works on first use
	let elapsedTimeUp = 0;
	let elapsedTimeDown;


	// ---> Functions
	// onMount(() => {finish = window.innerWidth*.9;})
	onMount(() => {
		finish = window.innerWidth * .98;
	});


const handlePressHoldStart = (e) => {
	e.preventDefault();
	pointerIsDown = true;
	// Reset the timer for countDownUsingTime()
	elapsedTimeDown = 0;
	// Cancel the ease down function
	cancelAnimationFrame(loopingDecrementId);
	// Measure duration of PressHold & Interval
	performance.clearMarks('01PhStart', '02PhEndIntStart'); //clear any previous markers
	performance.mark('01PhStart'); //mark the start of the PressHold
	let firstMark = performance.getEntriesByName('01PhStart', 'mark');
	// console.log('first mark = ',firstMark);
	// Run the looping function
	loopingIncrement();
};


//TODO initialise measurePH on load of document, i.e outside of a function & inside global scope
const handlePressHoldRelease = () => {
	pointerIsDown = false;
	// Reset the count up timer
	elapsedTimeUp = 0;
	// Stop looping function;
	cancelAnimationFrame(loopingIncrementId);
	performance.mark('02PhEndIntStart'); // mark the end of the PressHold & start of Interval
	performance.measure('pressing', '01PhStart', '02PhEndIntStart'); //calculate the PressHold duration
	markPressHold = performance.getEntriesByName('pressing', 'measure'); //returns an array value
	// Define press hold by previous press hold duration, if there is no previous, then define by the initialisation value
	// if (markPressHold.length < 2) { lastPhDuration = initialiseBreath; } else { lastPhDuration = markPressHold.pop().duration; }
	if (markPressHold.length < 100) {
	lastPhDuration = initialiseBreath;
} else {
	lastPhDuration = markPressHold.pop().duration;
}
	// Push the last press hold duration to buffer
	pHoldCount4.push(lastPhDuration);
	// Run notHolding loop
	loopingDecrement();
};


const loopingIncrement = () => {
	//breathe in – extend the out-breath by making the count up relatively faster on the in-breath
	// elpasedTimeUp += 1 / fps (60) is a rough counter for a second
	elapsedTimeUp += 1.75 / fps; //pass to pHoldCount4
	//triggered on release: stop this loop
	loopingIncrementId = requestAnimationFrame(loopingIncrement);
	// elapsedTimeUp * 1000, returns a value which equates to miliseconds, if not true miliseconds
	size = easing.easeInOutSine(elapsedTimeUp * 1000 / pHoldCount4.avg() || initialiseBreath, elapsedTimeUp * 1000, sizeOnPress || 0, finish, pHoldCount4.avg() || initialiseBreath);
	//store size to pass to loopingDecrement
	sizeOnRelease = size;
	//if the size value is greater than available screen space, stop the animation but keep the counter running
	if (size >= finish) {
	size = finish;
}
	// represent the changes in the GUI
	changeSize();
	// onBoardingControlFlow();
};


const loopingDecrement = () => {
	elapsedTimeDown += .9 / fps;
	//enable this function to be canceled on release
	loopingDecrementId = requestAnimationFrame(loopingDecrement);
	//below works because it is a positive difference ie. start to sizeOnRelease, therefore subtract the existing positive from the incrementally increasing positive to shrink the size
	size = sizeOnRelease - easing.easeOutSine(elapsedTimeDown * 1000 / lastPhDuration, elapsedTimeDown * 1000, start, sizeOnRelease, lastPhDuration);
	//create a value to pass easeUpUsingTime()
	sizeOnPress = size;
	//  stop this loop if size gets to 1
	if (size <= 1) {
	cancelAnimationFrame(loopingDecrementId);
}
	// represent the changes in the GUI
	changeSize();
	onBoardingControlFlow();
};


function changeSize() {
	let driver = size;
	const suffix = 'px';
	document.documentElement.style.setProperty(`--size`, driver + suffix);
}


// handle


</script>



<div class="gradient-bg fill-the-view">

	<div class="feedback-onboarding-wrapper">
		<!--		<img src={wordmark} alt="phab" class="logo"/>-->
		<div data-sizing="px" id="feedback-circle"></div>

		<div id='signifier__circle-outline' class='on-boarding-wrapper'></div>

		<PressHoldButton on:buttonStatus={handleButtonStatus} />

		<PhabTextDisplay />


		<button id="press-hold-button"
						on:mousedown={handlePressHoldStart}
						on:touchstart={handlePressHoldStart}
						on:mouseup={handlePressHoldRelease}
						on:touchend={handlePressHoldRelease}>
		</button>

		<button class="">Hide text</button>


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


    /*.onboarding-wrapper {*/
    /*    grid-column: 2/3;*/
    /*    grid-row: 2/3;*/
    /*}*/


    #press-hold-button {
        grid-column: 2/3;
        grid-row: 4/5;
        justify-self: center;
        align-self: end;

        border-radius: 100%;
        border: solid 4px rgba(255, 255, 255, 1);

        width: 53px;
        height: 53px;
        background-color: rgba(0, 0, 0, 0.1);

        box-shadow: 0 0 3px 2px rgba(88, 102, 114, 0.5);

        -webkit-animation-name: fade-in-out;
        animation-name: fade-in-out;
        -webkit-animation-duration: 5s;
        animation-duration: 5s;
        -webkit-animation-timing-function: cubic-bezier(.65, .05, .36, 1);
        animation-timing-function: cubic-bezier(.65, .05, .36, 1);
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        -webkit-animation-direction: alternate;
        animation-direction: alternate;
    }


    #press-hold-button:hover { cursor: pointer; }


    @-webkit-keyframes fade-in-out {
        0%, to { border-color: rgba(255, 255, 255, 1);
        }
        50% {
            /*background-color: #fff;*/
            border-color: rgba(255, 255, 255, 0.5);
        }
    }

    @keyframes fade-in-out {
        0%, to {
            border-color: rgba(255, 255, 255, 1);
        }
        50% {
            border-color: rgba(255, 255, 255, 0);
        }
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


    /*    onboarding*/

    .on-boarding-wrapper {
        grid-column: 2/3;
        grid-row: 2/3;
    }

    .above-button {
        grid-column: 2/3;
    }

    .hidden { display: none; }

    .fade-in-out{
        /*    animation effect*/
    }

    .z10 {
        z-index: 10;
    }

</style>