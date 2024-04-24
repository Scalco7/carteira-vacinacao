import { logout, verifyLogin } from "../../../modules/auth.js"

window.navigateToPage = navigateToPage;
window.logout = logoutUser;
window.search = search;

const user = await verifyLogin();
const vaccinesList = getVaccines(user?.vaccines);

renderVaccineList(vaccinesList);

function navigateToPage(page) {
    window.location.href = page;
}

function logoutUser() {
    logout();
    navigateToPage("landing-page.html");
}

function getVaccines(vaccineObj) {
    if (!vaccineObj)
        return [];

    let list = Object.keys(vaccineObj).map(key => ({ ...vaccineObj[key], id: key }));
    return list.sort(compareVaccines);
}

function compareVaccines(a, b) {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB)
        return -1;
    if (nameA > nameB)
        return 1;

    const doseA = a.dose.toUpperCase();
    const doseB = b.dose.toUpperCase();

    if (doseA < doseB)
        return -1;
    if (doseA > doseB)
        return 1;

    return 0;
}

function search() {
    const value = document.getElementById("search-input").value;
    const list = vaccinesList.filter(vaccine => vaccine.name.includes(value));

    renderVaccineList(list);
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
    if (list.length > 0) {
        const vaccinesHtml = list.map((vaccine) => `
        <div class="vaccine-box" onclick="navigateToPage('create-edit-vaccine-page.html?vaccine=${vaccine.id}')">
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

        document.getElementById("vaccine-list-box").innerHTML = vaccinesHtml.toString().replaceAll(",", "");
    }
    else {
        document.getElementById("vaccine-list-box").innerHTML = `<h3>Sem vacinas encontradas</h3>`;
    }
}