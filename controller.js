"use strict";
import Model from "./model.js";
import View from "./view.js";

class Controller {
  constructor() {
    this.boardHeight = 6;
    this.boardWidth = 7;
    this.model = new Model(this.boardHeight, this.boardWidth);
    this.view = new View(this);
  }

  setupBoard() {
    console.log("Controller be running!");
    this.view.makeBoardClick();
    this.view.boardViewSetup(this.boardHeight, this.boardWidth);
    this.model.checkWinner();
  }
}

let controller = new Controller();
window.addEventListener("load", () => controller.setupBoard());
