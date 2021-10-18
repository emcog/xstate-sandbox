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
					TOGGLE: {
						target: 'release',
						actions: assign({ releaseCount: incrementReleaseCount })
					}
				}
			},
			release: {
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
