import { fireRecoveryPassword } from "../../../modules/firebaseAuth.js";

window.changePassword = changePassword;

async function changePassword() {
    const email = document.getElementById("email-input").value;

    const response = await fireRecoveryPassword(email);

    const alertText = document.getElementById('alert-text');
    alertText.innerText = response.response;

    alertText.classList.remove(response.status ? 'red' : 'green');
    alertText.classList.add(response.status ? 'green' : 'red');
}