import { changeTimestampToTime } from "../modules/time-counting.js";

const queueContainer = document.querySelector("#queue-orders-place");

// MAIN FUNCTION
function showQueue(data) {
    clearQueue();
    if (data.orders.queue.length == 0) {
        showMissingData();
    } else {
        showQueueData(data);
    }
}

function clearQueue() {
    queueContainer.innerHTML = "";
}

function showMissingData() {
    queueContainer.innerHTML = "<p>No orders to show</p>";
    showOrderNr(0);
}

async function showQueueData(data) {
    let countOrders = 0;

    data.orders.queue.forEach(async (orderElement) => {
        // counting orders in a queue
        countOrders = countOrders + 1;

        //grab the template for order in a queue
        const queue_order_template = document.querySelector(
            "template.queue-order-template"
        ).content;

        //clone it
        const myCopy = queue_order_template.cloneNode(true);

        //change content
        myCopy.querySelector(".order-id").textContent = "#" + orderElement.id;
        const orderTimestamp = orderElement.startTime;
        const orderTime = changeTimestampToTime(orderTimestamp);
        myCopy.querySelector(".order-time").textContent = orderTime;

        const indenticalBeersCounter = countIdenticalBeers(orderElement.order);

        createOrderDetailsView(indenticalBeersCounter, myCopy);

        //grab parent
        const parent = document.querySelector("#queue-orders-place");

        //append
        parent.appendChild(myCopy);
    });
    showOrderNr(countOrders);
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
    const queueOrderDetailsTemplate = document.querySelector(
        "template.queue-order-details-template"
    ).content;

    //clone it
    const orderDetailsCopy = queueOrderDetailsTemplate.cloneNode(true);

    //change content
    showOrderDetails(indenticalBeersCounter, orderDetailsCopy);

    //grab parent
    const orderContainer = myCopy.querySelector(".order-details-place");

    //append order details
    orderContainer.appendChild(orderDetailsCopy);
}

function showOrderDetails(counterObject, templateCopy) {
    // it is changing counterObject object to an array of arrays where first element (key) is the name of the beer and second element (value) is a number of beers of that type
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

function showOrderNr(number) {
    const ordersNrCont = document.querySelector("#queue-nr");
    ordersNrCont.innerHTML = number;
}

export { showQueue };
