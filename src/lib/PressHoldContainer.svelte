<script>

	import PressHoldButton from './PressHoldButton.svelte';

	const handleButtonStatus = (event) => {
		event.detail.aMethod()
		// console.log(event.detail.aMethod(), 'handleButtonStatus')
	}

</script>
<PressHoldButton on:buttonStatus={handleButtonStatus} />