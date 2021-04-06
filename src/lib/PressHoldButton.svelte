<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();


	let buttonDown = false;

	const handleMouseDown = () => {
		buttonDown = true;
		dispatch('buttonStatus', {
				buttonDown,
				someOtherText: "Foo",
				aMethod:  function(){
					console.log('Foo')
				},
				aNMethod:  function(){
					down = false;
				}
			}
		)
	}



	const handleMouseUp = () => {
		buttonDown = false;
		dispatch('buttonStatus', {
			buttonDown,
			someOtherText: "Bar",
			aMethod:  function(){
				console.log('bar')
				},
				aNMethod:  function(){
				down = true;
				}
			}
		)
	}

</script>

	<button on:mousedown={handleMouseDown} on:mouseup={handleMouseUp	}>
		Button: {buttonDown}
	</button>

<style></style>