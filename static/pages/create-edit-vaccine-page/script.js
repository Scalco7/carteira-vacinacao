import { logout } from "../../../modules/auth.js";

window.navigateToPage = navigateToPage;
window.logout = logoutUser;
window.saveProof = saveProof;
window.saveVaccine = saveVaccine;

const img = document.querySelector('#proof-img');

function navigateToPage(page) {
    window.location.href = page;
}

function saveVaccine() {
    console.log("salvando");
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

function logoutUser() {
    logout();
    navigateToPage("landing-page.html");
}