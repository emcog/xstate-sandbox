import { writable } from 'svelte/store';

export const storePhabOnboardingState = writable({
	skipped: false,
	passedAll: false,
	steps: [
		{
			instruction: 'Press and hold the button',
			requiredCounterValue: 50,
			passed: false,
			get interrupted() {
				phabOnboardingState.progress.pressAndHoldTheButton.instruction;
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


// export const activeStep =
// 	derived([ storePhabOnboardingState, phabCounter], ([$storePhabOnboardingState, $phabCounter]) =>
// 		$steps[$counter]);


// activeStep = storePhabOnboardingState.steps.find(step => step.passed === false)
// activeStep = storePhabOnboardingState.steps.find(step => !step.passed)


/* derive active step from the counter 
activeStep is defined by: find the step which is not passed
when activeStep.requiredCounterValue === counter value, set activeStep.passed = true
 */