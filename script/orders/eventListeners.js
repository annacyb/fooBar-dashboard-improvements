function setButtonsEventListeners() {
    const leaveButtons = document.querySelectorAll(".button-leave");
    const readyButtons = document.querySelectorAll(".button-ready");

    // changing from NodeList to array
    const leaveButtonsArray = [...leaveButtons];
    const readyButtonsArray = [...readyButtons];

    leaveButtonsArray.forEach(setEventListener);
    readyButtonsArray.forEach(setEventListener);

    setListenerOnOKButton();
}

function setEventListener(event) {
    event.addEventListener("click", displayPopUp);
}

function displayPopUp() {
    const popUpElem = document.querySelector("#pop-up-future-feature");
    popUpElem.classList.remove("display-none");
}

function setListenerOnOKButton() {
    const buttonOKElem = document.querySelector("#button-ok");
    buttonOKElem.addEventListener("click", closePopUp);
}
function closePopUp() {
    const popUpElem = document.querySelector("#pop-up-future-feature");
    popUpElem.classList.add("display-none");
}

export { setButtonsEventListeners };
