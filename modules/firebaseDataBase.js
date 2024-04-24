import { getDatabase, ref, set, child, get, update, remove } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

async function createUser(userUid, userObject) {
    const db = await getDatabase();
    const dbRef = await ref(db, "users/" + userUid);
    await set(dbRef, userObject);
}

async function createVaccine(userUid, vaccineObject) {
    const db = await getDatabase();
    const vaccineId = Date.now();
    const dbRef = await ref(db, "users/" + userUid + "/vaccines/" + vaccineId);
    await set(dbRef, vaccineObject);
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

async function getVaccine(userUid, vaccineId) {
    const db = await getDatabase();
    const dbRef = ref(db);

    try {
        const snapshot = await get(child(dbRef, `users/${userUid}/vaccines/${vaccineId}`))

        if (snapshot.exists()) {
            return {
                status: true,
                response: snapshot.val()
            }
        } else {
            return {
                status: false,
                response: "Erro ao ler dados da vacina"
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

async function updateVaccine(userUid, vaccineId, vaccineObject) {
    const db = await getDatabase();
    const dbRef = await ref(db, "users/" + userUid + "/vaccines/" + vaccineId);
    await update(dbRef, vaccineObject);
}

async function deleteVaccine(userUid, vaccineId) {
    const db = await getDatabase();
    const dbRef = await ref(db, "users/" + userUid + "/vaccines/" + vaccineId);
    await remove(dbRef);
}

export { createUser, createVaccine, getUser, getVaccine, updateVaccine, deleteVaccine }
