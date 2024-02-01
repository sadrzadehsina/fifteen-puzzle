class Board {
  #numbers = [];
  #tiles = [];
  #target;
  #rows = 4;
  #columns = 4;

  constructor({ target, columns, rows }) {
    this.#target = target;
    this.#columns = columns;
    this.#rows = rows;
  }

  create() {
    this.#numbers = create2DArray({ columns: this.#columns, rows: this.#rows });
  }

  shuffle() {
    this.#numbers = shuffleArray({
      array: this.#numbers,
      columns: this.#columns,
      rows: this.#rows,
    });
  }

  render() {
    this.#numbers.forEach((columns, rowIndex) => {
      this.#tiles[rowIndex] = [];
      columns.forEach((number, columnIndex) => {
        const tile = new Tile({
          number,
          rowIndex,
          columnIndex,
        });
        this.#tiles[rowIndex].push(tile);

        const tileElement = tile.render();
        tileElement.addEventListener("click", () => this.#moveTile(tile));

        this.#target.appendChild(tileElement);
      });
    });
  }

  #moveTile(tile) {
    const { left, top, rowIndex, columnIndex, width, height } = tile;

    const number = this.#numbers[rowIndex][columnIndex];

    if (
      this.#numbers[rowIndex] &&
      this.#numbers[rowIndex][columnIndex - 1] === 0
    ) {
      this.#numbers[rowIndex][columnIndex] = 0;
      this.#numbers[rowIndex][columnIndex - 1] = number;

      this.#tiles[rowIndex][columnIndex] =
        this.#tiles[rowIndex][columnIndex - 1];

      console.log(left, width, left - width);

      tile.left = left - width;
      this.#tiles[rowIndex][columnIndex - 1].left = left;

      this.#tiles[rowIndex][columnIndex - 1] = tile;

      tile.rowIndex = rowIndex;
      tile.columnIndex = columnIndex - 1;
    }
    if (
      this.#numbers[rowIndex] &&
      this.#numbers[rowIndex][columnIndex + 1] === 0
    ) {
      this.#numbers[rowIndex][columnIndex] = 0;
      this.#numbers[rowIndex][columnIndex + 1] = number;

      this.#tiles[rowIndex][columnIndex] =
        this.#tiles[rowIndex][columnIndex + 1];

      console.log(left, width, left + width);
      tile.left = left + width;
      this.#tiles[rowIndex][columnIndex + 1].left = left;

      this.#tiles[rowIndex][columnIndex + 1] = tile;

      tile.rowIndex = rowIndex;
      tile.columnIndex = columnIndex + 1;
    }
    if (
      this.#numbers[rowIndex - 1] &&
      this.#numbers[rowIndex - 1][columnIndex] === 0
    ) {
      this.#numbers[rowIndex][columnIndex] = 0;
      this.#numbers[rowIndex - 1][columnIndex] = number;

      this.#tiles[rowIndex][columnIndex] =
        this.#tiles[rowIndex - 1][columnIndex];

      console.log(top, height, top - height);
      tile.top = top - height;
      this.#tiles[rowIndex - 1][columnIndex].top = top;

      this.#tiles[rowIndex - 1][columnIndex] = tile;

      tile.rowIndex = rowIndex - 1;
      tile.columnIndex = columnIndex;
    }
    if (
      this.#numbers[rowIndex + 1] &&
      this.#numbers[rowIndex + 1][columnIndex] === 0
    ) {
      this.#numbers[rowIndex][columnIndex] = 0;
      this.#numbers[rowIndex + 1][columnIndex] = number;

      this.#tiles[rowIndex][columnIndex] =
        this.#tiles[rowIndex + 1][columnIndex];

      console.log(top, height, top + height);
      tile.top = top + height;
      this.#tiles[rowIndex + 1][columnIndex].top = top;

      this.#tiles[rowIndex + 1][columnIndex] = tile;

      tile.rowIndex = rowIndex + 1;
      tile.columnIndex = columnIndex;
    }
  }
}
