function getScore(result, depth) {
  if (result == "tie") return 0;
  if (result == "B") return 10 - depth;
  return -10 + depth;
}

function drop_down(board, x) {
  for (let y = 0; y < 7; y++) {
    if (board[y][x] == "") return y;
  }
  return -1;
}

function available_moves(board) {
  let moves = [];
  for (let x = 0; x < 7; x++) {
    for (let y = 0; y < 7; y++) {
      if (board[y][x] == "") {
        moves.push(x);
        break;
      }
    }
  }
  return moves;
}

function copy_board_place(board, slot, turn) {
  let new_board = [];
  for (let i = 0; i < board.length; i++) {
    new_board[i] = board[i].slice();
  }
  let dropped = drop_down(board, slot);
  new_board[dropped][slot] = turn;
  return new_board;
}

function game_state(board) {
  for (let row of board) {
    let same = 0, same_tile = "";
    for (let tile of row) {
      if (tile == "") { same = 0; same_tile = ""; }
      else {
        if (tile == same_tile) same++;
        else { same_tile = tile; same = 1; }
        if (same == 4) return same_tile;
      }
    }
  }
  for (let x = 0; x < 7; x++) {
    let same = 0, same_tile = "";
    for (let y = 0; y < 7; y++) {
      let tile = board[y][x];
      if (tile == "") { same = 0; same_tile = ""; }
      else {
        if (tile == same_tile) same++;
        else { same_tile = tile; same = 1; }
        if (same == 4) return same_tile;
      }
    }
  }
  for (let row = 3; row < board.length; row++) {
    for (let col = 0; col < board[0].length - 3; col++) {
      let tile = board[row][col];
      if (tile != "" && tile == board[row-1][col+1] && tile == board[row-2][col+2] && tile == board[row-3][col+3])
        return tile;
    }
  }
  for (let row = 0; row < board.length - 3; row++) {
    for (let col = 0; col < board[0].length - 3; col++) {
      let tile = board[row][col];
      if (tile != "" && tile == board[row+1][col+1] && tile == board[row+2][col+2] && tile == board[row+3][col+3])
        return tile;
    }
  }
  for (let row of board) {
    for (let tile of row) {
      if (tile == "") return "ongoing";
    }
  }
  return "tie";
}

function minimax(board, depth, maximizing, AI_side, maxDepth) {
  let result = game_state(board);
  if (result != "ongoing") return getScore(result, depth);
  if (depth >= maxDepth) return 0;
  if (maximizing) {
    let best_score = -Infinity;
    for (let move of available_moves(board)) {
      let score = minimax(copy_board_place(board, move, AI_side), depth + 1, false, AI_side, maxDepth);
      if (score > best_score) best_score = score;
    }
    return best_score;
  } else {
    let best_score = Infinity;
    let human_side = AI_side == "B" ? "R" : "B";
    for (let move of available_moves(board)) {
      let score = minimax(copy_board_place(board, move, human_side), depth + 1, true, AI_side, maxDepth);
      if (score < best_score) best_score = score;
    }
    return best_score;
  }
}

const DEPTH_LIMIT  = { easy: 2, medium: 4, hard: 7 };
const RANDOM_CHANCE = { easy: 0.40, medium: 0.1, hard: 0 };

self.onmessage = function(e) {
  let { board, AI_side, level } = e.data;
  let maxDepth    = DEPTH_LIMIT[level]   ?? 7;
  let randomChance = RANDOM_CHANCE[level] ?? 0;

  let best_score = -Infinity;
  let best_move = -1;
  let variation_moves = [];
  for (let move of available_moves(board)) {
    let score = minimax(copy_board_place(board, move, AI_side), 0, false, AI_side, maxDepth);
    if (score > best_score) {
      best_score = score;
      best_move = move;
      variation_moves = [move];
    } else if (score == best_score) {
      variation_moves.push(move);
    }
  }
  let chosen = variation_moves[Math.floor(Math.random() * variation_moves.length)];
  if (Math.random() < randomChance) {
    chosen = available_moves(board)[Math.floor(Math.random() * available_moves(board).length)];
  }
  self.postMessage({ move: chosen });
};
