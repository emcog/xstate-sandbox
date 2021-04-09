<script></script>


<div id="feedback-circle" data-sizing="px"></div>
<div id='signifier__circle-outline' class='on-boarding-wrapper'></div>


<style>

    #feedback-circle {
        justify-self: center;
        align-self: center;
        grid-column: 1/-1;
        grid-row: 1/-1;
        z-index: 1;
        border-radius: 9999px;
        width: var(--size);
        height: var(--size);
        box-shadow: 0 0 10px 10px rgba(255, 255, 255, .6);
        background-color: rgba(255, 255, 255, 0.9);
    }


    #signifier__circle-outline {
        justify-self: center;
        align-self: center;
        grid-column: 1/-1;
        grid-row: 1/-1;

        border-radius: 999%;
        width: 302px;
        height: 302px;
        margin: 0 auto;
        -webkit-filter: blur(2px);
        filter: blur(2px);
        box-shadow: inset 0 0 31px 0 rgba(255, 255, 255, 0.125), 0 0 31px 0 rgba(255, 255, 255, 0.125) ;
        border: solid 3px rgba(0, 0, 0, 0.25);

    }
</style>