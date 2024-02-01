class Game {
  constructor({ board }) {
    this.board = new Board(board);
  }

  start() {
    this.board.create();
    this.board.shuffle();
    this.board.render();
  }
}
