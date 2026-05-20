const numbersDiv = document.getElementById("numbers");
const modal = document.getElementById("modal");

const availableText =
  document.getElementById("available");

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

  if (availableText) {

    availableText.textContent =
      300 - reservedCount;
  }
}

function closeModal() {

  modal.style.display = "none";
}

function createNumbers() {

  numbersDiv.innerHTML = "";

  for (let i = 1; i <= 300; i++) {

    const number =
      i.toString().padStart(3, "0");

    const btn =
      document.createElement("button");

    btn.className = "number";

    // NÚMERO RESERVADO
    if (reservedNumbers[number]) {

      btn.classList.add("reserved");

      btn.innerHTML = `
        <div>
          ${number}
        </div>
      `;

    } else {

      btn.innerHTML = `
        <div>
          ${number}
        </div>
      `;
    }

    btn.onclick = () => {

      // SE O NÚMERO ESTIVER RESERVADO
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

            <button
              id="deleteBtn"
            >
              Apagar Registro
            </button>

            <button
              id="closeInfo"
            >
              Fechar
            </button>

          </div>
        `;

        modal.style.display = "flex";

        // APAGAR REGISTRO
        document
          .getElementById("deleteBtn")
          .onclick = () => {

            delete reservedNumbers[number];

            saveData();

            createNumbers();

            updateCounters();

            closeModal();

            // VOLTA PARA TELA INICIAL
            window.location.reload();
          };

        // FECHAR
        document
          .getElementById("closeInfo")
          .onclick = () => {

            closeModal();
          };

        return;
      }

      // MODAL DE RESERVA
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

          <button
            id="saveReserve"
          >
            Reservar
          </button>

        </div>
      `;

      modal.style.display = "flex";

      // SALVAR RESERVA
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

          closeModal();

          // VOLTA PARA TELA INICIAL
          window.location.reload();
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
