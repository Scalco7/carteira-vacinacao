import { fireRegister, fireLogin } from "./firebaseAuth.js";

async function register(name, gender, birthDate, email, password, confirmPassword) {
    if (!validateField(name)) {
        return {
            status: false,
            response: "Nome inválido"
        }
    }
    if (!validateField(gender)) {
        return {
            status: false,
            response: "Gênero inválido"
        }
    }
    if (!validateField(birthDate)) {
        return {
            status: false,
            response: "Data de nascimento inválida"
        }
    }

    if (!validateEmail(email)) {
        return {
            status: false,
            response: "E-mail inválido"
        }
    }

    if (!validatePassword(password)) {
        return {
            status: false,
            response: "Senha inválida"
        }
    }

    if (password != confirmPassword) {
        return {
            status: false,
            response: "Senhas diferentes"
        }
    }

    const register = await fireRegister(email, password);
    return register;
}

async function login(email, password) {
    if (!validateEmail(email)) {
        return {
            status: false,
            response: "E-mail ou senha inválidos"
        }
    }
    if (!validatePassword(password)) {
        return {
            status: false,
            response: "E-mail ou senha inválidos"
        }
    }

    const login = await fireLogin(email, password);
    return login;
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function validatePassword(password) {
    return password != null && password != '' && password.length >= 6;
}

function validateField(value) {
    return value != null && value != '' && value.length > 0;
}

export { register, login }