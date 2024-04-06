<script>
    import * as d3 from "d3";
    export let finalBoard;

    let minValue = Infinity;
    let maxValue = -Infinity;

    // Find the minimum and maximum values in the finalBoard matrix
    for (const row of finalBoard) {
        for (const value of row) {
            minValue = Math.min(minValue, value);
            maxValue = Math.max(maxValue, value);
        }
    }

    const colorScale = d3
        .scaleLinear()
        .domain([minValue, maxValue])
        .range(["#ff4d4d", "#4dff4d"]);

    const getColor = (value) => colorScale(value);
</script>

<div class="container">
    <div class="board">
        {#each finalBoard as row, rowIndex}
            <div class="row">
                {#each row as value, colIndex}
                    <div
                        class="square"
                        style="background-color: {getColor(value)};"
                    />
                {/each}
            </div>
        {/each}
    </div>

    <div class="legend">
        <div class="gradient">
            {#each Array(100) as _, i}
                <div
                    class="gradient-bar"
                    style="background-color: {colorScale(
                        minValue + ((maxValue - minValue) * i) / 99,
                    )};"
                />
            {/each}
        </div>
        <div class="labels">
            <span class="min">Min Activity</span>
            <span class="max">Max Activity</span>
        </div>
    </div>
</div>

<style>
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        font-family: "Roboto", sans-serif;
    }

    .board {
        display: grid;
        grid-template-rows: repeat(8, 1fr);
        gap: 1px;
        width: 400px;
        height: 400px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
        border-radius: 5px;
        margin-bottom: 20px;
    }

    .row {
        display: grid;
        grid-template-columns: repeat(8, 1fr);
        gap: 1px;
    }

    .square {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .legend {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .gradient {
        display: flex;
        height: 20px;
        width: 200px;
        border-radius: 5px;
        box-shadow: 0 0 5px rgba(0, 0, 0, 0.3);
        margin-bottom: 10px;
    }

    .gradient-bar {
        flex: 1;
    }

    .labels {
        display: flex;
        justify-content: space-between;
        width: 200px;
        font-size: 14px;
        color: #666;
    }
</style>
