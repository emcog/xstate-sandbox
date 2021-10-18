import { createMachine, interpret } from 'xstate';

const toggleMachine = createMachine({
	id: 'toggle',
		initial: 'inactive',
		states: {
		inactive: {
			on: { TOGGLE: 'active' }
		},
		active: {
			on: { TOGGLE: 'inactive' }
		}
	}
	});

	export const toggleService = interpret(toggleMachine).start();