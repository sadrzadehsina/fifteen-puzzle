(() => {
  // selectors
  const boardTarget = document.getElementById("board");
  // init game and start
  const game = new Game({
    boardTarget,
    board: {
      sizeX: 8,
      sizeY: 8,
    },
  });
  game.start();
})();
