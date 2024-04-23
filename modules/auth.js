import { fireRegister, fireLogin } from "./firebaseAuth.js";

async function register(name, gender, birthDate, email, password, confirmPassword) {
    //colocar validators

    const register = await fireRegister(email, password)
    console.log(register) //tirar dps
    return register
}

async function login(email, password) {
    const login = await fireLogin(email, password)
    console.log(login)
    return login
}

export { register, login }