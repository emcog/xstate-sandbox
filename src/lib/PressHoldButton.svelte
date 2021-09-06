<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	import { onBoardingControlFlow} from './OnBoardPhab.svelte'
	import { onBoardPhab, controlFlow } from './stores/onboardPhab';


	let phabButtonIsDown = false;

	const handleButtonUp = () => {
		phabButtonIsDown = false;
		//why is this wording so confusing?
		dispatch('buttonUp', {
			// phabButtonIsDown is false
			phabButtonIsDown
			// buttonUp
				}
		)
	}

	function controlFlowHere() {
		const progressLength = Object.keys($onBoardPhab.progress).length
		console.log(progressLength);

		// likely need to refactor the store to be array.
		for (let i = 0; i < progressLength; i++) {
			if (i.passed === true) {
				console.log('i passed', i.passed)
				'skip';
			} else if (i.passed === false && counter <= i.requiredMinDuration) {
				'i.instruction';
				if (counter === i.requiredMinDuration) {
					i.passed = true;
				}
			}
		}
	}


	const handlePhabButtonIsDown = () => {
		phabButtonIsDown = true;
		console.log('button down');
		controlFlowHere();
		dispatch('phabButtonIsDown', {
			// phabButtonIsDown is true
			phabButtonIsDown
				}
		)
	}

</script>

<button id="press-hold-button"
				on:mousedown={handlePhabButtonIsDown}
				on:touchstart={handlePhabButtonIsDown}
				on:mouseup={handleButtonUp}
				on:touchend={handleButtonUp}>
				<!--{phabButtonIsDown}-->
</button>



<style>

    #press-hold-button {
				z-index: 10;
        grid-column: 2/3;
        grid-row: 4/5;
        justify-self: center;
        align-self: end;

        border-radius: 100%;
        border: solid 4px rgba(255, 255, 255, 1);

        width: 53px;
        height: 53px;
        background-color: rgba(0, 0, 0, 0.1);

        box-shadow: 0 0 3px 2px rgba(88, 102, 114, 0.5);

        -webkit-animation-name: fade-in-out;
        animation-name: fade-in-out;
        -webkit-animation-duration: 5s;
        animation-duration: 5s;
        -webkit-animation-timing-function: cubic-bezier(.65, .05, .36, 1);
        animation-timing-function: cubic-bezier(.65, .05, .36, 1);
        -webkit-animation-iteration-count: infinite;
        animation-iteration-count: infinite;
        -webkit-animation-direction: alternate;
        animation-direction: alternate;
    }


    #press-hold-button:hover { cursor: pointer; }


    @-webkit-keyframes fade-in-out {
        0%, to { border-color: rgba(255, 255, 255, 1) }
        50% { border-color: rgba(255, 255, 255, 0.5) }
    }

    @keyframes fade-in-out {
        0%, to { border-color: rgba(255, 255, 255, 1) }
        50% { border-color: rgba(255, 255, 255, 0) }
    }


</style>