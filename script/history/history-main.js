import { refresh_rate } from "../modules/settings.js";
import { hideLoader } from "../modules/loader.js";
import { historyOrders } from "../modules/history-orders";

window.addEventListener("DOMContentLoaded", start);

async function start() {
  loop();
}

function showData(orders) {
  displayList(orders);
}

async function loop() {
  const ordersHistory = historyOrders.orders;
  showData(ordersHistory);
  hideLoader();
  setTimeout(loop, refresh_rate);
}

function displayList(orders) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";

  // build a new list
  orders.forEach(displayOrder);
}

function displayOrder(order) {
  console.log(order.id);
  // create clone
  const clone = document.querySelector("template#order").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=id]").textContent = order.id;
  clone.querySelector("[data-field=date]").textContent = order.date;
  clone.querySelector("[data-field=time]").textContent = order.served;
  clone.querySelector("[data-field=value]").textContent = order.value;
  clone.querySelector("[data-field=bartender]").textContent = order.bartender;

  //   clone.querySelector("[data-field=id]").addEventListener("click", () => showPopUp(order));
  //   closePop.addEventListener("click", () => (popup.style.display = "none"));

  document.querySelector("#list tbody").appendChild(clone);
}
