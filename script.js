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
      result = operand;
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
  // Start a new calculation series
  if (currentOperation === "=") {
    result = 0;
  }

  // Check for input edge cases
  if (
    isInputMax() || 
    (digit === "0" && isInputNull()) ||
    (digit === "." && input.includes("."))
  ) {
    return;
  }

  // If input represents 0 then add explicitly
  if (digit === "." && isInputNull()) {
    input += "0";
  }

  // Update input
  input += digit;
  displayInput();
}

function displayResult() {
  console.log(result);
  display.textContent = result;
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

function isInputMax() {
  return input && ((input[0] === "-" && input.length === MAX_DIGITS + 1) || (input[0] !== "-" && input.length === MAX_DIGITS));
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
