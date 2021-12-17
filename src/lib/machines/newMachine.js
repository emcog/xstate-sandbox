import { createMachine } from 'xstate';

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

// const incrementMachine = createMachine({
//   id: 'increment',
//   initial: 'active',
//   states: {
//     active: {

//       }
//     }
//   }
// })


/*
			// invoke: {
				// 	id: 'incInterval',

        //   // put the counting logic here
				// 	src: () => ( sendParent, receive) => {
				// 		let i;
				// 		function onAnimationFrame() {
				// 			sendParent('LOOP');
				// 			console.log('running counter')
				// 			i = requestAnimationFrame(onAnimationFrame);
				// 		}

						// onAnimationFrame();
						    // return () => {
						    // cancelAnimationFrame(i);
						    // }
						  // },

*/


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