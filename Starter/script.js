// Theme
const themeElement = document.querySelector(".themes__toggle");

const toggleDarkTheme = () => {
  themeElement.classList.toggle("themes__toggle--isActive");
};
const toggleDarkThemeWithEnter = (event) => {
  event.key === "Enter" && toggleDarkTheme();
};
themeElement.addEventListener("keydown", toggleDarkThemeWithEnter);
themeElement.addEventListener("click", toggleDarkTheme);

const resultElement = document.querySelector(".calc__result");
const keyElements = document.querySelectorAll("[data-type]");
let currentNumber = "";
let storedNumber = "";
let operation = "";
const updateUi = (value) => {
  resultElement.innerHTML = !value ? "0" : value;
};

const numberButtonHandler = (value) => {
  if (value === "." && currentNumber.includes(".")) return;
  if (value === "0" && !currentNumber) return;
  if (currentNumber === "" && value === ".") {
    currentNumber = "0" + ".";
  } else currentNumber += value;
  updateUi(currentNumber);
};
const resetButtonHandler = () => {
  currentNumber = "";
  storedNumber = "";
  operation = "";
  updateUi(currentNumber);
};
const deleteButtonHandler = () => {
  if (!currentNumber || currentNumber === "0") return;
  if (currentNumber.length === 1) {
    currentNumber = "";
  } else {
    currentNumber = currentNumber.substring(0, currentNumber.length - 1);
  }
  updateUi(currentNumber);
};

const operationButtonHandler = (operationValue) => {
  if (!currentNumber && !storedNumber) return;
  if (!storedNumber && currentNumber) {
    storedNumber = currentNumber;
    currentNumber = "";
    operation = operationValue;
  } else if (storedNumber) {
    if (currentNumber) executeOperation();
    operation = operationValue;
  }
  console.log("storedNumber", storedNumber);
  console.log("currentNumber", currentNumber);
  console.log("operationValue", operation);
};

const executeOperation = () => {
  switch (operation) {
    case "+":
      storedNumber = parseFloat(storedNumber) + parseFloat(currentNumber);
      break;
    case "-":
      storedNumber = parseFloat(storedNumber) - parseFloat(currentNumber);
      break;
    case "*":
      storedNumber = parseFloat(storedNumber) * parseFloat(currentNumber);
      break;
    case "/":
      storedNumber = parseFloat(storedNumber) / parseFloat(currentNumber);
      break;
  }
  currentNumber = "";
  updateUi(storedNumber);
};
const keyElementsHandler = (element) => {
  element.addEventListener("click", () => {
    const type = element.dataset.type;
    const value = element.dataset.value;
    if (type === "number") numberButtonHandler(value);
    else if (type === "operation") {
      switch (value) {
        case "c":
          resetButtonHandler();
          break;
        case "Backspace":
          deleteButtonHandler();
          break;
        case "Enter":
          executeOperation();
          break;
        default:
          operationButtonHandler(value);
      }
    }
  });
};

keyElements.forEach(keyElementsHandler);
