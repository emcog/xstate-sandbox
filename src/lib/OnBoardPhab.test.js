
import '@testing-library/svelte'
import { getByTestId, render } from '@testing-library/svelte'
import OnBoardPhab from './OnBoardPhab.svelte'



describe("On board instructions", () => {
 it("Should display the correct instruction", () => {
  const { container } = render(OnBoardPhab);

  expect(container).toHaveTextContent("Onboarding instruction");
  // expect(getByTestId(container, "test-test")).toHaveTextContent("Onboarding instruction")

 });
});