class Game {
  #validStatus;

  constructor({ validStatus, shuffleButton, board }) {
    this.#validStatus = validStatus;

    this.board = new Board(board);

    this.board.addEventListener("solved", this.#win);

    shuffleButton.addEventListener("click", this.#shuffleBoard.bind(this));
  }

  start() {
    this.board.create();
    this.board.shuffle();
    this.board.render();

    this.#validStatus.innerHTML = isBoardSolvable({
      board: this.board.numbers,
      rows: this.board.rows,
    })
      ? "VALID"
      : "NOT VALID";
  }

  #shuffleBoard() {
    this.board.shuffle();
    this.board.render();

    this.#validStatus.innerHTML = isBoardSolvable({
      board: this.board.numbers,
      rows: this.board.rows,
    })
      ? "VALID"
      : "NOT VALID";
  }

  #win() {
    window.celebrate();
  }
}
