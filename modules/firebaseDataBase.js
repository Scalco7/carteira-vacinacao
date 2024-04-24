import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

async function createUser(userUid, userObject) {
    const db = await getDatabase();
    const db_ref = await ref(db, "users/" + userUid);
    await set(db_ref, userObject);
}

export { createUser }
