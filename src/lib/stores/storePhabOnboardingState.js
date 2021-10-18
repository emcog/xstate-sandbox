import { writable } from 'svelte/store';

export const storePhabOnboardingState = writable({
	skipped: false,
	passedAll: false,
	steps: [
		{
			instruction: 'Press and hold the button',
			requiredCounterValue: 50,
			THISBOUND: function() {
				// console.log('this')
				return 'this is a string'
			},
			passed: false,
			get interrupted() {
				storePhabOnboardingState.steps[0].instruction;
			},
			node: undefined
		},
		{
			instruction: "Keep going",
			requiredCounterValue: 100,
			passed: false,
			get interrupted() {
				phabOnboardingState.progressInterrupted.tryPressingLonger.instruction;
			},
			node: undefined
		},
		{
			instruction: "That is great",
			requiredCounterValue: 200,
			passed: false,
			get interrupted() {
				tryPressingLonger.instruction;
			},
			node: undefined
		},
		{
			instruction: "Now release and wait",
			requiredCounterValue: 400,
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