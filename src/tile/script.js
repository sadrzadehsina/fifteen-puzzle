class Tile {
  #tile = {};

  constructor({ number, rowIndex, columnIndex }) {
    this.#tile.width = parseInt(window.localStorage.getItem("tileWidth"));
    this.#tile.height = parseInt(window.localStorage.getItem("tileHeight"));
    this.#tile.top = rowIndex * (this.#tile.height + 16);
    this.#tile.left = columnIndex * (this.#tile.width + 16);
    this.#tile.rowIndex = rowIndex;
    this.#tile.columnIndex = columnIndex;

    this.#tile.classes = ["tile"];

    if (number === 0) this.#tile.classes.push("empty-tile");
    else {
      this.#tile.value = number;
    }
  }

  render() {
    const tile = document.createElement("div");
    tile.className = this.#tile.classes.join(" ");
    tile.innerHTML = this.#tile.value ?? "";

    tile.style.top = `${this.#tile.top}px`;
    tile.style.left = `${this.#tile.left}px`;

    tile.style.width = `${this.#tile.width}px`;
    tile.style.height = `${this.#tile.height}px`;

    this.#tile.element = tile;

    return tile;
  }

  get element() {
    return this.#tile.element;
  }

  get width() {
    return this.#tile.width + 16;
  }

  get height() {
    return this.#tile.height + 16;
  }

  get top() {
    return this.#tile.top;
  }
  set top(value) {
    this.#tile.top = value;
    this.#tile.element.style.top = `${value}px`;
  }

  get left() {
    return this.#tile.left;
  }
  set left(value) {
    this.#tile.left = value;
    this.#tile.element.style.left = `${value}px`;
  }

  get rowIndex() {
    return this.#tile.rowIndex;
  }
  set rowIndex(value) {
    this.#tile.rowIndex = value;
  }

  get columnIndex() {
    return this.#tile.columnIndex;
  }
  set columnIndex(value) {
    this.#tile.columnIndex = value;
  }
}
