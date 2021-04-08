<script>
	import PressHoldContainer from '../lib/PressHoldContainer.svelte';
</script>

<div class="gradient-bg fill-the-view">
<div>
	<PressHoldContainer />
</div>
</div>

<style>
    .gradient-bg{ background-image: linear-gradient(to bottom, #7de3a9, #5fc189 21%, #1b442d 95%); }


    .fill-the-view {
        width: 100vw;
        height: 100vh;
    }
</style>