<script>
	console.log("bannas in press hold button")
	import { oddsEqualActivePress } from '$lib/stores/storePhabButtonState';

	//xstate machine
	import { togglePressReleaseService } from './machines/togglePressReleaseMachine';

	function handlePhabButtonUp() {
		oddsEqualActivePress.update(n => n + 1);
		console.log('handlePhabButtonUp – oddsEqualActivePress', $oddsEqualActivePress % 2 )
		togglePressReleaseService.send('TOGGLE')
	}


	function handlePhabButtonDown() {
		oddsEqualActivePress.update(n => n + 1);
		console.log('handlePhabButtonDown – oddsEqualActivePress', $oddsEqualActivePress % 2 )
		togglePressReleaseService.send('TOGGLE')
	}

	// console.log('toggle press release service', togglePressReleaseService)
	// console.log("toggle press release service context", togglePressReleaseService.context)


</script>




<button id="press-hold-button"
				on:mousedown={ handlePhabButtonDown }
				on:touchstart={ handlePhabButtonDown }
				on:mouseup={ handlePhabButtonUp }
				on:touchend={ handlePhabButtonUp }
				>

				{ $togglePressReleaseService.value === 'inactive'
		? "Released"
		: "Pressing"}
</button>

<span> {$togglePressReleaseService.context.runningCounter} </span>
<span> {$togglePressReleaseService.state} </span>
<span> {$togglePressReleaseService.value}</span>

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



    #press-hold-button:after {
      content: 'state: ' attr(data-state);
      position: absolute;
      top: 100%;
      margin-top: 0.5rem;
      background: black;
      font-family: monospace;
      color: white;
      padding: 0.25rem;
      border-radius: inherit;
      white-space: nowrap;
    }


    @-webkit-keyframes fade-in-out {
        0%, to { border-color: rgba(255, 255, 255, 1) }
        50% { border-color: rgba(255, 255, 255, 0.5) }
    }

    @keyframes fade-in-out {
        0%, to { border-color: rgba(255, 255, 255, 1) }
        50% { border-color: rgba(255, 255, 255, 0) }
    }


</style>