function create2DArray({ rows, columns }) {
  return Array.from({ length: rows }, (_, rowIndex) => {
    return Array.from(
      { length: columns },
      (_, columnIndex) => rowIndex * rows + columnIndex
    );
  });
}

function shuffleArray({ array, rows, columns }) {
  // copy on write
  const newArray = array;

  for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
    for (let columnIndex = 0; columnIndex < columns; columnIndex++) {
      const i = Math.floor(Math.random() * rows);
      const j = Math.floor(Math.random() * columns);

      const temp = newArray[rowIndex][columnIndex];
      newArray[rowIndex][columnIndex] = newArray[i][j];

      newArray[i][j] = temp;
    }
  }

  return newArray;
}

// Thanks to https://www.geeksforgeeks.org/check-instance-15-puzzle-solvable/amp/
function isBoardSolvable({ board, rows }) {
  const N = rows;

  function getInvCount(arr) {
    let inv_count = 0;
    for (let i = 0; i < N * N - 1; i++) {
      for (let j = i + 1; j < N * N; j++) {
        if (arr[j] && arr[i] && arr[i] > arr[j]) inv_count++;
      }
    }

    return inv_count;
  }

  function findXPosition(puzzle) {
    for (let i = N - 1; i >= 0; i--) {
      for (let j = N - 1; j >= 0; j--) {
        if (puzzle[i][j] == 0) return N - i;
      }
    }
  }

  function isSolvable(puzzle) {
    let invCount = getInvCount(puzzle.flat());

    if (N & 1) return !(invCount & 1);
    else {
      let pos = findXPosition(puzzle);

      if ((pos & 1) === 0) {
        return (invCount & 1) !== 0;
      } else {
        return (invCount & 1) === 0;
      }
    }
  }

  return isSolvable(board);
}
