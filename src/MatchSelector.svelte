<script>
    export let matches;

    import { createEventDispatcher } from "svelte";

    const dispatch = createEventDispatcher();

    function selectMatch(event) {
        const selectedMatchIndex = event.target.selectedIndex;
        const selectedMatch = matches[selectedMatchIndex];
        console.log("Selected match:", selectedMatch);

        // dispatching the selected match to the parent component
        dispatch("select", selectedMatch);
    }
</script>

<select on:change={selectMatch}>
    <option value="">Select a match</option>
    {#each Object.values(matches) as match, i}
        <option value={match.PGN} key={i}>{match.White} vs {match.Black}</option
        >
    {/each}
</select>

<style>
    select {
        padding: 8px;
        border: 1px solid #ccc;
        border-radius: 5px;
        font-size: 16px;
        width: 100%;
    }

    option {
        padding: 8px;
        font-size: 16px;
    }
</style>
