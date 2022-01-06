// works only for media queries lower than 900 as it is when tabs appear

//at the begining selected tab is always li element that contains "Queue" text
let previouslySelectedTab = document
    .querySelector("ul#tabs")
    .querySelector(".selectedTab");

document.querySelector("#bartenders-wrapper").classList.remove("displayNone");

function addTabsEventListeners() {
    document.querySelector("#bartenders-wrapper").classList.add("displayNone");

    const tabsWrapper = document.querySelector("ul#tabs").children;
    // change from NodeList to array
    let tabsElementsArray = [...tabsWrapper];

    tabsElementsArray.forEach((tab) => {
        tab.addEventListener("click", (element) => {
            // currentTarget - target element that actually has the event listener
            if (element.currentTarget.classList.contains("selectedTab")) {
            } else {
                // change tabs style
                previouslySelectedTab.classList.remove("selectedTab");
                element.currentTarget.classList.add("selectedTab");

                // check which tab has been clicked for changing a content shown on the page
                const contentName =
                    element.currentTarget.children[0].dataset.bartender;

                if (contentName === "Queue") {
                    document
                        .querySelector("#bartenders-wrapper")
                        .classList.add("displayNone");
                    document
                        .querySelector("#queue-wrapper")
                        .classList.remove("displayNone");
                }

                const bartenders = ["dannie", "jonas", "klaus", "peter"];

                bartenders.forEach((name) => {
                    if (contentName.toLowerCase() == name) {
                        document
                            .querySelector("#queue-wrapper")
                            .classList.add("displayNone");
                        document
                            .querySelector("#bartenders-wrapper")
                            .classList.remove("displayNone");

                        // show name element of the bartender
                        document
                            .querySelector(`#bartender-${name}`)
                            .classList.remove("displayNone");
                    } else {
                        // hide bartender
                        document
                            .querySelector(`#bartender-${name}`)
                            .classList.add("displayNone");
                    }
                });

                previouslySelectedTab = element.currentTarget;
            }
        });
    });
}

export { addTabsEventListeners };
