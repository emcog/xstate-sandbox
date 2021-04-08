<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();


	let buttonDown = false;

	// const handleButtonDown = () => {
	// 	buttonDown = true;
	// 	dispatch('buttonStatus', {
	// 			buttonDown,
	// 			someOtherText: "Foo",
	// 			aMethod:  function(){
	// 				console.log('Foo')
	// 			},
	// 			aNMethod:  function(){
	// 				down = false;
	// 			}
	// 		}
	// 	)
	// }


	const handleButtonUp = () => {
		buttonDown = false;
		dispatch('buttonUp', {
			// triggerButtonUp: function(){
			// 		console.log('button up')
			buttonDown
				}
		)
	}


	const handleButtonDown = () => {
		buttonDown = true;
		dispatch('buttonDown', {
			// triggerButtonUp: function(){
			// 		console.log('button up')
			buttonDown
				}
		)
	}


</script>

	<button on:mousedown={handleButtonDown} on:mouseup={handleButtonUp}>
		Button: {buttonDown}
	</button>

<style></style>