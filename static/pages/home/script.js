import { logout, verifyLogin } from "../../../modules/auth.js"

window.navigateToPage = navigateToPage;
window.logout = logoutUser;

const user = await verifyLogin();
const vaccinesList = user?.vaccines ?? [];
renderVaccineList(vaccinesList);

function navigateToPage(page) {
    window.location.href = page;
}

function logoutUser() {
    logout();
    navigateToPage("landing-page.html");
}

function formatDate(date) {
    if (!date)
        return "";
    date = new Date(date);
    return date.toLocaleDateString('pt-br', { year: "numeric", month: "numeric", day: "numeric" });
}

function formatNextDose(date) {
    if (!date)
        return "Não há próxima dose";

    date = formatDate(date);
    return `Próxima dose em: ${date}`;
}

function renderVaccineList(list) {
    const vaccinesHtml = Object.keys(list).map((key) => `
        <div class="vaccine-box" onclick="navigateToPage('create-edit-vaccine-page.html?vaccine=${key}')">
            <h5>${list[key].name}</h5>
            <div id="box-dose">
                <p>${list[key].dose}</p>
            </div>
            <p id="date-text">
                ${formatDate(list[key].date)}
            </p>
            <img>
            <p id="next-time-alert">
                ${formatNextDose(list[key].nextDose)}
            </p>
        </div>`
    );

    document.getElementById("vaccine-list-box").innerHTML = vaccinesHtml;
}