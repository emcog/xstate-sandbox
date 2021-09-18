<script>
	import { phabState } from './stores/storePhabState.js';


	let onBoardingWrapperNode;
	let onBoarding01;
	let onBoarding02;

	let pointerIsDown = false;



	function onBoardingControlFlow() {
		if ($phabState.skipped || $phabState.passedAll) {
			console.log('return')
		} else {
			console.log('run control flow')
			$phabState.PROGRESS
			console.log($phabState.active)
			console.log($phabState.phabCount)
		}
	}

	function increment() {
		phabState.INCREMENTCOUNTER();
		console.log(phabState.INCREMENTCOUNTER);
	}



</script>
<button on:click={onBoardingControlFlow}>test control flow</button>

{#if !$phabState.skipped }<button on:click={ phabState.SKIP } data-testid='skip-onboarding'>Hide text</button>{/if}

<button class='mt-20' on:click={ increment }>INCREMENT</button>

<style>
    button {
        grid-column: 2/3;
        grid-row: 5/6;
        justify-self: center;
        margin: 50px 0;
        max-width: 100px;
        /*text-decoration: underline;*/
        /*background: none;*/
        /*padding: 0;*/
        /*border: none;*/
        /*color: white;*/
				/*background: orange;*/
    }
		.mt-20 {
				margin-top: 50px;
		}
</style>