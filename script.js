const numbersDiv = document.getElementById("numbers");
const modal = document.getElementById("modal");
const closeBtn = document.getElementById("close");

const reserveBtn =
  document.getElementById("reserveBtn");

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

    // NÚMERO RESERVADO
    if (reservedNumbers[number]) {

      btn.classList.add("reserved");

      btn.innerHTML = `
        <div style="
          font-size:18px;
          font-weight:bold;
        ">
          ${number}
        </div>
      `;

    } else {

      btn.innerHTML = `
        <div style="
          font-size:18px;
          font-weight:bold;
        ">
          ${number}
        </div>
      `;
    }

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

            <p style="
              margin-top:20px;
              font-size:18px;
            ">
              👤 <strong>Nome:</strong>
              ${data.name}
            </p>

            <p style="
              margin-top:10px;
              font-size:18px;
            ">
              📱 <strong>Tel:</strong>
              ${data.phone}
            </p>

            <button
              id="deleteBtn"
              style="
                margin-top:25px;
                background:#ff3d57;
              "
            >
              Apagar Registro
            </button>

            <button
              id="closeInfo"
              style="
                margin-top:10px;
                background:#ddd;
                color:#333;
              "
            >
              Fechar
            </button>

          </div>
        `;

        modal.style.display = "flex";

        // BOTÃO APAGAR
        document
          .getElementById("deleteBtn")
          .onclick = () => {

            delete reservedNumbers[number];

            saveData();

            createNumbers();

            updateCounters();

            modal.style.display = "none";
          };

        // BOTÃO FECHAR
        document
          .getElementById("closeInfo")
          .onclick = () => {

            modal.style.display = "none";
          };

        return;
      }

      // NOVA RESERVA
      selectedNumber = number;

      modal.innerHTML = `
        <div class="modal-content">

          <span
            class="close"
            id="closeModal"
          >
            &times;
          </span>

          <h2>
            Reservar Número
          </h2>

          <p id="selectedNumber">
            Número escolhido:
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

      // FECHAR
      document
        .getElementById("closeModal")
        .onclick = () => {

          modal.style.display = "none";
        };

      // RESERVAR
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

          modal.style.display = "none";
        };
    };

    numbersDiv.appendChild(btn);
  }
}

window.onclick = (e) => {

  if (e.target === modal) {

    modal.style.display = "none";
  }
};

createNumbers();

updateCounters();
