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
