<script>
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

    const getColor = (value) => {
        const ratio = (value - minValue) / (maxValue - minValue);
        const hue = ratio * 120; // Hue range from 0 (red) to 120 (green)
        const saturation = 100; // Saturation percentage
        const lightness = 50; // Lightness percentage
        return `hsl(${hue}, ${saturation}%, ${lightness}%)`;
    };
</script>

<div class="board">
    {#each finalBoard as row, rowIndex}
        <div class="row">
            {#each row as value, colIndex}
                <div
                    class="square"
                    style="background-color: {getColor(value)};"
                >
                    {value}
                </div>
            {/each}
        </div>
    {/each}
</div>

<style>
    .board {
        display: grid;
        grid-template-rows: repeat(8, 1fr);
        gap: 1px;
        width: 400px;
        height: 400px;
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
        font-size: 24px;
        font-weight: bold;
        color: #333;
    }
</style>
