import { createMachine, interpret, assign } from 'xstate';

// const incrementPressCount = (context) => context.pressCount + 0;
const enterRelease = (context) => {
	context.releaseCount += 1;
	console.log(context);
}

const enterPress = (context) => {
	context.pressCount += 1;
	console.log(context)
}

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
				on: {
					TOGGLE: { target: 'release' }
				}
			},
			release: {
				entry: enterRelease,
				on: {
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
		}
	});
	export const togglePressReleaseService = interpret(togglePressReleaseMachine).start();
