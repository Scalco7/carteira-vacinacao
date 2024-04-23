import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

async function fireRegister(email, password) {
    const auth = getAuth();

    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        return {
            status: true,
            response: response,
        }
    } catch (error) {
        return {
            status: false,
            response: "E-mail já cadastrado",
        }
    }
}

async function fireLogin(email, password) {
    const auth = getAuth();

    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        return {
            status: true,
            response: response,
        }
    } catch (error) {
        return {
            status: false,
            response: "E-mail ou senha inválidos",
        }
    }
}

export { fireLogin, fireRegister }