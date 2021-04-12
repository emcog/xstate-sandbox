<script>
	import { onBoardPhab } from '$lib/stores/onboardPhab.js'
</script>
<span>{ $onBoardPhab.progress.pressAndHoldTheButton.instruction }</span>
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
