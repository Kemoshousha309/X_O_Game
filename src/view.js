import { controller } from "./controller";

export const dom = {
    gameBoard: document.querySelector(".game-board"),
    playerName: document.querySelector("#player-name"),
    result: document.querySelector(".result"),
    gameTurn: document.querySelector(".game-turn"),
    controls: document.querySelector(".controls"),
    backdrop: document.querySelector(".backdrop"),
    playBtn: document.querySelector("#play"),
    controlsClick: document.querySelector("#click"),
    lines: document.querySelectorAll(".line"),
    boxes: document.querySelector(".boxes")
}

export const controlPanel = {
  init() {
    // listeners
    dom.controlsClick.addEventListener("click", () => {
      const {mode} = controller.getState();
      if (mode === "START") return;
      this.toggle();
    });
    
    dom.playBtn.addEventListener("click", (e) => {
      const {playerName} = controller.getState();
      const player1 = document.querySelector("#player1").value;
      const player2 = document.querySelector("#player2").value;
      if (player1 && player2) {
        e.preventDefault();
        controller.setState({
          playerNames: [player1, player2],
          playerName: player1,
          mode: "PLAYING"
        });
        this.toggle();
        dom.playerName.innerHTML = playerName;
        this.reset();
      }
    });
  },
  toggle() {
    const {controls} = controller.getState();
    let translateValue = "-200px";
    let backdropDisplay = "none";
    if (controls) {
      translateValue = "200px";
      backdropDisplay = "block";
    }
    dom.controls.style.transform = `translate(-50%, ${translateValue})`;
    dom.backdrop.style.display = backdropDisplay;
    controller.setState({
      controls: !controls
    });
  },
  reset() {
    const {playerName} = controller.getState();
    // empty all the boxes
    const boxes = Array.from(dom.boxes.children)
    boxes.forEach((box) => {
      box.innerHTML = "";
    });
    // update the player name
    dom.playerName.innerHTML = playerName;
    dom.gameTurn.style.display = "block";
    dom.result.innerHTML = "";
    dom.lines.forEach((line) => {
      line.style.display = "none";
    });
  }

}

export const gameBoard = {
  init() {
    dom.gameBoard.addEventListener("click", (event) => {
      const {mode, turnLetter} = controller.getState()
      const clickedBox = event.target;
      if (clickedBox.innerHTML || mode === "END") return;
      clickedBox.innerHTML = turnLetter;
      const [isWin, matchNum] = controller.checkCase();
      if (isWin) {
        const {playerName} = controller.getState();
        dom.result.innerHTML = `${playerName} is The Winner `;
        dom.gameTurn.style.display = "none";
        controller.setState({
          mode: "END"
        })
        this.markMatch(matchNum);
      }
      console.log(controller.isClosedCase())
      if(controller.isClosedCase()) {
        console.log("closed")
      }
      controller.changeTurn();
      const {playerName: updatedPlayerName} = controller.getState()
      dom.playerName.innerHTML = updatedPlayerName;
    });
  },
  markMatch (matchNum) {
    const line = document.querySelector(`#line${matchNum}`);
    line.style.display = "block";
  }
}