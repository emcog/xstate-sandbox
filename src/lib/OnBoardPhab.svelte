<script>

	import { onBoardPhab } from './stores/onboardPhab';

	let onBoardingWrapperNode;
	let onBoarding01;
	let onBoarding02;


	let pointerIsDown = false;



	// destructure onBoardPhab
	// const {
	// 	pressAndHoldTheButton,
	// 	keepingGoing,
	// 	thatIsGreat,
	// 	nowReleaseAndWait,
	// 	waitALittleLonger,
	// 	now,
	// 	pressHoldAndBreathe
	// } = onBoardPhab.progress;
	//
	// const {
	// 	tryPressingLonger,
	// 	dontPressJustYet,
	// 	releaseTheButton,
	// 	letsStartAgain
	// } = onBoardPhab.progressInterrupted;

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
		onBoardPhab.update.skipped = true;
		console.log ($onBoardPhab.skipped = true);
		console.log('pressAndHoldTheButtion', pressAndHoldTheButton)
	}


	function onBoardingControlFlow() {

		// check skipped or peviously completed
		if (!onBoardPhab.progress.passedAll) {

			// check pressAndHoldTheButton
			if (!pressAndHoldTheButton.passed) {
				console.log('onBoardingControlFlow', pressAndHoldTheButton.passed);
				console.log('onBoardingControlFlow', size);
				if (pressAndHoldTheButton.requiredMinDuration <= size && pointerIsDown) {
					pressAndHoldTheButton.passed = true;
					pressAndHoldTheButton.node.classList.add('hidden');
					keepingGoing.node.classList.remove('hidden');
				} else {
					pressAndHoldTheButton.interrupted;
				}

				// check keepingGoing
			} else if (!keepingGoing.passed) {
				if (keepingGoing.requiredMinDuration <= size && pointerIsDown) {
					keepingGoing.passed = true;
					keepingGoing.node.classList.add('hidden');
					thatIsGreat.node.classList.remove('hidden');
				} else {
					keepingGoing.interrupted;
				}

				//check thatIsGreat
			} else if (!thatIsGreat.passed) {
				if (thatIsGreat.requiredMinDuration <= size && pointerIsDown) {
					thatIsGreat.passed = true;
					thatIsGreat.node.classList.add('hidden');
					nowReleaseAndWait.node.classList.remove('hidden');
				} else {
					thatIsGreat.interrupted;
				}

				// chek nowReleaseAndWait
			} else if (!nowReleaseAndWait.passed) {
				if (nowReleaseAndWait.requiredMinDuration <= size && pointerIsDown) {
					nowReleaseAndWait.passed = true;
					nowReleaseAndWait.node.classList.add('hidden');
					waitALittleLonger.node.classList.remove('hidden');
				} else {
					nowReleaseAndWait.interrupted;
				}

				// check waitALittleLonger
			} else if (!waitALittleLonger.passed) {
				if (waitALittleLonger.requiredMinDuration >= size && pointerIsDown) {
					waitALittleLonger.passed = true;
					waitALittleLonger.node.classList.add('hidden');
					now.node.classList.remove('hidden');
				} else {
					waitALittleLonger.interrupted;
				}

				// check now
			} else if (!now.passed) {
				if (now.requiredMinDuration >= size && pointerIsDown) {
					now.passed = true;
					now.node.classList.add('hidden');
					pressHoldAndBreathe.node.classList.remove('hidden');
				} else {
					now.interrupted;
				}

				// pressHoldAndBreathe
			} else if (!now.passed) {
				if (pressHoldAndBreathe.requiredMinDuration >= size && pointerIsDown) {
					pressHoldAndBreathe.passed = true;
					pressHoldAndBreathe.node.classList.add('hidden');
				} else {
					pressHoldAndBreathe.interrupted;
				}
			} else {
				onBoardPhab.progress.passedAll = true;
			}
		}
	}
</script>
<button on:click={skipOnBoarding} class="">Hide text</button>
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