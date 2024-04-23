import { register } from "../../../modules/auth.js"

window.signUp = signUp

async function signUp() {
    const name = document.getElementById("full-name").value
    const gender = document.querySelector('input[name="gender"]:checked')?.value ?? '';
    const birthDate = document.getElementById("date-input").value
    const email = document.getElementById("email-input").value
    const password = document.getElementById("password-input").value
    const confirmPassword = document.getElementById("confirm-password-input").value

    const registerResponse = await register(name, gender, birthDate, email, password, confirmPassword)

    if (registerResponse.status)
        window.location.href = "sign-in-page.html"
    else alert(registerResponse.response)
}