import { createMachine, interpret, assign } from 'xstate';

const incrementPressCount = (context) => context.pressCount + 1;
const incrementReleaseCount = (context) => context.releaseCount +1;


const togglePressReleaseMachine = createMachine(
	{
		id: 'pressHoldRelease',
		context: {
			runningCounter: 0,
			pressCount: 0,
			releaseCount: 0
		},
		initial: 'inactive',
		states: {
			inactive: {
				on: {
					TOGGLE: {
						target: 'press',
						actions: assign({ pressCount: incrementPressCount })
					}
				}
			},
			press: {
				on: {
					//todo implement increment counter activity
					//todo implement entry action
					TOGGLE: {
						target: 'release',
						actions: assign({ releaseCount: incrementReleaseCount })
					}
				}
			},
			release: {
				//todo implement decrement counter activity
				// todo implement guard which sets state to inactive after period of time after counter hits 0
				on: {
					TOGGLE: {
						target: 'press',
						actions: assign({ pressCount: incrementPressCount })
					}
				}
			}
		}
	});

	export const togglePressReleaseService = interpret(togglePressReleaseMachine).start();
