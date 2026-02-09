export const getBoardFromDOM = () => {
  const board = [];

  for (let i = 0; i < 9; i++) {
    board[i] = [];
    for (let j = 0; j < 9; j++) {
      board[i][j] = 0;
    }
  }

  const inputs = document.querySelectorAll("#grid input");
  inputs.forEach((input) => {
    const row = parseInt(input.dataset.row);
    const col = parseInt(input.dataset.col);
    const value = input.value ? parseInt(input.value) : 0;
    board[row][col] = value;
  });

  return board;
};

export const findEmptyCell = (board) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        return { row, col };
      }
    }
  }
  return null;
};

export const isValid = (board, row, col, num) => {
  for (let i = 0; i < 9; i++) {
    if (board[row][i] === num) {
      return false;
    }
  }

  for (let i = 0; i < 9; i++) {
    if (board[i][col] === num) {
      return false;
    }
  }

  const startRow = Math.floor(row / 3) * 3;
  const startCol = Math.floor(col / 3) * 3;

  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === num) {
        return false;
      }
    }
  }

  return true;
};

export const solveSudoku = (board) => {
  const emptyCell = findEmptyCell(board);

  if (emptyCell === null) {
    return true;
  }

  const { row, col } = emptyCell;

  for (let num = 1; num <= 9; num++) {
    if (isValid(board, row, col, num)) {
      board[row][col] = num;

      if (solveSudoku(board)) {
        return true;
      }

      board[row][col] = 0;
    }
  }

  return false;
};

export const hasError = (board) => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const num = board[row][col];

      if (num === 0) continue;

      board[row][col] = 0;

      if (!isValid(board, row, col, num)) {
        board[row][col] = num;
        return true;
      }

      board[row][col] = num;
    }
  }

  return false;
};
