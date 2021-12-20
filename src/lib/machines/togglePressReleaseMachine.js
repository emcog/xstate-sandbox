import { createMachine, interpret, assign, sendParent, send } from 'xstate';

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

const notifyActive = (sendParent) => {
	console.log('active this is active too');
	// sendParent('INCREMENT_LOOP');
}

const incrementMachine = createMachine({
	id: 'increment',
	context: {
		incrementCounter: 0
	},
	initial: 'active',
	states: {
		active: {
			entry: [
				() => ( console.log('active')),
				notifyActive, sendParent("INCREMENT_LOOP"),
				() => {
					let i;
					function onAnimationFrame() {
						sendParent("INCREMENT_LOOP");
						// send({type: 'INCREMENT_LOOP'}, {to: 'pressHoldRelease'});
						console.log('animation frame is running')
						i = requestAnimationFrame(onAnimationFrame);
					}

					onAnimationFrame();
					return () => {
						cancelAnimationFrame(i);
					}
			}
			]
		},
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
						actions:
							assign({
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

export const togglePressReleaseService = interpret(togglePressReleaseMachine)
	.onTransition((state) => console.log("state value", state.value))
	.start();