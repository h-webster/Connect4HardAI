class Button {
    constructor(x, y, width, height, txt) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.txt = txt;

        if (this.txt == "Easy") {
            this.baseColor  = color(50, 160, 80);
            this.hoverColor = color(70, 200, 105);
        } else if (this.txt == "Medium") {
            this.baseColor  = color(190, 135, 25);
            this.hoverColor = color(225, 170, 40);
        } else if (this.txt == "Hard") {
            this.baseColor  = color(190, 50, 50);
            this.hoverColor = color(225, 70, 70);
        } else {
            this.baseColor  = color(48, 90, 200);
            this.hoverColor = color(70, 120, 240);
        }
    }

    isHovered() {
        return mouseX > this.x && mouseX < this.x + this.width &&
               mouseY > this.y && mouseY < this.y + this.height;
    }

    render() {
        noStroke();
        fill(this.isHovered() ? this.hoverColor : this.baseColor);
        rect(this.x, this.y, this.width, this.height, 10);

        fill(255);
        textSize(25);
        textStyle(BOLD);
        textAlign(CENTER, CENTER);
        text(this.txt, this.x + this.width / 2, this.y + this.height / 2);
        textAlign(LEFT, BASELINE);
        textStyle(NORMAL);
    }

    isClicked() {
        return mouseIsPressed && this.isHovered();
    }
}
