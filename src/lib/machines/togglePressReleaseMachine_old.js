import { createMachine, interpret, assign, sendParent } from 'xstate';

// const loopingCounter = (context) => {
	//doesnt work
	// let i;
	// i = requestAnimationFrame(loopingCounter);
	context.runningCounter + 1;
// }

const enterRelease = assign({
	releaseCount: ( context, event) => context.releaseCount + 1;
});


/*
const enterRelease = (context) => {
	context.releaseCount += 1;
	console.log(context);
	// loopingCounter()
}*/

const enterPress = (context) => {
	context.pressCount += 1;
	console.log(context);


}

const incRunningCount = (context) => {
	// context.runningCounter += 1;
	// console.log('incrementRunningCount');
	// console.log("context is", context);
}

const togglePressReleaseMachine_old = createMachine(
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
						let animationLoop;
						let incrementCount = 0;
						function onAnimationFrame() {
							// context.runningCounter += 1;
							// sendParent('LOOP');
							// incRunningCount();
							console.log('press animation loop is running' )
							animationLoop = requestAnimationFrame(onAnimationFrame);
							incrementCount += 1;
							console.log('incrementCount', incrementCount);
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

export const togglePressReleaseService = interpret(togglePressReleaseMachine_old)
	.onTransition((state) => console.log("state value", state.value))
	.start();
