function setButtonsEventListeners() {
    console.log("WCHODZI");
    const leaveButtons = document.querySelectorAll(".button-leave");
    const readyButtons = document.querySelectorAll(".button-ready");

    // changing from NodeList to array
    const leaveButtonsArray = [...leaveButtons];
    const readyButtonsArray = [...readyButtons];

    leaveButtonsArray.forEach(setEventListener);
    readyButtonsArray.forEach(setEventListener);
}

function setEventListener(event) {
    event.addEventListener("click", displayPopUp);
}

function displayPopUp() {
    console.log("POP UP NOW");
}

export { setButtonsEventListeners };
