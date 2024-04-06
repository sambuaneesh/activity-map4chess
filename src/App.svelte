<script>
  import ChessBoard from "./ChessBoard.svelte";
  import MatchSelector from "./MatchSelector.svelte";
  import { parsePGN } from "./utils";
  import matches from "./matches.json";

  let finalBoard = null;
  let selectedGameDetails = {}; // Initialize selected game details

  function handleSelect(event) {
    finalBoard = parsePGN(event.detail.PGN);
    selectedGameDetails = event.detail; // Store selected game details
  }
</script>

<h1>Chess Activity Map</h1>
<div class="container">
  <div class="chessboard-container">
    {#if finalBoard}
      <ChessBoard {finalBoard} />
    {/if}
  </div>

  <!-- Sidebar for selected game details -->
  {#if Object.keys(selectedGameDetails).length != 0}
    <div class="sidebar">
      <h2>Game Details</h2>
      <ul>
        {#each Object.entries(selectedGameDetails).slice(0, 6) as [key, value]}
          <li><strong>{key}:</strong> {value}</li>
        {/each}
      </ul>
    </div>
  {/if}
</div>

<!-- MatchSelector component -->
<MatchSelector {matches} on:select={handleSelect} />

<style>
  .container {
    display: flex;
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
  }

  .chessboard-container {
    flex: 2;
    margin-right: 20px;
    border: 1px solid #ccc;
    border-radius: 5px;
    overflow: hidden;
  }

  .sidebar {
    flex: 1;
    padding: 20px;
    border-radius: 5px;
  }
</style>
