export default class View {
  constructor(controller) {
    this.controller = controller;
    this.view = this.boardViewSetup;
  }

  boardViewSetup(boardHeight, boardWidth) {
    console.log("View be running!");
    let boardContainer = document.querySelector("#gameBoardContainer");
    boardContainer.innerHTML = "";

    boardContainer.style.setProperty("--boardHeight", boardHeight);
    boardContainer.style.setProperty("--boardWidth", boardWidth);

    for (let i = 0; i < boardHeight; i++) {
      for (let j = 0; j < boardWidth; j++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.setAttribute("data-row", i);
        cell.setAttribute("data-col", j);
        boardContainer.appendChild(cell);
      }
    }
    this.displayPlayerTurn();
  }

  makeBoardClick() {
    document
      .querySelector("#gameBoardContainer")
      .addEventListener("click", this.clickHandler.bind(this));
  }

  clickHandler(event) {
    if (!this.controller.model.gameActive) return; // Forhindrer handling, hvis spillet er slut

    const cell = event.target;
    if (!cell.classList.contains("cell")) return; // Sikrer, at vi klikker på en celle
    const col = parseInt(cell.dataset.col, 10);

    // Kalder makeMove med kolonnen og tjekker for den nederste ledige celle
    const moveResult = this.controller.model.makeMove(col);
    if (moveResult.success) {
      // Finder den specifikke celle baseret på returværdierne
      const row = moveResult.row;
      const targetCell = document.querySelector(
        `.cell[data-row="${row}"][data-col="${col}"]`
      );
      // Her behøver du ikke at skifte spilleren tilbage, da makeMove allerede har skiftet spiller
      targetCell.style.backgroundColor =
        this.controller.model.currentPlayer === 1 ? "red" : "green"; // Opdaterer for den nuværende spiller før skiftet

      // Umiddelbart efter at trækket er lavet og brættet er opdateret, tjek for en vinder
      const winner = this.controller.model.checkWinner();
      if (winner) {
        this.displayWinner(winner);
      } else {
        // Kun opdater spillerens tur, hvis der ikke er fundet en vinder
        this.displayPlayerTurn();
      }
    }
  }

  displayPlayerTurn() {
    document.querySelector("#winnerDisplayContainer").classList.add("hide");
    console.log(
      `Updating player turn display: player-${this.controller.model.currentPlayer}`
    );
    const displayPlayerTurnBox = document.querySelector(
      "#displayPlayerTurnBox"
    );
    const playerTurnText = `Player ${this.controller.model.currentPlayer}'s Turn`;
    displayPlayerTurnBox.textContent = playerTurnText;
  }

  displayWinner(winner) {
    let winnerDisplayContainer = document.querySelector(
      "#winnerDisplayContainer"
    );
    let displayPlayerTurnContainer = document.querySelector(
      "#displayPlayerTurnBox"
    );
    displayPlayerTurnContainer.classList.add("hide");
    let message = `Player ${winner} won the game!`;
    winnerDisplayContainer.textContent = message;
    winnerDisplayContainer.classList.remove("hide");
  }
}
