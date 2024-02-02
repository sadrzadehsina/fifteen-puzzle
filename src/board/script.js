class Board extends EventTarget {
  #numbers = [];
  #tiles = [];
  #target;
  #moves;
  #rows = 4;
  #columns = 4;
  #movesCount = 0;

  constructor({ target, moves, columns, rows }) {
    super();
    this.#target = target;
    this.#moves = moves;
    this.#columns = columns;
    this.#rows = rows;
  }

  create() {
    this.#numbers = create2DArray({ columns: this.#columns, rows: this.#rows });
  }

  shuffle() {
    this.#movesCount = 0;
    this.#moves.innerHTML = this.#movesCount;
    this.#numbers = shuffleArray({
      array: this.#numbers,
      columns: this.#columns,
      rows: this.#rows,
    });
  }

  render() {
    this.#target.innerHTML = "";
    this.#numbers.forEach((columns, rowIndex) => {
      this.#tiles[rowIndex] = [];
      columns.forEach((number, columnIndex) => {
        const tile = new Tile({
          number,
          rowIndex,
          columnIndex,
        });
        this.#tiles[rowIndex].push(tile);

        tile.render();

        tile.element.addEventListener("click", () => {
          this.#moveTile(tile);
        });

        this.#target.appendChild(tile.element);
      });
    });
  }

  #checkSolved() {
    let solved = true;
    this.#numbers
      .flat()
      .slice(0, -1)
      .forEach((number, index) => {
        if (number !== index + 1) solved = false;
      });

    if (solved) {
      // remove all event listeners, wait for the tile animation to complete
      setTimeout(() => {
        this.#tiles.flat().forEach((tile) => {
          tile.element.classList.add("solved");
          tile.element.replaceWith(tile.element.cloneNode(true));
        });
      }, 200);

      // let game object know that board is solved
      this.dispatchEvent(new Event("solved"));
    }
  }

  #checkLeft({ rowIndex, columnIndex }) {
    return (
      this.#numbers[rowIndex] && this.#numbers[rowIndex][columnIndex - 1] === 0
    );
  }

  #checkRight({ rowIndex, columnIndex }) {
    return (
      this.#numbers[rowIndex] && this.#numbers[rowIndex][columnIndex + 1] === 0
    );
  }

  #checkTop({ rowIndex, columnIndex }) {
    return (
      this.#numbers[rowIndex - 1] &&
      this.#numbers[rowIndex - 1][columnIndex] === 0
    );
  }

  #checkBottom({ rowIndex, columnIndex }) {
    return (
      this.#numbers[rowIndex + 1] &&
      this.#numbers[rowIndex + 1][columnIndex] === 0
    );
  }

  #moveTile(tile) {
    const { left, top, rowIndex, columnIndex, width, height } = tile;

    const number = this.#numbers[rowIndex][columnIndex];

    if (this.#checkLeft({ rowIndex, columnIndex })) {
      this.#numbers[rowIndex][columnIndex] = 0;
      this.#numbers[rowIndex][columnIndex - 1] = number;

      this.#tiles[rowIndex][columnIndex] =
        this.#tiles[rowIndex][columnIndex - 1];

      tile.left = left - width;
      this.#tiles[rowIndex][columnIndex - 1].left = left;

      this.#tiles[rowIndex][columnIndex - 1] = tile;

      tile.rowIndex = rowIndex;
      tile.columnIndex = columnIndex - 1;

      this.#movesCount++;
    }
    if (this.#checkRight({ rowIndex, columnIndex })) {
      this.#numbers[rowIndex][columnIndex] = 0;
      this.#numbers[rowIndex][columnIndex + 1] = number;

      this.#tiles[rowIndex][columnIndex] =
        this.#tiles[rowIndex][columnIndex + 1];

      tile.left = left + width;
      this.#tiles[rowIndex][columnIndex + 1].left = left;

      this.#tiles[rowIndex][columnIndex + 1] = tile;

      tile.rowIndex = rowIndex;
      tile.columnIndex = columnIndex + 1;

      this.#movesCount++;
    }
    if (this.#checkTop({ rowIndex, columnIndex })) {
      this.#numbers[rowIndex][columnIndex] = 0;
      this.#numbers[rowIndex - 1][columnIndex] = number;

      this.#tiles[rowIndex][columnIndex] =
        this.#tiles[rowIndex - 1][columnIndex];

      tile.top = top - height;
      this.#tiles[rowIndex - 1][columnIndex].top = top;

      this.#tiles[rowIndex - 1][columnIndex] = tile;

      tile.rowIndex = rowIndex - 1;
      tile.columnIndex = columnIndex;

      this.#movesCount++;
    }
    if (this.#checkBottom({ rowIndex, columnIndex })) {
      this.#numbers[rowIndex][columnIndex] = 0;
      this.#numbers[rowIndex + 1][columnIndex] = number;

      this.#tiles[rowIndex][columnIndex] =
        this.#tiles[rowIndex + 1][columnIndex];

      tile.top = top + height;
      this.#tiles[rowIndex + 1][columnIndex].top = top;

      this.#tiles[rowIndex + 1][columnIndex] = tile;

      tile.rowIndex = rowIndex + 1;
      tile.columnIndex = columnIndex;

      this.#movesCount++;
    }

    this.#checkSolved();
    this.#moves.innerHTML = this.#movesCount;
  }

  get numbers() {
    return this.#numbers;
  }

  get rows() {
    return this.#rows;
  }
}
