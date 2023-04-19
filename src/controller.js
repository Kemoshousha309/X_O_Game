import { model } from "./model";
import { controlPanel, dom, gameBoard } from "./view";

export const controller = {
  
  init () {
    gameBoard.init();
    controlPanel.init();
  },

  changeTurn() {
    let { turnLetter, playerName, playerNames } = this.getState();
    this.setState({
      turnLetter: turnLetter === "x" ? "o" : "x",
      playerName: playerName === playerNames[0] ? playerNames[1] : playerNames[0]
    })
  },


  checkCase() {
    // check the win scenarios
    let { winScenarios } = this.getState();
    for (let i = 0; i < winScenarios.length; i++) {
      const scenario = winScenarios[i];
      if (this.isMatch(scenario)) {
        return [true, i + 1];
      }
      
    }
    return [false, undefined];
  },

  isMatch(scenario) {
    const boxes = Array.from(dom.boxes.children)
    const boxesValues = [
      boxes[scenario[0]].innerHTML,
      boxes[scenario[1]].innerHTML,
      boxes[scenario[2]].innerHTML,
    ];
    if (!boxesValues[0]) return false;
    let matched = true;
    boxesValues.reduce((prevValue, currentValue) => {
      matched = matched && currentValue === prevValue;
      return prevValue;
    }, boxesValues[0]);
    return matched;
  },

  isClosedCase() {
    const boxes = Array.from(dom.boxes.children);
    let closed = true;
    boxes.forEach(box => {
      closed = closed && !!(box.innerHTML);
    })
    return closed;
  },

  // getters and setters
  getState() {
    return model.state;
  },

  setState(modifiedFields) {
    model.state = {
      // simple clone to prevent mutating data
      ...model.state,
      ...modifiedFields,
    };
  },
};


controller.init()