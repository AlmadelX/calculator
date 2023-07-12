function setupListeners() {
  // Setup functional buttons
  const functionalButtons = document.querySelectorAll(".functional");
  functionalButtons.forEach(button => button.addEventListener("click", () => handleFunction(button.textContent)));

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

function handleDigit(digit) {
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

let input = "";

const display = document.querySelector(".display p");

setupListeners();
