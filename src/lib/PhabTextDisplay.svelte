<script>
	import { storePhabOnboardingState } from './stores/storephabOnboardingState.js';


</script>
<!--todo replace 0 with conditional logic which displays the first instruction which is not skipped-->
{#if !$storePhabOnboardingState.skipped }<span>{ $storePhabOnboardingState.steps[0].instruction }</span>{/if}
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
