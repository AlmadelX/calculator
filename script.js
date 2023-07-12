function setupListeners() {
  const digitButtons = document.querySelectorAll(".digit");
  digitButtons.forEach(button => button.addEventListener("click", () => handleDigit(button.textContent)));
}

function handleDigit(digit) {
  // Check for input edge cases
  if (
    input.length === MAX_DIGITS || 
    (digit === "0" && !input) ||
    (digit === "." && input.includes("."))
  ) {
    return;
  }

  if (digit === "." && !input) {
    input += "0";
  }

  // Update input and display
  input += digit;
  display.textContent = input;
}

const MAX_DIGITS = 7;

let input = "";

const display = document.querySelector(".display p");

setupListeners();
