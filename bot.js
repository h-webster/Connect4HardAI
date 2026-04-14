
function getScore(result, depth) {
  if (result == "tie") {
    return 0;
  }
  if (result == "B") {
    return 10 - depth;
  }
  return -10 + depth;
}

function minimax(board, depth, maximizing) {
  //console.log(depth);
  let result = game_state(board);
  if (result != "ongoing") {
    return getScore(result, depth);
  }
  if (depth >= 7) {
    return 0;
  }
  if (maximizing) {
    let best_score = -Infinity;
    for (let move of available_moves(board)) {
      let new_board = copy_board_place(board, move, AI_side);
      let score = minimax(new_board, depth + 1, false);
      if (score > best_score) {
        best_score = score;
      }
    }
    return best_score;
  } else {
    let best_score = Infinity;
    for (let move of available_moves(board)) {
      let new_board = copy_board_place(board, move, "R");
      let score = minimax(new_board, depth + 1, true);
      if (score < best_score) {
        best_score = score;
      }
    }
    return best_score;
  }
}

function ai_move() {
  let best_score = -Infinity;
  let best_move = -1;
  let variation_moves = [];
  for (let move of available_moves(main_board)) {
    let new_board = copy_board_place(main_board, move, AI_side);
    let score = minimax(new_board, 0, false);
    if (score > best_score) {
      best_score = score;
      best_move = move;
      variation_moves = [];
      variation_moves.push(move);
    }
    else if (score == best_score) {
      variation_moves.push(move);
    }
  }
  return chooseRandomElement(variation_moves);
}

function chooseRandomElement(arr) {
  let randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}