let main_board = [[]];
let main_turn = "B";
let main_state = "ongoing";
let status = "";
let AI_side = "B";
// BLUE IS YELLOW I REALIZED AFTER IN THE REAL GAME
const CELL = 58;
const BOARD_X = (600 - 7 * CELL) / 2; // 97
const BOARD_Y = 108;

function setup() {
  createCanvas(600, 600);
  main_board = create_new_board();
  let whoStarts = Math.floor(Math.random() * 2);
  main_turn = whoStarts == 0 ? "R" : "B";
  if (AI_side == main_turn) {
    setTimeout(() => {
      console.log("hello");
      // make ai first move if moving first the center (optimal move)
      main_place(4);
    }, 500);      
  }
}

function draw() {
  background(18, 22, 42);
  noStroke();
  fill(255);
  textSize(22);
  textStyle(BOLD);
  text("Connect 4  — Very Hard AI", BOARD_X, 42);
  textStyle(NORMAL);
  textSize(13);
  fill(140, 155, 200);
  text("By Wonkanese   •   Press 1–7 to place a piece", BOARD_X, 64);
  draw_board();
  draw_tiles(main_board);
  draw_status();
}

function draw_status() {
  let status_color;
  if (main_state == "ongoing") {
    if (main_turn == "R") {
      status = "Red's turn";
      status_color = color(220, 75, 75);
    } else {
      status = "Yellow's turn";
      status_color = color(224, 219, 70);
    }
  } else {
    if (main_state == "R") {
      status = "Red Won!";
      status_color = color(220, 75, 75);
    } else if (main_state == "tie") {
      status = "It's a Tie!";
      status_color = color(180, 185, 210);
    } else {
      status = "Yellow Won!";
      status_color = color(224, 219, 70);
    }
  }
  noStroke();
  textSize(22);
  textStyle(BOLD);
  fill(status_color);
  text(status, BOARD_X, BOARD_Y + 7 * CELL + 42);
  textStyle(NORMAL);
}

function create_new_board() {
  let new_board = [];
  for (let i = 0; i < 7; i++) {
    new_board.push(["", "", "", "", "", "", ""]);
  }
  return new_board;
}

function draw_board() {
  noStroke();
  fill(38, 80, 185);
  rect(BOARD_X - 10, BOARD_Y - 10, 7 * CELL + 20, 7 * CELL + 20, 14);

  // Column numbers
  fill(180, 200, 255);
  textSize(14);
  textStyle(BOLD);
  for (let i = 0; i < 7; i++) {
    text(i + 1, BOARD_X + i * CELL + CELL / 2 - 4, BOARD_Y - 16);
  }
  textStyle(NORMAL);

  // Empty cell holes
  fill(14, 18, 38);
  for (let row = 0; row < 7; row++) {
    for (let col = 0; col < 7; col++) {
      circle(BOARD_X + col * CELL + CELL / 2, BOARD_Y + row * CELL + CELL / 2, CELL - 10);
    }
  }
}

function draw_tiles(board) {
  board.forEach((row, y) => {
    row.forEach((tile, x) => {
      if (tile == "") return;
      let x_pos = BOARD_X + x * CELL + CELL / 2;
      let y_pos = BOARD_Y + (6 - y) * CELL + CELL / 2;
      if (tile == "R") {
        fill(215, 60, 60);
        stroke(255, 130, 130);
      } else {
        fill(217, 225, 55);
        stroke(240, 236, 19);
      }
      strokeWeight(2);
      circle(x_pos, y_pos, CELL - 10);
      noStroke();
    });
  });
}

function drop_down(board, x) {
  for (let y = 0; y < 7; y++) {
    if (board[y][x] == "") {
      return y;
    }
  }
  return -1;
}

function main_place(slot) {
  let dropped = drop_down(main_board, slot - 1);
  if (dropped != -1) {
    main_board[dropped][slot - 1] = main_turn;
  }
  if (main_turn == "R") {
    main_turn = "B";
  } else {
    main_turn = "R";
  }
  main_state = game_state(main_board);
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

function game_state(board) {
  for (let row of board) {
    let same = 0;
    let same_tile = "";
    for (let tile of row) {
      if (tile == "") {
        same = 0;
        same_tile = "";
      } else {
        if (tile == same_tile) {
          same += 1;
        } else if (same_tile != tile) {
          same_tile = tile;
          same = 1;
        }
        if (same == 4) {
          return same_tile;
        }
      }
    }
  }

  for (let x = 0; x < 7; x++) {
    let same = 0;
    let same_tile = "";
    for (let y = 0; y < 7; y++) {
      let tile = board[y][x];
      if (tile == "") {
        same = 0;
        same_tile = "";
      } else {
        if (tile == same_tile) {
          same += 1;
        } else if (same_tile != tile) {
          same_tile = tile;
          same = 1;
        }
        if (same == 4) {
          return same_tile;
        }
      }
    }
  }

  for (let row = 3; row < board.length; row++) {
    for (let col = 0; col < board[0].length - 3; col++) {
      let tile = board[row][col];
      if (
        tile != "" &&
        tile == board[row - 1][col + 1] &&
        tile == board[row - 2][col + 2] &&
        tile == board[row - 3][col + 3]
      ) {
        return tile;
      }
    }
  }

  for (let row = 0; row < board.length - 3; row++) {
    for (let col = 0; col < board[0].length - 3; col++) {
      let tile = board[row][col];
      if (
        tile != "" &&
        tile == board[row + 1][col + 1] &&
        tile == board[row + 2][col + 2] &&
        tile == board[row + 3][col + 3]
      ) {
        return tile;
      }
    }
  }

  for (let row of board) {
    for (let tile of row) {
      if (tile == "") {
        return "ongoing";
      }
    }
  }
  return "tie";
}

function keyPressed() {
  if (main_state != "ongoing") {
    return;
  }
  let nums = "1234567";
  if (nums.includes(key) && main_turn == "R") {
    let slot_to_move = parseInt(key) - 1;
    let moves = available_moves(main_board);
    if (moves.includes(slot_to_move)) {
      main_place(slot_to_move + 1);
      main_state = game_state(main_board);
      if (main_state == "ongoing") {
        setTimeout(() => {
          main_place(ai_move() + 1);
        }, 100); 
      }
    }
  }
}
// not used
function random_vs_random() {
  main_state = game_state(main_board);
  if (main_state == "ongoing") {
    random_move();
    random_vs_random();
  }
}

function copy_board_place(board, slot, turn) {
  let new_board = [];
  for (let i = 0; i < board.length; i++) {
    new_board[i] = [];
    for (let j = 0; j < board[i].length; j++) {
      new_board[i][j] = board[i][j];
    }
  }
  let dropped = drop_down(board, slot);
  new_board[dropped][slot] = turn;
  return new_board;
}

