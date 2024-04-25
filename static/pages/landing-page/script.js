import { startLoading, stopLoading } from "../../../modules/loading.js";

window.navigateToPage = navigateToPage;

stopLoading();

function navigateToPage(page) {
    window.location.href = page;
}