import { writable } from 'svelte/store';

export const phabOnboardingStateMachine = writable({
	skipped: false,
	passedAll: false,
	progress: [
			{
				instruction: 'Press and hold the button',
				requiredMinDuration: 50,
				passed: false,
				get interrupted() {
					phabOnboardingStateMachine.progress.pressAndHoldTheButton.instruction;
				},
				node: undefined
			},
			{
				instruction: "Keep going",
				requiredMinDuration: 100,
				passed: false,
				get interrupted() {
					phabOnboardingStateMachine.progressInterrupted.tryPressingLonger.instruction;
				},
				node: undefined
			},
			{
				instruction: "That is great",
				requiredMinDuration: 200,
				passed: false,
				get interrupted() {
					tryPressingLonger.instruction;
				},
				node: undefined
		},
		{
			instruction: "Now release and wait",
			requiredMinDuration: 400,
			passed: false,
			get interrupted() {
				dontPressJustYet.instruction;
			},
			node: undefined
		},
		{
			instruction: "Wait a little longer",
			requiredDuration: 200,
			passed: false,
			get interrupted() {
				tryPressingLonger.instruction;
			},
			node: undefined
		},
		{
			instruction: "Now",
			requiredDuration: 40,
			passed: false,
			node: undefined
		},
		{
			instruction: "Press hold and breathe",
			requiredDuration: 10,
			passed: false,
			get interrupted() {
				tryPressingLonger.instruction;
			},
			node: undefined
		}
		],
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
