import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-database.js";

function createUser(userUid, userObject) {
    const db = getDatabase();
    const db_ref = ref(db, "users/" + userUid);
    set(db_ref, userObject);
}

export { createUser }
