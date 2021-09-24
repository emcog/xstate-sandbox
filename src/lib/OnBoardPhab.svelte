<script>
	import { storePhabOnboardingState as phabOnboardingState } from './stores/storephabOnboardingState.js';
	import { phabCounter } from './stores/storePhabCounter.js';
	import { oddsEqualActivePress } from '$lib/stores/storePhabButtonState';
	import { fade } from 'svelte/transition';



	let onBoardingWrapperNode;
	let onBoarding01;
	let onBoarding02;

	let pointerIsDown = false;
	let activeStep = $phabOnboardingState.steps[0];

	$: if($oddsEqualActivePress > 0 && $phabCounter > 0 ) { onBoardingControlFlow() }


	function onBoardingControlFlow() {
			activeStep = $phabOnboardingState.steps.find(step => !step.passed);
			console.log(activeStep.instruction, activeStep.requiredCounterValue, $phabCounter);
			if(activeStep.requiredCounterValue <= $phabCounter) {
				activeStep.passed = true;
			}
	}





</script>
{#if !$phabOnboardingState.skipped } <span>{ activeStep.instruction }</span>{/if}
<!--todo test out changing onboarding store back to custom Or -->
{#if !$phabOnboardingState.skipped }<button on:click={ phabOnboardingState.skipped.set(true) } data-testid='skip-onboarding'>Hide text</button>{/if}

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