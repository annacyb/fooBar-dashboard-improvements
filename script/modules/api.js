import { orders_api, beer_api } from "../modules/settings.js";

async function get_orders() {
    const response = await fetch(orders_api);
    const jsonData = await response.json();
    return jsonData;
}

async function get_beers() {
    const response = await fetch(beer_api);
    const jsonData = await response.json();
    return jsonData;
}

export { get_orders, get_beers };
