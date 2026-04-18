// most of the bot logic is actually in worker.js

let aiWorker = new Worker("worker.js");
let botThinking = false;
let botLevel = "hard"; // easy, medium, hard

function ai_start() {
  if (botThinking) return;
  botThinking = true;
  aiWorker.postMessage({ board: main_board, AI_side: AI_side, level: botLevel }); // use worker to make bot moves on seperate thread
  aiWorker.onmessage = function(e) {
    botThinking = false;
    main_place(e.data.move + 1);
  };
}
