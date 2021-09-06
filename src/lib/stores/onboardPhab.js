import { writable } from 'svelte/store';

export const onBoardPhab = writable({
	skipped: false,
	passedAll: false,
	progress: {
		//todo remove passed all and refactor to become obj/key/array of objects
		// passedAll: false,
		pressAndHoldTheButton: {
			requiredMinDuration: 50,
			passed: false,
			get interrupted() {
				onBoardPhab.progress.pressAndHoldTheButton.instruction;
			},
			node: undefined,
			instruction: 'Press and hold the button'

		},
		keepingGoing: {
			requiredMinDuration: 100,
			passed: false,
			get interrupted() {
				onBoardPhab.progressInterrupted.tryPressingLonger.instruction;
			},
			node: undefined,
			instruction: "Keep going"
		},
		thatIsGreat: {
			requiredMinDuration: 200,
			passed: false,
			get interrupted() {
				tryPressingLonger.instruction;
			},
			node: undefined,
			instruction: "That is great"
		},
		nowReleaseAndWait: {
			requiredMinDuration: 400,
			passed: false,
			get interrupted() {
				dontPressJustYet.instruction;
			},
			node: undefined,
			instruction: "Now release and wait"
		},
		waitALittleLonger: {
			requiredDuration: 200,
			passed: false,
			get interrupted() {
				tryPressingLonger.instruction;
			},
			node: undefined,
			instruction: "Wait a little longer"
		},
		now: {
			requiredDuration: 40,
			passed: false,
			node: undefined,
			instruction: "Now"
		},
		pressHoldAndBreathe: {
			requiredDuration: 10,
			passed: false,
			get interrupted() {
				tryPressingLonger.instruction;
			},
			node: undefined,
			instruction: "Press hold and breathe"
		}
	},
	progressInterrupted: {
		tryPressingLonger: {
			passed: false,
			get progress() {
				keepingGoing.instruction;
			},
			node: undefined,
			instruction: "Try pressing lgutonger"
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
			instruction: 'dpjy'
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
			instruction: 'rtb'
		},
		letsStartAgain: {
			requiredDuration: 700,
			passed: false,
			get progress() {
				pressAndHoldTheButton.instruction;
			},
			node: undefined,
			instruction: 'lsa'
		}
	}
});

export function controlFlow() {
	console.log('OnBoardPhab PRog', onBoardPhab.progress)
}