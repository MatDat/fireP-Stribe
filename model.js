export default class Model {
  constructor(boardHeight = 6, boardWidth = 7) {
    this.boardHeight = boardHeight;
    this.boardWidth = boardWidth;
    this.board = this.createBoard();
    this.currentPlayer = 1;
    this.gameActive = true;
  }

  createBoard() {
    let board = [];
    for (let row = 0; row < this.boardHeight; row++) {
      board[row] = new Array(this.boardWidth).fill(0);
    }
    return board;
  }

  makeMove(col) {
    if (!this.gameActive) return { success: false };
    for (let row = this.boardHeight - 1; row >= 0; row--) {
      if (this.board[row][col] === 0) {
        this.board[row][col] = this.currentPlayer;
        this.switchPlayer();
        if (this.currentPlayer === 2) {
          setTimeout(() => this.computerMove(), 0); // Vent kort for at simulere computerens "tænketid"
        }
        return { success: true, row: row, col: col };
      }
    }
    return { success: false };
  }

  switchPlayer() {
    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
  }

  //  FIXME:
  computerMove() {
    if (!this.gameActive || this.currentPlayer !== 2) return;

    let moveMade = false;
    while (!moveMade) {
      let randomCol = Math.floor(Math.random() * this.boardWidth);
      for (let row = this.boardHeight - 1; row >= 0 && !moveMade; row--) {
        if (this.board[row][randomCol] === 0) {
          this.board[row][randomCol] = this.currentPlayer;
          moveMade = true;
          this.checkWinner(); // Tjek for vinder efter computerens træk
          this.switchPlayer(); // Skifter spiller efter computerens træk
        }
      }
    }
  }

  //TODO:
  checkWinner() {
    let winner = null;
    // Check horizontal
    for (let i = 0; i < this.boardHeight; i++) {
      for (let j = 0; j < this.boardWidth - 3; j++) {
        if (
          this.board[i][j] > 0 &&
          this.board[i][j] === this.board[i][j + 1] &&
          this.board[i][j] === this.board[i][j + 2] &&
          this.board[i][j] === this.board[i][j + 3]
        ) {
          return this.board[i][j];
        }
      }
    }

    // Check vertical
    for (let i = 0; i < this.boardWidth; i++) {
      for (let j = 0; j < this.boardHeight - 3; j++) {
        if (
          this.board[j][i] > 0 &&
          this.board[j][i] === this.board[j + 1][i] &&
          this.board[j][i] === this.board[j + 2][i] &&
          this.board[j][i] === this.board[j + 3][i]
        ) {
          return this.board[j][i]; // Returnerer spilleren, der vandt
        }
      }
    }
    if (winner) {
      this.gameActive = false;
      this.controller.view.displayWinner(winner);
    }
  }
}
