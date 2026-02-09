import { getBoardFromDOM, solveSudoku, hasError } from "./game.js";

const grid = document.querySelector("#grid");

export const createGrid = () => {
  grid.innerHTML = "";

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement("div");
      cell.classList.add("cell");

      if ((col + 1) % 3 === 0 && col !== 8) {
        cell.classList.add("border-right");
      }
      if ((row + 1) % 3 === 0 && row !== 8) {
        cell.classList.add("border-bottom");
      }

      const input = document.createElement("input");
      input.type = "text";
      input.maxLength = 1;
      input.dataset.row = row;
      input.dataset.col = col;

      input.oninput = (e) => {
        if (!/^[1-9]$/.test(e.target.value)) {
          e.target.value = "";
        }
      };

      cell.appendChild(input);
      grid.appendChild(cell);
    }
  }
};

export const setupButtons = () => {
  const solveBtn = document.querySelector("#solveBtn");
  const clearBtn = document.querySelector("#clearBtn");

  solveBtn.addEventListener("click", handleSolve);
  clearBtn.addEventListener("click", handleClear);
};

const handleSolve = () => {
  const board = getBoardFromDOM();

  if (hasError(board)) {
    alert("Error!! Numeros repetidos en fila, columna o cuadrante");
    return;
  }

  if (solveSudoku(board)) {
    showSolution(board);
  } else {
    alert("😕 Este Sudoku no tiene solución válida.");
  }
};

const handleClear = () => {
  const inputs = document.querySelectorAll("#grid input");
  inputs.forEach((input) => (input.value = ""));
};

const showSolution = (board) => {
  const inputs = document.querySelectorAll("#grid input");

  inputs.forEach((input) => {
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);
    input.value = board[row][col];
  });
};
