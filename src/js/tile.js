class Tile {
  constructor({ number, x, y }) {
    const tile = document.createElement("div");
    tile.className = "tile";

    if (number === 0) tile.classList.add("empty-tile");
    else {
      tile.innerHTML = number;
    }

    tile.style.left = `${x}px`;
    tile.style.top = `${y}px`;

    return tile;
  }
}
