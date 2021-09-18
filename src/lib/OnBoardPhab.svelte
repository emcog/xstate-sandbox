<script>
	import { phabOnboardingState } from './stores/storePhabOnboardingState.js';


	let onBoardingWrapperNode;
	let onBoarding01;
	let onBoarding02;

	let pointerIsDown = false;



	function onBoardingControlFlow() {
		if ($phabOnboardingState.skipped || $phabOnboardingState.passedAll) {
			console.log('return')
		} else {
			console.log('run control flow')
			$phabOnboardingState.PROGRESS
			console.log($phabOnboardingState.active)
		}




		// for (let i = 0; i < onBoardPhab.progress.length; i++) {
		// 	if (i.passed === true) {
		// 		'skip';
		// 	} else if (i.passed === false && counter <= i.requiredMinDuration) {
		// 		'i.instruction';
		// 		if (counter === i.requiredMinDuration) {
		// 			i.passed = true;
		// 		}
		// 	}
		// }
	}



</script>
<button on:click={onBoardingControlFlow}>test control flow</button>

{#if !$phabOnboardingState.skipped }<button on:click={ phabOnboardingState.SKIP } data-testid='skip-onboarding' >Hide text</button>{/if}

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
</style>