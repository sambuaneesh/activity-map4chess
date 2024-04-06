<script>
  import ChessBoard from "./ChessBoard.svelte";

  const finalBoard = [
    [10, 10, 10, 14, 0, 0, 0, 0],
    [0, 5, 5, 11, 21, 9, 3, 1],
    [2, 6, 6, 14, 8, 3, 0, 0],
    [7, 13, 0, 7, 9, 1, 0, 0],
    [9, 10, 12, 0, 10, 3, 18, 5],
    [12, 5, 8, 1, 0, 0, 6, 0],
    [6, 20, 25, 15, 5, 0, 5, 13],
    [0, 20, 30, 20, 5, 0, 5, 5],
  ];
</script>

<ChessBoard {finalBoard} />
