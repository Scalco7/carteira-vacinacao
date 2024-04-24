import { getDatabase, ref, set, child, get } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

async function createUser(userUid, userObject) {
    const db = await getDatabase();
    const dbRef = await ref(db, "users/" + userUid);
    await set(dbRef, userObject);
}

async function getUser(userUid) {
    const db = await getDatabase();
    const dbRef = ref(db);

    try {
        const snapshot = await get(child(dbRef, `users/${userUid}`))

        if (snapshot.exists()) {
            return {
                status: true,
                response: snapshot.val()
            }
        } else {
            return {
                status: false,
                response: "Erro ao ler dados do usuário"
            }
        }
    }
    catch {
        error => {
            return {
                status: false,
                response: error.message
            }
        }
    }
}

export { createUser, getUser }
