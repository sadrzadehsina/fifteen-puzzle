function create2DArray({ sizeX, sizeY }) {
  return Array.from({ length: sizeX }, (_, rowIndex) => {
    return Array.from(
      { length: sizeY },
      (_, columnIndex) => rowIndex * sizeY + columnIndex
    );
  });
}

function shuffleArray({ array, sizeX, sizeY }) {
  // copy on write
  const newArray = array;

  for (let rowIndex = 0; rowIndex < sizeX; rowIndex++) {
    for (let columnIndex = 0; columnIndex < sizeY; columnIndex++) {
      const i = Math.floor(Math.random() * sizeX);
      const j = Math.floor(Math.random() * sizeY);

      const temp = newArray[rowIndex][columnIndex];
      newArray[rowIndex][columnIndex] = newArray[i][j];

      newArray[i][j] = temp;
    }
  }

  return newArray;
}
