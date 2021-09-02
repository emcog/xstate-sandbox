<script>

	import { onBoardPhab } from './stores/onboardPhab';

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
	} = $onBoardPhab.progress;

	const {
		tryPressingLonger,
		dontPressJustYet,
		releaseTheButton,
		letsStartAgain
	} = $onBoardPhab.progressInterrupted;


	function skipOnBoarding() {
		// onBoardPhab.update.skipped = true;
		$onBoardPhab.skipped = true;

		// $onBoardPhab.progress.pressAndHoldTheButton.requiredMinDuration.set(60);
		console.log('skipped', $onBoardPhab)
		// console.log('onboardPhab', $onBoardPhab.progress.pressAndHoldTheButton.requiredMinDuration);
		// console.log('pressAndHoldTheButton', pressAndHoldTheButton);
	//	TODO dispatch event, button clicked – ensure text hides
	}


function onBoardingControlFlow() {
	for (let i = 0; i < onBoardPhab.progress.length; i++) {
		if (i.passed === true) {
			'skip'
		} else if (i.passed === false && counter <= i.requiredMinDuration) {
			'i.instruction'
			if (counter === i.requiredMinDuration) {
				i.passed = true
			}
		}
	}
}


</script>
<button on:click={skipOnBoarding} data-testid='skip-onboarding' >Hide text</button>
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