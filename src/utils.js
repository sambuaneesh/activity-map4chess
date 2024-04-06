export const pieceValues = {
    P: 1, // Pawn
    N: 3, // Knight
    B: 3, // Bishop
    R: 5, // Rook
    Q: 9, // Queen
    K: 1  // King 
};

export function parsePGN(pgn) {
    const board = Array.from({ length: 8 }, () => Array(8).fill(0));
    const moves = pgn.split(' ');

    const updateBoard = (move, value, capture = false) => {
        const col = move.charCodeAt(0) - 'a'.charCodeAt(0);
        const row = 8 - parseInt(move.charAt(1));

        // valid range check
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
