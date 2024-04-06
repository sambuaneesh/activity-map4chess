<script>
  export let finalBoard = [
    [10, 10, 10, 14, 0, 0, 0, 0],
    [0, 5, 5, 11, 21, 9, 3, 1],
    [2, 6, 6, 14, 8, 3, 0, 0],
    [7, 13, 0, 7, 9, 1, 0, 0],
    [9, 10, 12, 0, 10, 3, 18, 5],
    [12, 5, 8, 1, 0, 0, 6, 0],
    [6, 20, 25, 15, 5, 0, 5, 13],
    [0, 20, 30, 20, 5, 0, 5, 5],
  ];

  const getColor = (row, col) => {
    const isWhite = (row + col) % 2 === 0;
    return isWhite ? "#f0d9b5" : "#b58863";
  };
</script>

<div class="board">
  {#each finalBoard as row, rowIndex}
    <div class="row">
      {#each row as value, colIndex}
        <div
          class="square"
          style="background-color: {getColor(rowIndex, colIndex)};"
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
