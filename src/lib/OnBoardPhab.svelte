<script>
	import { phabOnboardingState } from './stores/storephabOnboardingState.js';


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
			console.log($phabOnboardingState.phabCount)
		}
	}

	function increment() {
		phabOnboardingState.INCREMENTCOUNTER();
		console.log(phabOnboardingState.INCREMENTCOUNTER);
	}



</script>
<button on:click={onBoardingControlFlow}>test control flow</button>

{#if !$phabOnboardingState.skipped }<button on:click={ phabOnboardingState.SKIP } data-testid='skip-onboarding'>Hide text</button>{/if}

<button class='mt-20' on:click={ increment }>INCREMENT</button>

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
		.mt-20 {
				margin-top: 50px;
		}
</style>