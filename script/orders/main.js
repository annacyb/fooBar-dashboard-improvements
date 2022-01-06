import { refresh_rate } from "../modules/settings.js";
import { get_orders, get_beers } from "../modules/api.js";
import { showQueue } from "./queue.js";
import {
    showBartendersOrders,
    checkMediaQueries,
} from "./bartenders-orders.js";

window.addEventListener("DOMContentLoaded", checkMediaQueries);
window.addEventListener("DOMContentLoaded", start);

const data = {
    beers: {},
    orders: {},
};

async function start() {
    loop();
}

async function loop() {
    await loadData();
    showData();

    setTimeout(loop, refresh_rate);
}

async function loadData() {
    data.beers = await get_beers();
    data.orders = await get_orders();
}

function showData() {
    showQueue(data);
    showBartendersOrders(data);
}
