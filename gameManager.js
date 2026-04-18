let easyButton, mediumButton, hardButton, retryButton;
function initButtons() {
    easyButton = new Button(((1-0.7)*W)/2 + W * 0.05, H / 2 - (H * 0.3) / 2, 260, 102, "Easy");
    mediumButton = new Button(W / 2 - (260/2), H / 2 - (H * 0.3) / 2, 260, 102, "Medium");
    hardButton = new Button(((1-0.7)*W)/2+0.7*W - 260 - (W * 0.05), H / 2 - (H * 0.3) / 2, 260, 102, "Hard");

    retryButton = new Button(W/2 - (210/2), BOARD_Y + 7 * CELL + 70, 210, 90, "Retry");
}

function drawStartScreen() {
    fill(0, 0, 0, 200);
    noStroke();
    rect(width / 2 - (width * 0.7) / 2, height / 2 - (height * 0.7) / 2, width * 0.7, height * 0.7, 20);

    easyButton.render();
    mediumButton.render();
    hardButton.render();
    fill(255);
    textSize(45);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("Select Bot Difficulty", width / 2, height / 4);
    textAlign(LEFT, BASELINE); // reset
    textStyle(NORMAL);
}
function buttonPressed() {
    if (!gameStarted) {
        if (easyButton.isHovered()) {
            botLevel = "easy";
        } else if (mediumButton.isHovered()) {
            botLevel = "medium";
        } else if (hardButton.isHovered()) {
            botLevel = "hard";
        } else {
            return false;
        }
        start();
        return true;
    }
    return false;
}
function retryButtonPressed() {
    if (main_state != "ongoing" && retryButton.isHovered()) {
        main_board = create_new_board();
        main_state = "ongoing";
        let whoStarts = Math.floor(Math.random() * 2);
        main_turn = whoStarts == 0 ? "R" : "B";
        selectedCell = -1;
        botThinking = false;
        confettiParticles = [];
        gameStarted = false;
        return true;
    }
    return false;
}