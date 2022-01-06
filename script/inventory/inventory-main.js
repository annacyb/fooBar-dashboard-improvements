import { prepareBeerStock } from "./beer-stock";
import { prepareTapStatus } from "./beer-tap";
import { refresh_rate } from "../modules/settings";
import { checkNewOrders } from "./revenue";
import { get_orders } from "../modules/api.js";

// import { addData } from "./graph.js";
// import { PrepareGraph } from "./graph.js";

const now = new Date();

const hours = now.getHours();
const date = now.getDate();
const month = now.getUTCMonth();

window.addEventListener("DOMContentLoaded", init);

async function init() {
  loop();
}

function showData(data) {
  prepareBeerStock(data.storage);
  prepareTapStatus(data.taps);
  checkNewOrders(data.serving);
  resetLocalStorage();
}

async function loop() {
  const data = await get_orders();
  showData(data);
  setTimeout(loop, refresh_rate);
}

function resetLocalStorage() {
  if (hours >= 22 || hours < 9) {
    console.log("closing time- reset");
    document.querySelector(".nr-served-today").textContent = "THE BAR IS CLOSED";
    document.querySelector(".beer-served-today").textContent = "THE BAR IS CLOSED";
    document.querySelector(".nr-served-today").style.fontSize = "2vw";
    document.querySelector(".beer-served-today").style.fontSize = "2vw";
    document.querySelector("#orders-text").textContent = "";
    document.querySelector("#beers-text").textContent = "";

    localStorage.clear();
  } else {
    console.log("not resetting");
  }
}
