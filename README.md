# Connect 4 – Very Hard AI

**By: Wonkanese**

A browser-based Connect 4 game built with [p5.js](https://p5js.org/), featuring a highly competitive single-player mode driven by an optimized minimax AI that bases its moves 7 moves in advance.

---

## How to Play

- **Objective:** Connect **4 in a row** (horizontally, vertically, or diagonally) before the AI does.
- **Controls:** Press number keys **1–7** to drop your piece into the corresponding column.
- **Players:** You play as **Red**, the AI plays as **Blue**.
- **Game End:** If the board fills up with no winner, the game results in a **Tie**.

---

## Features

- **Alpha-Beta Pruning:** Optimized search algorithm that skips unnecessary branches, allowing for deeper look-ahead and faster decision-making.
- **Depth-Adjusted Scoring:** The AI prefers faster wins and will fight to delay losses as long as possible.
- **Randomized Tiebreaking:** When multiple moves are mathematically equal, the AI picks randomly to keep gameplay varied.
- **Win Detection:** Efficient checks for all four winning axes.
- **Live Status Display:** Real-time feedback on whose turn it is and game results.

---

## AI – How It Works

The AI uses the **Minimax algorithm** enhanced with **Alpha-Beta Pruning**:

1. **Simulation:** It explores the game tree to a set depth, simulating potential moves for both players.
2. **Pruning:** By maintaining two values, *alpha* and *beta*, the AI stops evaluating a move as soon as it proves to be worse than a previously examined option. This significantly reduces the number of states checked without changing the final result.
3. **Scoring:** Terminal states are scored: **+10 for Blue**, **-10 for Red**, and **0 for Tie**. 
4. **Efficiency:** With Alpha-Beta pruning, the AI can search significantly deeper than standard Minimax, making it much harder to beat while avoiding browser performance issues.

---

## Project Structure

```text
sketch.js      # All game logic, rendering
bot.js         # Alpha-Beta AI
