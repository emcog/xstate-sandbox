<script>


	let onBoardingWrapperNode;
	let onBoarding01;
	let onBoarding02;


	let pointerIsDown = false;


	// please refer to flowchart diagram onBoardLogic.drawio contained in planning directory
	let onBoardPhab = {
		skipped: false,
		progress: {
			passedAll: false,

			pressAndHoldTheButton: {
				requiredMinDuration: 50,
				passed: false,
				get interrupted() {
					onBoardPhab.progress.pressAndHoldTheButton.instruction;
				},
				node: undefined,
				instruction: onBoardPhab01

			},
			keepingGoing: {
				requiredMinDuration: 100,
				passed: false,
				get interrupted() {
					onBoardPhab.progressInterrupted.tryPressingLonger.instruction;
				},
				node: undefined,
				instruction: onBoardPhab02
			},
			thatIsGreat: {
				requiredMinDuration: 200,
				passed: false,
				get interrupted() {
					tryPressingLonger.instruction;
				},
				node: undefined,
				instruction: onBoardPhab03
			},
			nowReleaseAndWait: {
				requiredMinDuration: 400,
				passed: false,
				get interrupted() {
					dontPressJustYet.instruction;
				},
				node: undefined,
				instruction: onBoardPhab04
			},
			waitALittleLonger: {
				requiredDuration: 200,
				passed: false,
				get interrupted() {
					tryPressingLonger.instruction;
				},
				node: undefined,
				instruction: onBoardPhab05
			},
			now: {
				requiredDuration: 40,
				passed: false,
				node: undefined,
				instruction: onBoardPhab06
			},
			pressHoldAndBreathe: {
				requiredDuration: 10,
				passed: false,
				get interrupted() {
					tryPressingLonger.instruction;
				},
				node: undefined,
				instruction: onBoardPhab07
			}
		},
		progressInterrupted: {
			tryPressingLonger: {
				passed: false,
				get progress() {
					keepingGoing.instruction;
				},
				node: undefined,
				instruction: tpl
			},
			dontPressJustYet: {
				requiredDuration: 700,
				passed: false,
				get progress() {
					waitALittleLonger.instruction;
				},
				get interrupted() {
					releaseTheButton.instruction;
				},
				node: undefined,
				instruction: dpjy
			},
			releaseTheButton: {
				requiredDuration: 700,
				passed: false,
				get progress() {
					waitALittleLonger.instruction;
				},
				get interrupted() {
					letsStartAgain;
				},
				node: undefined,
				instruction: rtb
			},
			letsStartAgain: {
				requiredDuration: 700,
				passed: false,
				get progress() {
					pressAndHoldTheButton.instruction;
				},
				node: undefined,
				instruction: lsa
			}
		}
	};

	//destructure onBoardPhab
	const {
		pressAndHoldTheButton,
		keepingGoing,
		thatIsGreat,
		nowReleaseAndWait,
		waitALittleLonger,
		now,
		pressHoldAndBreathe
	} = onBoardPhab.progress;

	const {
		tryPressingLonger,
		dontPressJustYet,
		releaseTheButton,
		letsStartAgain
	} = onBoardPhab.progressInterrupted;


	function skipOnBoarding() {
		onBoardPhab.skipped = true;
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
<button class="">Hide text</button>
<style></style>