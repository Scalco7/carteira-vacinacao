import { logout, verifyLogin } from "../../../modules/auth.js"

window.navigateToPage = navigateToPage;
window.logout = logoutUser;

const user = await verifyLogin();
const vaccinesList = user?.vaccines ?? [];
renderVaccineList(vaccinesList);

console.log(vaccinesList);

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
    list = [
        {
            name: "BCG",
            dose: "Dose única",
            date: new Date('11-06-2022'),
            nextDose: null,
        },
        {
            name: "Hepatite B",
            dose: "1a Dose",
            date: new Date('11-08-2022'),
            nextDose: new Date('11-12-2023'),
        }
    ]

    const vaccinesHtml = list.map((vaccine, index) => `
        <div class="vaccine-box" onclick="navigateToPage('create-edit-vaccine-page.html?vaccine=${index}')">
            <h5>${vaccine.name}</h5>
            <div id="box-dose">
                <p>${vaccine.dose}</p>
            </div>
            <p id="date-text">
                ${formatDate(vaccine.date)}
            </p>
            <img>
            <p id="next-time-alert">
                ${formatNextDose(vaccine.nextDose)}
            </p>
        </div>`
    );


    const box = document.getElementById("vaccine-list-box").innerHTML = vaccinesHtml;
}