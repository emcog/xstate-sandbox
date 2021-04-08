<script>

	import PressHoldButton from './PressHoldButton.svelte'

	//variable declaration and modifier have to be in same component
	// let down = false;

	// const handleButtonStatus = (event) => {
	// 	event.detail.triggerButtonUp()
	// 	event.detail.buttonDown()
	// 	console.log(down);
		// console.log(event.detail.aMethod(), 'handleButtonStatus')
	// }


	// const buttonIsUp = (event) => {
	// 	event.detail.triggerButtonUp()
	// 	event.detail.buttonDown()
	// 	console.log(down);
	// 	// console.log(event.detail.aMethod(), 'handleButtonStatus')
	// }



	const buttonIsDown = (event) => {
		event.detail
		// console.log(event.detail)
		pressHoldStartAndReleaseEnd()

	}

	const buttonIsUp = (event) => {
		// console.log(event.detail)
		pressHoldEndAndReleaseStart()
	}


	const pressHoldStartAndReleaseEnd = () => {
		console.log("press hold has Started")
	}

	const pressHoldEndAndReleaseStart = () => {
		console.log("press Hold End And Release Start")
	}


</script>

<PressHoldButton on:buttonUp={buttonIsUp} on:buttonDown={buttonIsDown} />

