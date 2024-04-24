import { logout, verifyLogin } from "../../../modules/auth.js";
import { createVaccine } from "../../../modules/firebaseDataBase.js"

window.navigateToPage = navigateToPage;
window.logout = logoutUser;
window.saveProof = saveProof;
window.saveVaccine = saveVaccine;
window.deleteVaccine = deleteVaccine;

const user = await verifyLogin();
const img = document.querySelector('#proof-img');

var urlAtual = window.location.href;
var urlClass = new URL(urlAtual);
var vaccineId = urlClass.searchParams.get("vaccine");
const isEdditing = !vaccineId ? false : true;

renderPage();

function navigateToPage(page) {
    window.location.href = page;
}

function renderPage() {
    document.getElementById('final-button').innerHTML = isEdditing ? "Salvar alterações" : "Cadastrar";

    if (!isEdditing)
        document.getElementById('delete-button').classList.add("hidden");
}

function saveVaccine() {
    isEdditing ? edit() : create();
}

function create() {

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
    const uid = localStorage.getItem("user-uid");

    const vaccineObject = {
        name: name,
        date: (new Date(date)).toString(),
        nextDose: nextDose ? (new Date(nextDose)).toString() : null,
        dose: dose
    }

    createVaccine(uid, vaccineObject);
}

function edit() {
    console.log("editando vacina")
}

function deleteVaccine() {
    console.log("Apagando vacina")
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