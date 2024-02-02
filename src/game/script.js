class Game {
  constructor({ board }) {
    this.board = new Board(board);

    this.board.addEventListener("solved", this.win);
  }

  start() {
    this.board.create();
    this.board.shuffle();
    this.board.render();
  }

  win() {
    window.celebrate();
  }
}
