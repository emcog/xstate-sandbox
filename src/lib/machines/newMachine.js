//https://stately.ai/viz/b70612c4-4fd7-4e0e-b755-79d1ad1c816d
// todo:

import { createMachine, interpret, assign, sendParent } from 'xstate';

const enterRelease = (context) => {
	context.releaseCount += 1;
	console.log(context);
}

const enterPress = (context) => {
	context.pressCount += 1;
	console.log(context);
}

const incRunningCount = (context) => {
	context.runningCounter += 1;
}

const incrementMachine = createMachine({
	// needs to send INCREMENT LOOP to parent
	//  need to keep calling itself
	id: 'increment',
	initial: 'active',
	states: {
		active: {
			actions: sendParent('INCREMENT_LOOP')

		}
	}
});


const incrementMachine = createMachine({
	// needs to send INCREMENT LOOP to parent
	//  need to keep calling itself
	id: 'increment',
	initial: 'active',
	states: {
		active: {
			entry: 'incrementLoop'
			// actions: sendParent('INCREMENT_LOOP')

		},
		actions: {
			incrementLoop: () => (sendParent) => {
				let i;

				function onAnimationFrame() {
					sendParent('ANIMATION_FRAME');
					i = requestAnimationFrame(onAnimationFrame);
				}

				onAnimationFrame();
				return () => {
					cancelAnimationFrame(i);
				}
			}
		}
	}
});




const togglePressReleaseMachine = createMachine(
	{
		id: 'pressHoldRelease',
		context: {
			runningCounter: 0,
			pressCount: 0,
			releaseCount: 0,
			timer: false
		},
		initial: 'inactive',
		states: {
			inactive: {
				on: {
					TOGGLE: { target: 'press' }
				}
			},
			press: {
				entry: enterPress,
				invoke: {
					id: 'increment',
					src: incrementMachine
				},
				on: {
					INCREMENT_LOOP: {
						actions: assign({
							runningCounter: (context, event) => context.runningCounter + 1
						})
					},
					TOGGLE: { target: 'release' }
				}
			},
			release: {
				entry: enterRelease,
				on: {
					DECREMENT_LOOP: {
						actions: assign({
							runningCounter: (context, event) => context.runningCounter - 1
						})
					},
					TOGGLE: { target: 'press'	},
					MINCOUNT: { target: 'idle'}
				}
			},
			idle: {
				on: {
					TOGGLE: 'press'
				},
				after: {
					2000: {target: 'inactive'}
				}
			}
		}});

export const togglePressReleaseService = interpret(togglePressReleaseMachine).start();