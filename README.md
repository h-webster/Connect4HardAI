# Connect 4 – Very Hard AI

**By: Wonkanese**

A browser-based Connect 4 game built with [p5.js](https://p5js.org/), featuring a single-player mode against a minimax AI opponent.
One of the favorite things I've made as it's a project I always like to come back to play, however, I've never spent much time improving the actual code.

---

## How to Play

- You play as either **Red** or **Blue**
- The board has **7 columns** (numbered 1–7)
- Press a number key **1–7** to drop your piece into that column
- The first player to connect **4 in a row** (horizontally, vertically, or diagonally) wins
- If the board fills up with no winner, the game ends in a **Tie**

---

## Features

- **Minimax AI** — the AI looks several moves ahead to find the best possible move
- **Depth-adjusted scoring** — the AI prefers faster wins and delays losses as long as possible
- **Randomized tiebreaking** — when multiple moves score equally, the AI picks randomly to add variety
- **Win detection** — checks for horizontal, vertical, and both diagonal directions
- **Live status display** — shows whose turn it is, and announces the winner or a tie

---

## AI – How It Works

The AI uses the **Minimax algorithm**, a classic game tree search technique:

1. It simulates all possible future moves up to a set depth
2. It scores terminal states: **+10 for a Blue win**, **-10 for a Red win**, **0 for a tie**
3. Scores are adjusted by depth — a win in fewer moves scores higher, a loss in more moves scores less negative (so the AI delays losses)
4. It picks the move with the best score

### Planned Improvement: Alpha-Beta Pruning

Currently the AI explores every possible branch of the game tree, which becomes expensive at higher depths. **Alpha-beta pruning** will be added to skip branches that cannot possibly affect the final decision — making the search significantly faster without changing the result.

This will allow the AI to:
- Search **deeper** in the same amount of time
- Avoid triggering browser infinite-loop warnings caused by heavy recursion
- Play stronger moves overall

---

## Project Structure

```
sketch.js       # All game logic, rendering, and AI
```

The entire project is a single p5.js sketch. No build tools or dependencies required beyond p5.js.

---

## Running the Game

1. Go to [editor.p5js.org](https://editor.p5js.org/) or set up a local p5.js project
2. Paste the contents of `sketch.js`
3. Press **Play** — use number keys 1–7 to make your move

---

## Known Limitations

- No restart button yet — refresh the page to play again
- No difficulty settings — the AI always plays at maximum strength
- Poor visuals
