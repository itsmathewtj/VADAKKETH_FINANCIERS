(function() {
  "use strict";

  const calculator = document.getElementById("emiCalculator");
  if (!calculator) return;

  const amountInput = document.getElementById("loanAmount");
  const goldWeightInput = document.getElementById("goldWeight");
  const amountOutput = document.getElementById("eligibleLoanAmount");
  const weightOutput = document.getElementById("pledgedGold");
  const toggleButtons = calculator.querySelectorAll(".gold-mode-toggle button");
  const goldRate = Number(calculator.dataset.goldRate) || 10550;
  let activeMode = "amount";

  function formatAmount(value) {
    return `\u20b9 ${Number(value || 0).toFixed(2)}`;
  }

  function formatWeight(value) {
    return `${Number(value || 0).toFixed(2)} Gm`;
  }

  function setMode(mode) {
    activeMode = mode;
    toggleButtons.forEach((button) => {
      button.classList.toggle("active", button.dataset.mode === mode);
    });
  }

  function calculateFromAmount() {
    const amount = Number(amountInput.value) || 0;
    const weight = amount > 0 ? amount / goldRate : 0;
    if (goldWeightInput.value !== "" || amount > 0) {
      goldWeightInput.value = amount > 0 ? weight.toFixed(2) : "";
    }
    amountOutput.textContent = formatAmount(amount);
    weightOutput.textContent = formatWeight(weight);
  }

  function calculateFromWeight() {
    const weight = Number(goldWeightInput.value) || 0;
    const amount = weight > 0 ? weight * goldRate : 0;
    if (amountInput.value !== "" || weight > 0) {
      amountInput.value = weight > 0 ? amount.toFixed(2) : "";
    }
    amountOutput.textContent = formatAmount(amount);
    weightOutput.textContent = formatWeight(weight);
  }

  amountInput.addEventListener("input", () => {
    setMode("amount");
    calculateFromAmount();
  });

  goldWeightInput.addEventListener("input", () => {
    setMode("weight");
    calculateFromWeight();
  });

  toggleButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setMode(button.dataset.mode);
      if (activeMode === "amount") {
        amountInput.focus();
      } else {
        goldWeightInput.focus();
      }
    });
  });

  calculateFromAmount();
})();
