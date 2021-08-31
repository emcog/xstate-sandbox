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
		console.log($onBoardPhab.skipped.set);
		$onBoardPhab.progress.pressAndHoldTheButton.requiredMinDuration.set(60);
		console.log('onboardPhab', $onBoardPhab.progress.pressAndHoldTheButton.requiredMinDuration);
		console.log('pressAndHoldTheButton', pressAndHoldTheButton);
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
<span data-testid="test-test">This is a test test</span>
<button on:click={skipOnBoarding} data-testid='skip-button' class="">Hide text</button>
<style>
    button {
        grid-column: 2/3;
        grid-row: 5/6;
        justify-self: center;
        margin: 50px 0;
        max-width: 100px;
        text-decoration: underline;
        background: none;
        padding: 0;
        border: none;
        color: white;
    }
</style>