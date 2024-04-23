import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";

export function signUp() {
    console.log("fazendo cadastro - fazer função direito")

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, "fscalco7@gmail.com", "020305")
        .then((userCredential) => {
            const user = userCredential.user;
            console.log(user)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(error)
        });
}