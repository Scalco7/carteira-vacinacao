import { login } from "../../../modules/auth.js"
import { startLoading, stopLoading } from "../../../modules/loading.js";

window.signIn = signIn;

stopLoading();

async function signIn() {
    startLoading();
    const email = document.getElementById("email-input").value;
    const password = document.getElementById("password-input").value;

    const loginResponse = await login(email, password);

    if (loginResponse.status)
        window.location.href = "home-page.html";
    else
        document.getElementById('alert-text').innerText = loginResponse.response;

    stopLoading();
}