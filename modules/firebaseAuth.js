import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

async function fireRegister(email, password) {
    const auth = getAuth();

    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        return {
            status: true,
            response: response,
        };
    } catch (error) {
        return {
            status: false,
            response: "E-mail já cadastrado",
        };
    }
}

async function fireLogin(email, password) {
    const auth = getAuth();

    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        return {
            status: true,
            response: response,
        };
    } catch (error) {
        return {
            status: false,
            response: "E-mail ou senha inválidos",
        };
    }
}

async function fireRecoveryPassword(email) {
    const auth = getAuth();

    try {
        await sendPasswordResetEmail(auth, email);
        return {
            status: true,
            response: "E-mail enviado",
        };
    } catch (error) {
        return {
            status: false,
            response: "E-mail inválido",
        };
    }
}

export { fireLogin, fireRegister, fireRecoveryPassword }