const calculator = [
  ["1", "2", "3", "+"],
  ["4", "5", "6", "-"],
  ["7", "8", "9", "/"],
  ["0", "C", "=", "*"],
];
//Varianta 2
//const operators = [" + ", " - ", " * ", " / ", "=", "C"];
//let currentOperation = [];
//let calcInput = "";

let prevNumber = "";
let currentNumber = "";
let operator;

export class Grid {
  constructor(options) {
    this.rootId = options.rootId;
    this.noOfRows = 4;
    this.noOfCells = 4;
    this.rowClass = options.rowClass;
    this.cellClass = options.cellClass;
    this.gridContainer = document.getElementById(this.rootId);
    this.cells = [];
  }

  init() {
    this.draw();
  }

  draw() {
    for (let i = 0; i < this.noOfRows; i++) {
      const row = document.createElement("div");
      row.classList.add(this.rowClass);
      this.addCellsToRow(row, calculator[i]);
      this.gridContainer.append(row);
    }
  }

  toggleCellState(cell) {
    const action = cell.textContent;
    const isNumber = !isNaN(parseFloat(action));
    if (isNumber) {
      this.addNumber(action);
    } else {
      switch (action) {
        case "C":
          this.reset();
          break;
        case "+":
        case "-":
        case "*":
        case "/":
          this.addOperator(action);
          break;
        case "=":
          this.calculate();
          break;
      }
    }
    this.updateCalcDisplay();
  }

  addNumber(number) {
    currentNumber += number.toString();
  }

  calculate() {
    let result = 0;
    const { prev, current } = this.getFloat();
    switch (operator) {
      case "+":
        result = prev + current;
        break;
      case "-":
        result = prev - current;
        break;
      case "*":
        result = prev * current;
        break;
      case "/":
        result = prev / current;
        break;
    }
    currentNumber = result;
    prevNumber = "";
    operator = undefined;
  }

  addOperator(op) {
    if (currentNumber !== "") {
      if (prevNumber !== "") {
        this.calculate();
      }
      prevNumber = currentNumber;
      currentNumber = "";
    }
    operator = op;
  }

  getFloat() {
    return {
      prev: parseFloat(prevNumber),
      current: parseFloat(currentNumber),
    };
  }

  updateCalcDisplay() {
    console.log(prevNumber, operator, currentNumber);
    let { prev, current } = this.getFloat();
    const display = document.getElementById("display");
    if (isNaN(prev)) {
      prev = "";
    }
    if (isNaN(current)) {
      current = "";
    }
    if (current === "" && prev === "") {
      display.innerText = 0;
      return;
    }
    display.innerText = `${prev} ${operator || ""} ${current}`;
  }

  reset() {
    prevNumber = "";
    currentNumber = "";
    operator = undefined;
  }

  addCellsToRow(row, calculator) {
    for (let j = 0; j < this.noOfCells; j++) {
      const cell = document.createElement("div");
      cell.textContent = calculator[j];
      cell.classList.add(this.cellClass);
      cell.addEventListener("click", () => {
        this.toggleCellState(cell);
      });
      cell.addEventListener("mouseenter", () => {
        if (this.isMouseDown) this.toggleCellState(cell);
      });
      this.cells.push(cell);

      row.append(cell);
    }
  }
}
