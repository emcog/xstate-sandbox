<script>

	let buttonDown = false;

	const handleMouseDown = () => {
		buttonDown = true;
		console.log(buttonDown);
	}

	const handleMouseUp = () => {
		buttonDown = false;
		console.log(buttonDown);
	}

</script>

	<button on:mousedown={handleMouseDown} on:mouseup={handleMouseUp	}>
		Button: {buttonDown}

	</button>

<style></style>