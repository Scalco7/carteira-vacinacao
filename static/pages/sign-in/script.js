import { login } from "../../../modules/auth.js"

window.signIn = signIn

async function signIn() {
    const email = document.getElementById("email-input").value
    const password = document.getElementById("password-input").value

    const loginResponse = await login(email, password)

    if (loginResponse.status)
        window.location.href = "home-page.html"
    else alert(loginResponse.response)
}