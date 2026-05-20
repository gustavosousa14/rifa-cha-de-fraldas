const numbersDiv = document.getElementById("numbers");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");
const reserveBtn = document.getElementById("reserveBtn");

const selectedNumberText =
  document.getElementById("selectedNumber");

const nameInput =
  document.getElementById("name");

const phoneInput =
  document.getElementById("phone");

const availableText =
  document.getElementById("available");

const reservedText =
  document.getElementById("reserved");

let selectedNumber = null;

let reservedNumbers =
  JSON.parse(
    localStorage.getItem("reservedNumbers")
  ) || {};

function saveData() {

  localStorage.setItem(
    "reservedNumbers",
    JSON.stringify(reservedNumbers)
  );
}

function updateCounters() {

  const reservedCount =
    Object.keys(reservedNumbers).length;

  reservedText.textContent =
    reservedCount;

  availableText.textContent =
    300 - reservedCount;
}

function createNumbers() {

  numbersDiv.innerHTML = "";

  for (let i = 1; i <= 300; i++) {

    const number =
      i.toString().padStart(3, "0");

    const btn =
      document.createElement("button");

    btn.className = "number";

    // SE ESTIVER RESERVADO
    if (reservedNumbers[number]) {

      btn.classList.add("reserved");

      btn.innerHTML = `
        <div style="font-size:18px;font-weight:bold;">
          ${number}
        </div>

        <div style="
          font-size:11px;
          margin-top:4px;
          word-break:break-word;
        ">
          ${reservedNumbers[number].name}
        </div>
      `;

    } else {

      btn.innerHTML = `
        <div style="font-size:18px;font-weight:bold;">
          ${number}
        </div>
      `;
    }

    btn.onclick = () => {

      // SE ESTIVER RESERVADO
      if (reservedNumbers[number]) {

        const password =
          prompt(
            `Número ${number} reservado por ${reservedNumbers[number].name}\n\nDigite "remover" para apagar a reserva:`
          );

        if (
          password &&
          password.toLowerCase() === "remover"
        ) {

          delete reservedNumbers[number];

          saveData();

          createNumbers();

          updateCounters();

          alert("Reserva removida.");
        }

        return;
      }

      // NOVA RESERVA
      selectedNumber = number;

      selectedNumberText.innerHTML =
        `Número escolhido: <strong>${number}</strong>`;

      modal.style.display = "flex";
    };

    numbersDiv.appendChild(btn);
  }
}

reserveBtn.onclick = () => {

  const name =
    nameInput.value.trim();

  const phone =
    phoneInput.value.trim();

  if (!name || !phone) {

    alert("Preencha todos os campos.");

    return;
  }

  reservedNumbers[selectedNumber] = {
    name,
    phone
  };

  saveData();

  createNumbers();

  updateCounters();

  modal.style.display = "none";

  nameInput.value = "";
  phoneInput.value = "";

  alert(
    `Número ${selectedNumber} reservado com sucesso!`
  );
};

closeBtn.onclick = () => {

  modal.style.display = "none";
};

window.onclick = (e) => {

  if (e.target === modal) {

    modal.style.display = "none";
  }
};

createNumbers();

updateCounters();
