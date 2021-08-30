//it should be selectable / focus with tab button and operable with space bar or enter key, whichever is appropriate
// it should be visible


import '@testing-library/svelte'
import { getByTestId, render } from '@testing-library/svelte'
import PressHoldButton from './PressHoldButton.svelte'

describe ("Press Hold Button", () => {
	it("should be visible", () => {
		const { container } = render(PressHoldButton);

		expect(container).toBeVisible();
	});
})