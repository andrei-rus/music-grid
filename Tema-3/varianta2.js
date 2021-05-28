// Varianta 2
// Vine adaugat in toggleCellState(cell)
/*
    const cellContent = cell.textContent;
    const display = document.getElementById("display");

    if (operators.includes(cellContent)) {
      if (cellContent == "C") {
        display.textContent = calcInput = "0";
        currentOperation = [];
        return;
      }
      if (calcInput != "") {
        currentOperation.push(calcInput);
        calcInput = "";
      }

      if (cellContent == "=") {
        if (currentOperation.length < 3) {
          if (!operators.includes(currentOperation[0])) {
            display.textContent = calcInput = currentOperation[0];
          } else {
            currentOperation[1] != undefined
              ? (display.textContent = calcInput = currentOperation[1])
              : (display.textContent = "");
          }

          currentOperation = [];
        } else {
          this.calculate();
        }
        return;
      }

      if (operators.includes(currentOperation[currentOperation.length - 1])) {
        currentOperation[currentOperation.length - 1] = cellContent;
        display.textContent = currentOperation.toString().replace(/,/g, "");
        return;
      }

      if (currentOperation.length == 3) {
        this.calculate(cellContent, currentOperation);
        currentOperation.push(cellContent);
      } else {
        currentOperation.push(cellContent);
        display.textContent += cellContent;
      }
    } else {
      if (display.textContent == 0) {
        display.textContent = calcInput = cellContent;
      } else {
        display.textContent += cellContent;
        calcInput += cellContent;
      }
    }
*/
// ---------------------------------------

/*
  calculate(cellContent = "") {
    try {
      let result = Function(
        `"use strict"; return ${parseFloat(currentOperation[0])} ${
          currentOperation[1]
        } ${parseFloat(currentOperation[2])}`
      )();

      display.textContent = result + cellContent;
      currentOperation = [];
      currentOperation.push(result);
    } catch (e) {
      display.textContent = "0";

      currentOperation = [];
    }
  }
*/
