function startLoading() {
    const loading = document.getElementById("loading-screen");
    loading.classList.remove("hidden");
}

function stopLoading() {
    const loading = document.getElementById("loading-screen");
    loading.classList.add("hidden");
}

export { startLoading, stopLoading }