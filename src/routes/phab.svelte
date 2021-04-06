<script>
	import Phab from '$lib/Phab.svelte';
	import PressHoldButton from '../lib/PressHoldButton.svelte';


	const handleButtonStatus = (event) => {
		console.log(event, 'simple');

	};

</script>

<main>
	<PressHoldButton on: />


</main>

<style lang="scss">

</style>
