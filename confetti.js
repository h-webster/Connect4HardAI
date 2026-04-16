let confettiParticles = [];
const CONFETTI_COLORS = [
    [220, 75, 75],                                                                       
    [255, 140, 140],                                                                     
    [255, 200, 80],                                                                      
    [255, 255, 120],                                                                     
    [100, 200, 255],                                                                     
    [180, 100, 255],                                                                     
    [100, 255, 180],     
];

function launchConfetti() {
    confettiParticles = [];
    for (let i = 0; i < 160; i++) {
        let c = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
        confettiParticles.push({
            x: Math.random() * W,
            y: Math.random() * -H,
            vx: (Math.random() - 0.5) * 3,
            vy: Math.random() * 3 + 2,
            rot: Math.random() * Math.PI * 2,
            w: Math.random() * 10 + 6,
            h: Math.random() * 5 + 3,
            color: c,
            alpha: 255
        });
    }
}

function drawConfetti() {
    if (confettiParticles.length === 0) return;
    let allGone = true;
    for (let p of confettiParticles) {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05;
        p.rot += p.rotSpeed;
        if (p.y > H + 20) {
            p.alpha -= 8;
        }
        if (p.alpha > 0) {
            allGone = false;
            push();
            translate(p.x, p.y);
            rotate(p.rot);
            noStroke();
            fill(p.color[0], p.color[1], p.color[2], p.alpha);
            rect(-p.w / 2, -p.h / 2, p.w, p.h, 2); 
            pop();
        }
    }
    if (allGone) confettiParticles = [];
}