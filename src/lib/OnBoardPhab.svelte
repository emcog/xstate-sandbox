<script>
	import { phabOnboardingStateStore } from './stores/onboardPhab';


	let onBoardingWrapperNode;
	let onBoarding01;
	let onBoarding02;

	let pointerIsDown = false;

	const {
		pressAndHoldTheButton,
		keepingGoing,
		thatIsGreat,
		nowReleaseAndWait,
		waitALittleLonger,
		now,
		pressHoldAndBreathe
	} = $phabOnboardingStateStore.progress;

	const {
		tryPressingLonger,
		dontPressJustYet,
		releaseTheButton,
		letsStartAgain
	} = $phabOnboardingStateStore.progressInterrupted;


	function skipOnBoarding() {
		// onBoardPhab.update.skipped = true;
		$phabOnboardingStateStore.skipped = true;

		// $onBoardPhab.progress.pressAndHoldTheButton.requiredMinDuration.set(60);
		console.log('skipped', $phabOnboardingStateStore);
		// console.log('onboardPhab', $onBoardPhab.progress.pressAndHoldTheButton.requiredMinDuration);
		// console.log('pressAndHoldTheButton', pressAndHoldTheButton);
	}

</script>

<script context='module'>


	export function onBoardingControlFlow() {
		console.log('Delete me')

		// console.log('onBoardPhab', $onBoardPhab.progress.length)
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


{#if !$phabOnboardingStateStore.skipped }<button on:click={skipOnBoarding} data-testid='skip-onboarding' >Hide text</button>{/if}

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