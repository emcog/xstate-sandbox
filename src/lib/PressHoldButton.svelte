<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();


	let buttonDown = false;

	const handleMouseDown = () => {
		buttonDown = true;
		dispatch('buttonStatus', {
				text: 'true'
			}
			// buttonDown = true;
		)
	}

	const handleMouseUp = () => {
		buttonDown = false;
		dispatch('buttonStatus', {
			text: 'false'
			}
		)
	}

</script>

	<button on:mousedown={handleMouseDown} on:mouseup={handleMouseUp	}>
		Button: {buttonDown}
	</button>

<style></style>