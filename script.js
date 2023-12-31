// Executed on page load
function setupListeners() {
  // Setup functional buttons
  const functionalButtons = document.querySelectorAll(".functional");
  functionalButtons.forEach(button => button.addEventListener("click", () => handleFunction(button.textContent)));

  // Setup operation buttons
  const operationButtons = document.querySelectorAll(".operation");
  operationButtons.forEach(button => button.addEventListener("click", () => handleOperation(button.textContent)));

  // Setup digit buttons
  const digitButtons = document.querySelectorAll(".digit");
  digitButtons.forEach(button => button.addEventListener("click", () => handleDigit(button.textContent)));

  // Setup keyboard
  document.addEventListener('keydown', e => {
    e.preventDefault();
    if (e.key === "Backspace") {
      doBackspace();
    } else if (e.key === "Enter") {
      handleOperation("=");
    } else if (["=", "+", "-", "*", "/"].includes(e.key)) {
      handleOperation(e.key);
    } else if (!isNaN(parseInt(e.key))) {
      handleDigit(e.key);
    }
  });
}

function handleFunction(button) {
  switch(button) {
    case "AC":
      clear();
      break;
    case "->":
      doBackspace();
      break;
    case "+/-":
      changeSign();
  }
}

function clear() {
  result = 0;
  currentOperation = "=";
  input = "";
  displayInput();
}

function doBackspace() {
  // Acts as AC if no input
  if (!input) {
    clear();
    return;
  }

  // Handle edge case "[+-]0."
  if (input.slice(-2) === "0.") {
    input = input.slice(0, -2);
  } else {
    input = input.slice(0, -1);
  }

  displayInput();
}

function changeSign() {
  if (input[0] === "-") {
    // Delete the leading "-"
    input = input.slice(1);
  } else {
    input = "-" + input;
  }

  displayInput();
}

function handleOperation(operation) {
  // Calculate the previous operation and display the result
  const operand = isInputNull() ? 0 : parseFloat(input);
  switch (currentOperation) {
    case "=":
      if (input) {
        result = operand;
      }
      break;
    case "+":
      result += operand;
      break;
    case "-":
      result -= operand;
      break;
    case "*":
      result *= operand;
      break;
    case "/":
      result /= operand;
  }
  displayResult();

  // Set the new operation
  currentOperation = operation;
  // Clear the input
  input = "";
}

function handleDigit(digit) {
  // Check for input edge cases
  if (
    !fitsDisplay(input + digit) ||
    (digit === "0" && isInputNull()) ||
    (digit === "." && input.includes("."))
  ) {
    displayInput();
    return;
  }

  // If input represents 0 then add it explicitly
  if (digit === "." && isInputNull()) {
    input += "0";
  }

  // Update input
  input += digit;
  displayInput();
}

function displayInput() {
  if (!input) {
    display.textContent = "0";
  } else if (input === "-") {
    display.textContent = "-0";
  } else {
    display.textContent = input;
  }
}

function displayResult() {
  // Handle division by 0
  if (!isFinite(result) || isNaN(result)) {
    displayError();
    return;
  }

  const textResult = result.toString();
  if (fitsDisplay(textResult)) {
    display.textContent = textResult;
  } else if (textResult.includes(".")) {
    // Try to round a float to fit the display
    const spaceLeft = MAX_DIGITS - textResult.split(".")[0].length - 1;
    if (spaceLeft > 0) {
      display.textContent = result.toFixed(spaceLeft);
    } else {
      displayError();
    }
  } else {
    displayError();
  }
}

function displayError() {
  display.textContent = "ERROR";
  result = 0;
}

// Checks if a number fits a display
function fitsDisplay(number) {
  if (!number) {
    return true;
  }

  if (number[0] == "-") {
    return number.length <= MAX_DIGITS + 1;
  }
  return number.length <= MAX_DIGITS;
}

function isInputNull() {
  return !input || input === "-";
}

const MAX_DIGITS = 7;

// Global variables
let result = 0;
let currentOperation = "=";
let input = "";

const display = document.querySelector(".display p");

setupListeners();
