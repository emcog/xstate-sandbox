<script>
	import { storePhabOnboardingState as phabOnboardingState } from './stores/storephabOnboardingState.js';
	import { phabCounter } from './stores/storePhabCounter.js';
	// import { oddsEqualActivePress } from '$lib/stores/storePhabButtonState';
	import { oddsEqualActivePress } from './stores/storePhabButtonState.js';


	let onBoardingWrapperNode;
	let onBoarding01;
	let onBoarding02;

	let pointerIsDown = false;
	let activeStep = $phabOnboardingState.steps[0];

	$: if($oddsEqualActivePress > 0 && $phabCounter > 0 ) { onBoardingControlFlow() }

	// trigger onBoardingControlFlow when pointer is Down

	function onBoardingControlFlow() {
			// console.log('onboarding control flow')
			activeStep = $phabOnboardingState.steps.find(step => !step.passed);
			console.log(activeStep.instruction, activeStep.requiredCounterValue, $phabCounter);
			if(activeStep.requiredCounterValue <= $phabCounter) {
				console.log('CONGRATULATIONS YOU PASSED THIS STEP')
				activeStep.passed = true;
			}
	}



// take counter, compare it to active.requiredcount, if counter >= required count then sent active.passed = true

</script>
<!--<button on:click={onBoardingControlFlow}>test control flow</button>-->

{#if !$phabOnboardingState.skipped }<button on:click={ phabOnboardingState.SKIP } data-testid='skip-onboarding'>Hide text</button>{/if}

{#if !$phabOnboardingState.skipped }<p>{ activeStep.instruction }</p>{/if}

<style>
    button {
        grid-column: 2/3;
        grid-row: 5/6;
        justify-self: center;
        margin: 50px 0;
        max-width: 100px;
        /*text-decoration: underline;*/
        /*background: none;*/
        /*padding: 0;*/
        /*border: none;*/
        /*color: white;*/
				/*background: orange;*/
    }

    span {
        z-index: 10;
        grid-column: 2/3;
        grid-row: 4/5;
        justify-self: center;
        align-self: start;
        color: white;
        margin-bottom: 75px;
    }
</style>