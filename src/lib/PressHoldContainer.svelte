<script>

	import PressHoldButton from './PressHoldButton.svelte';

	const handleButtonStatus = (event) => {
		console.log(event.detail, 'handleButtonStatus')
	}

</script>
<PressHoldButton on:buttonStatus={handleButtonStatus} />