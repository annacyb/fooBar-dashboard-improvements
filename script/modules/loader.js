export function hideLoader() {
    setTimeout(() => {
        const loaderElement = document.querySelector("#loader-background");
        loaderElement.classList.add("fadeOut");
        setTimeout(() => {
            loaderElement.classList.add("displayNone");
        }, 700);
    }, 800);
}
