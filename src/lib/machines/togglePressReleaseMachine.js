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
					id: 'incInterval',
					src: () => ( sendParent, receive) => {
						let i;
						function onAnimationFrame() {
							sendParent('LOOP');
							console.log('running counter')
							i = requestAnimationFrame(onAnimationFrame);
						}

						onAnimationFrame();
						    // return () => {
						    // cancelAnimationFrame(i);
						    }
						  },
				on: {
					TOGGLE: { target: 'release' },
					LOOP: {
						//todo figure out how to trigger action on callback, maybe have to use send
						// actions: [incRunningCount]
					}
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
