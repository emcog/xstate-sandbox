<script>
	import { isPhabButtonDown } from '$lib/stores/storePhabButtonState';


	function handlePhabButtonUp() {
		isPhabButtonDown.set(true);
		console.log('handlePhabButtonUp')
		console.log('isPhabButtonDown', $isPhabButtonDown )
	}



	function handlePhabButtonDown() {
		isPhabButtonDown.set(false);
		console.log('handlePhabButtonDown')
		console.log('isPhabButtonDown', $isPhabButtonDown )
	}

</script>

<!--<button id="press-hold-button"-->
<!--				on:mousedown={handlePhabButtonIsDown}-->
<!--				on:touchstart={handlePhabButtonIsDown}-->
<!--				on:mouseup={handleButtonUp}-->
<!--				on:touchend={handleButtonUp}>-->
				<!--{phabButtonIsDown}-->
<!--				on:mousedown={handlePhabButtonIsDown}-->
<!--				on:touchstart={handlePhabButtonIsDown}-->
<!--				on:mouseup={handleButtonUp}-->
<!--				on:touchend={handleButtonUp}>-->
<!--</button>-->
<button id="press-hold-button"
				on:mousedown={ handlePhabButtonDown }
				on:touchstart={ handlePhabButtonDown }
				on:mouseup={ handlePhabButtonUp }
				on:touchend={ handlePhabButtonUp } >
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