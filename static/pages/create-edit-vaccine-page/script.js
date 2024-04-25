import { logout, verifyLogin } from "../../../modules/auth.js";
import { createVaccine, getVaccine, updateVaccine, deleteVaccine } from "../../../modules/firebaseDataBase.js"

window.navigateToPage = navigateToPage;
window.logout = logoutUser;
window.saveProof = saveProof;
window.saveVaccine = saveVaccine;
window.openRemoveDialog = openRemoveDialog;
window.closeRemoveDialog = closeRemoveDialog;
window.removeVaccine = removeVaccine;

const user = await verifyLogin();
const userUid = localStorage.getItem("user-uid");
const img = document.querySelector('#proof-img');

const urlClass = new URL(window.location.href);
const vaccineId = urlClass.searchParams.get("vaccine");
const isEdditing = !vaccineId ? false : true;

await renderPage();

function navigateToPage(page) {
    window.location.href = page;
}

async function renderPage() {
    document.getElementById('final-button').innerHTML = isEdditing ? "Salvar alterações" : "Cadastrar";

    if (!isEdditing) {
        document.getElementById('delete-button').classList.add("hidden");
        return;
    }

    const vaccineResponse = await getVaccine(userUid, vaccineId);

    if (!vaccineResponse.status) {
        navigateToPage("home-page.html");
        return;
    }

    const vaccine = vaccineResponse.response;

    const nameInput = document.getElementById("vaccine-name");
    const dateInput = document.getElementById("vaccine-date");
    const nextDoseInput = document.getElementById("next-vaccine-date");
    const doseInput = document.querySelector(`input[value="${vaccine.dose}"]`);

    nameInput.value = vaccine.name;
    dateInput.value = new Date(vaccine.date).toISOString().substring(0, 10);
    doseInput.checked = true;
    if (vaccine.nextDose)
        nextDoseInput.value = new Date(vaccine.nextDose).toISOString().substring(0, 10)
}

async function saveVaccine() {
    const name = document.getElementById("vaccine-name").value;
    const date = document.getElementById("vaccine-date").value;
    const nextDose = document.getElementById("next-vaccine-date")?.value ?? null;
    const dose = document.querySelector('input[name="dose"]:checked')?.value ?? '';

    if (!validateField(name)) {
        alert("Coloque um nome válido"); return;
    }
    if (!validateField(date)) {
        alert("Coloque uma data válida"); return;
    }
    if (!validateField(dose)) {
        alert("Selecione uma dose válida"); return;
    }

    const vaccineObject = {
        name: name,
        date: (new Date(date)).toString(),
        nextDose: nextDose ? (new Date(nextDose)).toString() : null,
        dose: dose
    }

    if (isEdditing)
        await updateVaccine(userUid, vaccineId, vaccineObject)
    else
        await createVaccine(userUid, vaccineObject);

    navigateToPage("home-page.html");
}

async function removeVaccine() {
    await deleteVaccine(userUid, vaccineId);
    navigateToPage("home-page.html");
}

function saveProof(evt) {
    if (!(evt.target && evt.target.files && evt.target.files.length > 0)) {
        return;
    }

    var r = new FileReader();
    r.onload = function () {
        img.src = r.result;
    }

    r.readAsDataURL(evt.target.files[0]);
}

function validateField(value) {
    return value != null && value != '' && value.length > 0;
}

function logoutUser() {
    logout();
    navigateToPage("landing-page.html");
}

function openRemoveDialog() {
    document.getElementById('dialog-screen').classList.remove('hidden');
}

function closeRemoveDialog() {
    document.getElementById('dialog-screen').classList.add('hidden');
}