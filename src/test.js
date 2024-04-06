const pieceValues = {
    P: 1, // Pawn
    N: 3, // Knight
    B: 3, // Bishop
    R: 5, // Rook
    Q: 9, // Queen
    K: 0  // King (we won't be moving the king in this example)
};

function parsePGN(pgn) {
    const board = Array.from({ length: 8 }, () => Array(8).fill(0));
    const moves = pgn.split(' ');

    const updateBoard = (move, value, capture = false) => {
        const col = move.charCodeAt(0) - 'a'.charCodeAt(0);
        const row = 8 - parseInt(move.charAt(1));

        // Check if row and col are within the valid range
        if (row >= 0 && row < 8 && col >= 0 && col < 8) {
            if (capture) {
                const prevValue = board[row][col];
                board[row][col] += value * 2 - prevValue;
            } else {
                board[row][col] += value;
            }
        }
    };

    for (let i = 0; i < moves.length; i++) {
        const move = moves[i];

        if (move.includes('O-O')) {
            // Kingside castling
            if (move === 'O-O') {
                updateBoard('e1', 0);
                updateBoard('g1', pieceValues.R);
                updateBoard('h1', 0);
            } else {
                // Queenside castling
                updateBoard('e8', 0);
                updateBoard('c8', pieceValues.R);
                updateBoard('a8', 0);
            }
        } else if (move.includes('x')) {
            // Capture
            const piece = move.charAt(0);
            const value = pieceValues[piece] || 0;
            const capturePos = move.slice(2);
            updateBoard(capturePos, value, true);
        } else {
            // Regular move
            const piece = move.charAt(0);
            const value = pieceValues[piece] || 1; // Assume pawn if no piece specified
            const movePos = move.slice(move.charAt(1) === 'x' ? 2 : 1);
            updateBoard(movePos, value);
        }
    }

    return board;
}

// Example usage
const pgn = "1.Nf3 Nf6 2.c4 g6 3.Nc3 d5 4.cxd5 Nxd5 5.g3 Bg7 6.Nxd5 Qxd5 7.Bg2 O-O 8.O-O Nc6 9.d3 Qd8 10.a3 e5 11.Bg5 Qd6 12.Qc2 Bg4 13.Be3 Rfe8 14.Rac1 Rac8 15.Rfe1 Ne7 16.Ng5 Nd5 17.Qb3 c6 18.Bxa7 Qe7 19.h4 h6 20.Bc5 Qd7 21.Ne4 b6 22.Bb4 Be6 23.Qa4 Red8 24.Bd2 f5 25.Nc3 Ne7 26.Red1 Kh7 27.Be3 Rb8 28.b4 Ra8 29.Qc2 Rxa3 30.Bxb6 Rb8 31.Bc5 Nd5 32.Nxd5 cxd5 33.Ra1 Raa8 34.Rxa8 Rxa8 35.d4 f4 36.dxe5 fxg3 37.fxg3 Bxe5 38.h5 Qf7 39.hxg6+ Qxg6 40.Qxg6+ Kxg6 41.Bxd5 Bxd5 42.Rxd5 Bxg3 43.Kg2 Bf4 44.b5 Ra2 45.Kf3 Bh2 46.b6 Rb2 47.Be3 Rb4 48.Rd8 Rb5 49.Rh8 h5 50.Kg2 Be5 51.Rh6+ Kf5 52.Rxh5+ Ke4 53.Bf2 Rb2 54.Rh4+ Kd5 55.e4+ Kc4 56.Kf3 Rb3+ 57.Kg4 Rb5 58.Rh6 Bc3 59.Rc6+ Kd3 60.Kf3 Rb1 61.Rd6+ Kc4 62.Rd7 Kb5 63.Rc7 Ba5 64.Kg4 Rb2 65.Bd4 Rb4 66.Rd7 Kc6 67.Rd8 Bxb6 68.Bxb6 Rxe4+ 69.Kf3 Re7 70.Be3 Kc7 71.Ra8 Re6 72.Ke2 Kc6 73.Kd3 Rd6+ 74.Kc4 Rd1 75.Ra6+ Kb7 76.Rf6 Re1 77.Bc5 Rc1+ 78.Kb5 Rb1+ 79.Bb4 Rc1 80.Bc5 Rb1+ 81.Kc4 Rh1 82.Rb6+ Kc7 83.Ra6 Kb7 84.Re6 Rd1 85.Kb5 Rb1+ 86.Bb4 Rc1 87.Ra6 Rc2 88.Ra1 Rh2 89.Bc5 Rb2+ 90.Kc4 Rh2 91.Ra7+ Kc6 92.Ra6+ Kb7 93.Rb6+ Kc7 94.Rg6 Rd2 95.Bd4 Kb7 96.Kd5 Rc2 97.Rb6+ Kc7 98.Ra6 Kd7 99.Rg6 Re2 100.Rd6+ Ke7 101.Rg6 Kd7 102.Rh6 Rc2 103.Rd6+ Kc7 104.Rg6 Kb7 105.Bc5 Rd2+ 106.Ke5 Rd1 107.Rg7+ Ka6 108.Bd4 Rc1 109.Kd5 Rc8 110.Ra7+ Kb5 111.Rb7+ Ka6 112.Rb6+ Ka5 113.Bc5 Rd8+ 114.Kc4 Rd1 115.Rb2 Rc1+ 116.Kd5 Ka4 117.Rb4+ Ka5 118.Kc6 Rc3 119.Rb8 Ka4 120.Rb7 Rc2 121.Kd5 Rd2+ 122.Bd4 Rc2 123.Ke4 Ka5 124.Rb6 Rc4 125.Rb2 Rc1 126.Kd5 Ka4 127.Bc5 Ka5 128.Kc6 Rc4 129.Rb3 Rg4 130.Ra3+ Ra4 131.Rd3 Rg4 132.Kd5 Kb5 133.Rb3+ Ka4 134.Rb2 Rh4 135.Bd4 Ka3 136.Rb7 Ka2 137.Kc4 Rg4 138.Rb2+ Ka3 139.Rb1 Rg2 140.Rb7";

const finalBoard = parsePGN(pgn);
console.log(finalBoard);