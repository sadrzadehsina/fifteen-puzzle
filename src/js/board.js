class Board {
  constructor({ sizeX, sizeY }) {
    this.sizeX = sizeX;
    this.sizeY = sizeY;
  }

  create() {
    this.numbers = create2DArray({ sizeX: this.sizeX, sizeY: this.sizeY });
  }

  shuffle() {
    this.numbers = shuffleArray({
      array: this.numbers,
      sizeX: this.sizeX,
      sizeY: this.sizeY,
    });
  }

  toTiles() {
    return this.numbers.map((rows, rowIndex) => {
      return rows.map((columnValue, columnIndex) => {
        return new Tile({
          number: columnValue,
          x: 40 * columnIndex,
          y: 40 * rowIndex,
        });
      });
    });
  }
}
