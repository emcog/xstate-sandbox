<script>

	import PressHoldButton from './PressHoldButton.svelte';

	//variable declaration and modifier have to be in same component
	let down = false;

	const handleButtonStatus = (event) => {
		event.detail.aMethod()
		event.detail.aNMethod()
		console.log(down);
		// console.log(event.detail.aMethod(), 'handleButtonStatus')
	}

</script>
<PressHoldButton on:buttonStatus={handleButtonStatus} />

