import { changeTimestampToTime } from "../modules/time-counting.js";
import { addTabsEventListeners } from "../orders/tabs.js";

const bartenderOrdersCount = {
    // value: array of completed orders + some randomly generated at start
    dannie: generateRandomOrders(),
    peter: generateRandomOrders(),
    klaus: generateRandomOrders(),
    jonas: generateRandomOrders(),
};

// MAIN FUNCTION

function showBartendersOrders(data) {
    clearOrders();
    data.orders.bartenders.forEach((bartender) => {
        showOrders(bartender, data.orders.serving);
    });
}

function generateRandomOrders() {
    let randomList = [];
    // random number between 50 and 80
    // as it is not possible to know how many orders bartenders did before entering the website without backend
    const randomNumber = Math.floor(Math.random() * 31) + 50;

    for (let i = 0; i < randomNumber; i++) {
        // the same id can be pushed to the array because the lenght of array is important for countBartnederOrder function
        randomList.push("#0");
    }
    return randomList;
}

function clearOrders() {
    const bartenders = ["dannie", "peter", "klaus", "jonas"];
    bartenders.forEach((name) => {
        const bartenderWrapper = document.querySelector(`#bartender-${name}`);
        const templatePlace = bartenderWrapper.querySelector(
            ".bartender-orders-place"
        );
        templatePlace.innerHTML = "";
    });
}

function showOrders(bartender, servings) {
    const lowercaseName = bartender.name.toLowerCase();
    const bartenderWrapper = document.querySelector(
        `#bartender-${lowercaseName}`
    );
    const templatePlace = bartenderWrapper.querySelector(
        ".bartender-orders-place"
    );
    const orderId = bartender.servingCustomer;

    // check if there is an order id that has the same id as bartender's servingCustomer id
    const matchedOrders = servings.filter((order) => order.id == orderId);
    if (matchedOrders.length == 1) {
        countBartenderOrder(lowercaseName, bartenderWrapper, orderId);

        let orderDetails = matchedOrders[0];

        // removing previous order
        templatePlace.innerHTML = "";

        // grab template for order container
        const order_template = document.querySelector(
            "template.bartenders-order-template"
        ).content;

        // clone it
        const myCopy = order_template.cloneNode(true);

        //change content
        myCopy.querySelector(".order-id").textContent = "#" + orderId;
        const orderTimestamp = orderDetails.startTime;
        const orderTime = changeTimestampToTime(orderTimestamp);
        myCopy.querySelector(".order-time").textContent = orderTime;

        const indenticalBeersCounter = countIdenticalBeers(orderDetails.order);

        createOrderDetailsView(indenticalBeersCounter, myCopy);

        //grab parent
        const parent = templatePlace;

        //append
        parent.appendChild(myCopy);
    } else if (matchedOrders.length == 0) {
        templatePlace.innerHTML = `<p class="noOrders">No orders to show</p>`;
    } else {
        templatePlace.innerHTML =
            "ERROR - bartender cannot serve more than 1 order at the same time";
    }
}

function countBartenderOrder(lowercaseName, bartenderWrapper, order_id) {
    // so that counter will not grow everytime the website is refreshed but only if there is a new order's id
    if (!bartenderOrdersCount[lowercaseName].includes(order_id)) {
        bartenderOrdersCount[lowercaseName].push(order_id);
    }

    bartenderWrapper.querySelector(".bartender-nr-orders").innerHTML =
        bartenderOrdersCount[lowercaseName].length + " orders";
}

function countIdenticalBeers(order) {
    let counter = {};
    order.forEach((beer) => {
        // hasOwnProperty - checks if key of beer exists in object
        if (counter.hasOwnProperty(beer)) {
            counter[beer] += 1;
        } else {
            counter[beer] = 1;
        }
    });
    return counter;
}

function createOrderDetailsView(indenticalBeersCounter, myCopy) {
    //grab the template for order details
    const bartenderOrderDetailsTemplate = document.querySelector(
        "template.bartender-order-details-template"
    ).content;

    //clone it
    const orderDetailsCopy = bartenderOrderDetailsTemplate.cloneNode(true);

    //change content
    showOrderDetails(indenticalBeersCounter, orderDetailsCopy);

    //grab parent
    const orderContainer = myCopy.querySelector(
        ".bartender-order-details-place"
    );

    //append order details
    orderContainer.appendChild(orderDetailsCopy);
}

function showOrderDetails(counterObject, templateCopy) {
    Object.entries(counterObject).forEach(([key, value]) => {
        const orderDetailsBeerCopy = templateCopy
            .querySelector(".order-details-row")
            .cloneNode(true);

        orderDetailsBeerCopy.querySelector(
            ".order-details-row-name"
        ).textContent = key;

        orderDetailsBeerCopy.querySelector(
            ".order-details-row-nr"
        ).textContent = value + " x ";

        // grab parent
        const parent = templateCopy;

        // append
        parent.appendChild(orderDetailsBeerCopy);
    });
}

function checkMediaQueries() {
    // solution for how to check media queries in JS taken from:
    // https://usefulangle.com/post/202/javascript-check-media-query

    const media_query = "screen and (max-width:900px)";

    function check() {
        const matched = window.matchMedia(media_query).matches;
        if (matched) {
            // width of the screen is below 900px width
            addTabsEventListeners();
        } else {
            // width of the screen is more than 900px
            deleteDisplayNoneClasses();
            // TO DO - reset tab classes so that queue will be selected
        }
    }

    // event to watch the media query
    check();
    window.matchMedia(media_query).addEventListener("change", check);
}

function deleteDisplayNoneClasses() {
    if (document.querySelector("#queue-wrapper").classList.length > 0) {
        document
            .querySelector("#queue-wrapper")
            .classList.remove("displayNone");
    }

    if (document.querySelector("#bartenders-wrapper").classList.length > 0) {
        document
            .querySelector("#bartenders-wrapper")
            .classList.remove("displayNone");
    }

    const bartenders = ["dannie", "jonas", "klaus", "peter"];

    bartenders.forEach((name) => {
        if (document.querySelector(`#bartender-${name}`).classList.length > 0) {
            document
                .querySelector(`#bartender-${name}`)
                .classList.remove("displayNone");
        }
    });
}

export { showBartendersOrders, checkMediaQueries };
