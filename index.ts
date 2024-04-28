const myModal: HTMLElement | null = document.getElementById("myModal");
const toggleModal: HTMLElement | null = document.getElementById("toggleModal");
const closeModal: HTMLElement | null = document.getElementById("closeModal");
const bekorQilish: HTMLElement | null = document.getElementById("bekorQilish");
const inputs: NodeListOf<HTMLInputElement | HTMLSelectElement> | null =
  document.querySelectorAll(".modal_body input, .modal_body select");

const saqlashBtn: HTMLElement | null = document.getElementById("saqlash");
const search: HTMLElement | null = document.getElementById("search");

///////////////////////////////////////////
const clearModalInputValues = () => {
  if (inputs) {
    inputs.forEach((inputs: HTMLInputElement | HTMLSelectElement) => {
      inputs.value = "";
    });
  }
};

////////////////////////////////////////////
//////////////////////search//////////////////////
// HTML dan inputni tanlab olish
const searchInput = document.getElementById("search") as HTMLInputElement;

// Qidirish funktsiyasini yaratish

// Qidirish so'rovini eshitish
// HTML'dan manzil tanlov elementini tanlab olish
const manzilSelect = document.getElementById("manzil") as HTMLSelectElement;

// Manzil tanlov elementidan tanlangan qiymat o'zgarishida ishlaydigan funksiya
function filterByManzil() {
  // Tanlangan manzilni olish
  const selectedManzil = manzilSelect.value;

  // Barcha jadval qatorlarini topish
  const rows = document.querySelectorAll("tbody tr");

  
  rows.forEach((row) => {
    const manzilCell = row.querySelector("td:nth-child(9)"); // Manzil maydoni

    if (manzilCell) {
      const manzil = manzilCell.textContent || "";

      // Tanlangan manzil bilan moslikni tekshirish
      if (selectedManzil === "All" || manzil === selectedManzil) {
        // Agar moslik topilsa, qatorni ko'rsatish
        console.log(selectedManzil);
      } else {
        // Aks holda, qatorlarni yashirish
        console.log(manzil);
      }
    }
  });
}

// Manzil tanlov elementida o'zgarish yuz berishi bilan filterni qo'llash
manzilSelect.addEventListener("change", filterByManzil);

//////////////////////////

if (myModal && toggleModal && closeModal && inputs) {
  toggleModal.addEventListener("click", () => {
    myModal.classList.add("shoModal");
    clearModalInputValues();
  });

  closeModal.addEventListener("click", () => {
    myModal.classList.remove("shoModal");
    clearModalInputValues();
  });

  if (bekorQilish) {
    bekorQilish.addEventListener("click", () => {
      myModal.classList.remove("shoModal");
      clearModalInputValues();
    });
  } else {
    console.log("bekorQilish element not found!!");
  }
} else {
  console.log("Toggle modal or modal element not found!!");
}
/////////////////////////////
////////////////formData saqlash malumoti///////////

if (saqlashBtn && inputs) {
  saqlashBtn.addEventListener("click", () => {
    myModal?.classList.remove("shoModal");

    const uylanganmiCheckbox: HTMLInputElement | null = document.getElementById(
      "check"
    ) as HTMLInputElement;
    const uylanganmi: boolean = uylanganmiCheckbox.checked;

    const formData: Record<string, string | boolean> = {};
    inputs.forEach((input: HTMLInputElement | HTMLSelectElement) => {
      formData[input.id] = input.value;
    });
    formData["uylanganmi"] = uylanganmi;

    localStorage.setItem("formData", JSON.stringify(formData));
    console.log("formData saqlash", formData);

    const tableBody: HTMLTableSectionElement | null =
      document.querySelector("tbody");
    if (tableBody) {
      const newRowForTr = document.createElement("tr");
      newRowForTr.innerHTML = `
            <th scope="row">${formData.index}</th>
            <td>${formData["ism"]}</td>
            <td>${formData["familiya"]}</td>
            <td>${formData["date"]}</td>
            <td>${formData["pro"]}</td>
            <td>${formData["lavozim"]}</td>
            <td>${formData["maosh"]}</td>
            <td>${formData["uylanganmi"] ? "Ha" : "Yo'q"}</td>
            <td>
              <button class="btn btn-warning text-white btn-sm">Edit</button>
              <button onclick="deleteRow(this)" class="btn btn-danger text-white btn-sm">Delete</button>
            </td>
          `;

      tableBody.appendChild(newRowForTr);
    } else {
      console.log("Error that occurred");
    }
  });
}

function deleteRow(button: HTMLButtonElement) {
  const row = button.closest("tr");
  if (row) {
    row.remove();
  }
}

//////////////////////
const loadDataFromLocalStorage = (): Record<string, string> => {
  const formDataString = localStorage.getItem("formData");
  if (formDataString) {
    return JSON.parse(formDataString);
  } else {
    return {};
  }
};

const populateDataField = (formData: Record<string, string>): void => {
  if (inputs) {
    inputs.forEach((input: HTMLInputElement | HTMLSelectElement) => {
      const { id } = input;
      input.value = formData[id] || "";
    });
  } else {
    console.log("inputs element not found!!");
  }
};

const saveDataFromInputToLocalStorage = (): void => {
  const formData: Record<string, string> = {};
  if (inputs) {
    inputs.forEach((input: HTMLInputElement | HTMLSelectElement) => {
      formData[input.id] = input.value;
    });
    localStorage.setItem("formData", JSON.stringify(formData));
    // console.log(formData);
  } else {
    console.log("inputs element not found!!");
  }
};

window.addEventListener("DOMContentLoaded", () => {
  const formData = loadDataFromLocalStorage();
  populateDataField(formData);
});

if (inputs) {
  inputs.forEach((input: HTMLInputElement | HTMLSelectElement) => {
    input.addEventListener("input", saveDataFromInputToLocalStorage);
  });
}
