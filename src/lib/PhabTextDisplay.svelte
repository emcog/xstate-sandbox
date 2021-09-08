<script>
	import { phabOnboardingState } from './stores/storePhabOnboardingState.js';

	//destructure onBoardPhab
	//to do – refactor so that this references array positions rather than object keys
	/*
	const {
		pressAndHoldTheButton,
		keepingGoing,
		thatIsGreat,
		nowReleaseAndWait,
		waitALittleLonger,
		now,
		pressHoldAndBreathe
	} = $onBoardPhab.progress;

	const {
		tryPressingLonger,
		dontPressJustYet,
		releaseTheButton,
		letsStartAgain
	} = $onBoardPhab.progressInterrupted;

	 */

</script>
<!--todo replace 0 with conditional logic which displays the first instruction which is not skipped-->
{#if !$phabOnboardingState.skipped }<span>{ $phabOnboardingState.progress[0].instruction }</span>{/if}
<style>
	span {
      z-index: 10;
      grid-column: 2/3;
      grid-row: 4/5;
      justify-self: center;
      align-self: start;
			color: white;
			margin-bottom: 75px;
	}
</style>
