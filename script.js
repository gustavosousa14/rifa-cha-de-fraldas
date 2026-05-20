const numbersDiv = document.getElementById("numbers");
const modal = document.getElementById("modal");

const reservedText =
  document.getElementById("reserved");

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

  if (reservedText) {

    reservedText.textContent =
      reservedCount;
  }
}

function closeModal() {

  modal.style.display = "none";

  modal.innerHTML = "";
}

function goHome() {

  closeModal();

  // FORÇA VOLTAR PRA TELA INICIAL
  setTimeout(() => {

    window.scrollTo(0, 0);

  }, 100);
}

function createNumbers() {

  numbersDiv.innerHTML = "";

  for (let i = 1; i <= 300; i++) {

    const number =
      i.toString().padStart(3, "0");

    const btn =
      document.createElement("button");

    btn.className = "number";

    // RESERVADO
    if (reservedNumbers[number]) {

      btn.classList.add("reserved");
    }

    btn.innerHTML = `
      <div>
        ${number}
      </div>
    `;

    btn.onclick = () => {

      // SE ESTIVER RESERVADO
      if (reservedNumbers[number]) {

        const data =
          reservedNumbers[number];

        modal.innerHTML = `
          <div class="modal-content">

            <h2>
              Número ${number}
            </h2>

            <p>
              👤 <strong>Nome:</strong>
              ${data.name}
            </p>

            <p>
              📱 <strong>Tel:</strong>
              ${data.phone}
            </p>

            <button id="deleteBtn">
              Apagar Registro
            </button>

            <button id="closeInfo">
              Fechar
            </button>

          </div>
        `;

        modal.style.display = "flex";

        // APAGAR
        document
          .getElementById("deleteBtn")
          .onclick = () => {

            delete reservedNumbers[number];

            saveData();

            createNumbers();

            updateCounters();

            goHome();
          };

        // FECHAR
        document
          .getElementById("closeInfo")
          .onclick = () => {

            closeModal();
          };

        return;
      }

      // RESERVAR
      modal.innerHTML = `
        <div class="modal-content">

          <h2>
            Reservar Número
          </h2>

          <p>
            Número:
            <strong>${number}</strong>
          </p>

          <input
            type="text"
            id="newName"
            placeholder="Seu nome"
          >

          <input
            type="text"
            id="newPhone"
            placeholder="Telefone"
          >

          <button id="saveReserve">
            Reservar
          </button>

        </div>
      `;

      modal.style.display = "flex";

      // SALVAR
      document
        .getElementById("saveReserve")
        .onclick = () => {

          const name =
            document
            .getElementById("newName")
            .value
            .trim();

          const phone =
            document
            .getElementById("newPhone")
            .value
            .trim();

          if (!name || !phone) {

            alert(
              "Preencha todos os campos."
            );

            return;
          }

          reservedNumbers[number] = {
            name,
            phone
          };

          saveData();

          createNumbers();

          updateCounters();

          goHome();
        };
    };

    numbersDiv.appendChild(btn);
  }
}

window.onclick = (e) => {

  if (e.target === modal) {

    closeModal();
  }
};

createNumbers();

updateCounters();
