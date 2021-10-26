import { createMachine, interpret, assign } from 'xstate';


const enterRelease = (context) => {
	context.releaseCount += 1;
	console.log(context);
}

const enterPress = (context) => {
	context.pressCount += 1;
	console.log(context)
}

const incRunningCount = (context) => {
	context.runningCounter += 1;
	console.log(context.runningCounter)
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
					// src: (context, event) => (sendBack, onReceive) => {

					// This will send the 'INC' event to the parent every second
					// setTimeout(() => sendBack('LOOP'), 5);
					// setTimeout(()=> console.log('banana service'), 1000);

					// Perform cleanup
					// return () => clearInterval(id);
				// }
					src: () => (sendBack, receive) => {
						let i;
						function onAnimationFrame() {
						    // sendBack('LOOP');
							console.log('animation frame')
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
						actions: ['incRunningCount']
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
