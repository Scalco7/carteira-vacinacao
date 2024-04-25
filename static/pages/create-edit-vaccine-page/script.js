import { logout, verifyLogin } from "../../../modules/auth.js";
import { createVaccine, getVaccine, updateVaccine, deleteVaccine } from "../../../modules/firebaseDataBase.js"
import { startLoading, stopLoading } from "../../../modules/loading.js";

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

stopLoading();

function navigateToPage(page) {
    window.location.href = page;
}

async function renderPage() {
    document.getElementById('final-button').innerHTML = isEdditing ? "Salvar alterações" : "Cadastrar";

    if (!isEdditing)
        return;

    document.getElementById('delete-button').classList.remove("hidden");
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
    img.src = vaccine.proofImg;
    doseInput.checked = true;
    if (vaccine.nextDose)
        nextDoseInput.value = new Date(vaccine.nextDose).toISOString().substring(0, 10)
}

async function saveVaccine() {
    startLoading();
    const name = document.getElementById("vaccine-name").value;
    const date = document.getElementById("vaccine-date").value;
    const nextDose = document.getElementById("next-vaccine-date")?.value ?? null;
    const dose = document.querySelector('input[name="dose"]:checked')?.value ?? '';

    if (!validateField(name)) {
        stopLoading();
        alert("Coloque um nome válido");
        return;
    }
    if (!validateField(date)) {
        stopLoading();
        alert("Coloque uma data válida");
        return;
    }
    if (!validateField(dose)) {
        stopLoading();
        alert("Selecione uma dose válida");
        return;
    }
    if (!validateField(img.src)) {
        stopLoading();
        alert("Coloque um comprovante válido");
        return;
    }

    const vaccineObject = {
        name: name,
        date: (new Date(date)).toString(),
        nextDose: nextDose ? (new Date(nextDose)).toString() : null,
        dose: dose,
        proofImg: img.src,
    }

    if (isEdditing)
        await updateVaccine(userUid, vaccineId, vaccineObject)
    else
        await createVaccine(userUid, vaccineObject);

    stopLoading();
    navigateToPage("home-page.html");
}

async function removeVaccine() {
    startLoading();
    await deleteVaccine(userUid, vaccineId);
    stopLoading();
    navigateToPage("home-page.html");
}

function saveProof(evt) {
    startLoading();
    if (!(evt.target && evt.target.files && evt.target.files.length > 0)) {
        return;
    }

    const r = new FileReader();
    r.onload = function () {
        console.log(r.result)
        img.src = r.result;
    }

    r.readAsDataURL(evt.target.files[0]);
    stopLoading();
}

function validateField(value) {
    return value != null && value != '' && value.length > 0;
}

async function logoutUser() {
    startLoading();
    await logout();
    stopLoading();
    navigateToPage("landing-page.html");
}

function openRemoveDialog() {
    document.getElementById('dialog-screen').classList.remove('hidden');
}

function closeRemoveDialog() {
    document.getElementById('dialog-screen').classList.add('hidden');
}