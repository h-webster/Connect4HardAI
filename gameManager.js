let hovered = false;
function drawStartScreen() {
    fill(0, 0, 0, 160);
    noStroke();
    rect(0, height / 2 - (height/8), width, height/4, 20);
    let btnW = 160, btnH = 52;
    let btnX = width / 2 - btnW / 2;
    let btnY = height / 2 - btnH / 2;

    hovered = mouseX > btnX && mouseX < btnX + btnW && mouseY > btnY && mouseY < btnY + btnH;
    fill(hovered ? color(70, 120, 240) : color(48, 90, 200));
    rect(btnX, btnY, btnW, btnH, 10);

    fill(255);
    textSize(22);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text("Start", width / 2, height / 2);
    textAlign(LEFT, BASELINE); // reset
    textStyle(NORMAL);
}
function startButtonPressed() {
    if (!gameStarted) {
        if (hovered) {
            start();
        }
    }
}