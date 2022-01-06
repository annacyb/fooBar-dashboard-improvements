export function hideLoader() {
    setTimeout(() => {
        const loaderElement = document.querySelector("#loader-background");
        loaderElement.classList.add("fadeOut");
        loaderElement.classList.add("displayNone");
    }, 1000);
}
