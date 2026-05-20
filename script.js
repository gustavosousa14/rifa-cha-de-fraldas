const numbersDiv = document.getElementById("numbers");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");
const reserveBtn = document.getElementById("reserveBtn");

const selectedNumberText = document.getElementById("selectedNumber");

const nameInput = document.getElementById("name");
const phoneInput = document.getElementById("phone");

const availableText = document.getElementById("available");
const reservedText = document.getElementById("reserved");

let selectedNumber = null;

let reservedNumbers =
  JSON.parse(localStorage.getItem("reservedNumbers")) || {};

function updateCounters() {
  const reservedCount = Object.keys(reservedNumbers).length;

  reservedText.textContent = reservedCount;
  availableText.textContent = 300 - reservedCount;
}

function createNumbers() {

  for (let i = 1; i <= 300; i++) {

    const btn = document.createElement("button");

    btn.classList.add("number");

    const formatted = i.toString().padStart(3, "0");

    btn.textContent = formatted;

    if (reservedNumbers[formatted]) {
      btn.classList.add("reserved");
    }

    btn.addEventListener("click", () => {

      if (reservedNumbers[formatted]) {
        alert(
          `Número reservado por ${reservedNumbers[formatted].name}`
        );
        return;
      }

      selectedNumber = formatted;

      selectedNumberText.textContent =
        `Número escolhido: ${formatted}`;

      modal.style.display = "flex";
    });

    numbersDiv.appendChild(btn);
  }
}

reserveBtn.addEventListener("click", () => {

  const name = nameInput.value.trim();
  const phone = phoneInput.value.trim();

  if (!name || !phone) {
    alert("Preencha todos os campos.");
    return;
  }

  reservedNumbers[selectedNumber] = {
    name,
    phone
  };

  localStorage.setItem(
    "reservedNumbers",
    JSON.stringify(reservedNumbers)
  );

  modal.style.display = "none";

  numbersDiv.innerHTML = "";

  createNumbers();

  updateCounters();

  nameInput.value = "";
  phoneInput.value = "";
});

closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

createNumbers();
updateCounters();
