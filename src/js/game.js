class Game {
  constructor({ boardTarget, board }) {
    this.boardTarget = boardTarget;
    this.board = new Board(board);
  }

  start() {
    this.board.create();
    this.board.shuffle();

    this.board
      .toTiles()
      .flat()
      .map((tile) => this.boardTarget.appendChild(tile));
  }

  render() {}
}
