"use strict";
const myModal = document.getElementById("myModal");
const toggleModal = document.getElementById("toggleModal");
const closeModal = document.getElementById("closeModal");
const bekorQilish = document.getElementById("bekorQilish");
const inputs = document.querySelectorAll(".modal_body input, .modal_body select");
const saqlashBtn = document.getElementById("saqlash");
const search = document.getElementById("search");
///////////////////////////////////////////
const clearModalInputValues = () => {
    if (inputs) {
        inputs.forEach((inputs) => {
            inputs.value = "";
        });
    }
};
////////////////////////////////////////////
//////////////////////search//////////////////////
window.addEventListener("DOMContentLoaded", () => {
    const searchInput = () => {
        if (!search)
            return;
        const filter = search === null || search === void 0 ? void 0 : search.value.toUpperCase();
        console.log("Qidiruv qiymati:", filter);
    };
    if (search) {
        search.addEventListener("input", searchInput);
    }
});
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
    }
    else {
        console.log("bekorQilish element not found!!");
    }
}
else {
    console.log("Toggle modal or modal element not found!!");
}
/////////////////////////////
////////////////formData saqlash malumoti///////////
if (saqlashBtn && inputs) {
    saqlashBtn.addEventListener("click", () => {
        myModal === null || myModal === void 0 ? void 0 : myModal.classList.remove("shoModal");
        const uylanganmiCheckbox = document.getElementById("check");
        const uylanganmi = uylanganmiCheckbox.checked;
        const formData = {};
        inputs.forEach((input) => {
            formData[input.id] = input.value;
        });
        formData["uylanganmi"] = uylanganmi;
        localStorage.setItem("formData", JSON.stringify(formData));
        console.log("formData saqlash", formData);
        const tableBody = document.querySelector("tbody");
        if (tableBody) {
            const newRowForTr = document.createElement("tr");
            newRowForTr.innerHTML = `
            <th scope="row">${tableBody.children.length + 1}</th>
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
        }
        else {
            console.log("Error that occurred");
        }
    });
}
function deleteRow(button) {
    const row = button.closest("tr");
    if (row) {
        row.remove();
    }
}
//////////////////////
const loadDataFromLocalStorage = () => {
    const formDataString = localStorage.getItem("formData");
    if (formDataString) {
        return JSON.parse(formDataString);
    }
    else {
        return {};
    }
};
const populateDataField = (formData) => {
    if (inputs) {
        inputs.forEach((input) => {
            const { id } = input;
            input.value = formData[id] || "";
        });
    }
    else {
        console.log("inputs element not found!!");
    }
};
const saveDataFromInputToLocalStorage = () => {
    const formData = {};
    if (inputs) {
        inputs.forEach((input) => {
            formData[input.id] = input.value;
        });
        localStorage.setItem("formData", JSON.stringify(formData));
        // console.log(formData);
    }
    else {
        console.log("inputs element not found!!");
    }
};
window.addEventListener("DOMContentLoaded", () => {
    const formData = loadDataFromLocalStorage();
    populateDataField(formData);
});
if (inputs) {
    inputs.forEach((input) => {
        input.addEventListener("input", saveDataFromInputToLocalStorage);
    });
}
