import { logout } from "../../../modules/auth.js"

window.navigateToPage = navigateToPage;
window.logout = logoutUser;

function navigateToPage(page) {
    window.location.href = page;
}

function logoutUser() {
    logout();
    navigateToPage("landing-page.html");
}