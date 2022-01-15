import { refresh_rate } from "../modules/settings.js";
import { hideLoader } from "../modules/loader.js";
import { historyOrders } from "../modules/history-orders";

window.addEventListener("DOMContentLoaded", start);
let popup = document.querySelector("#info-box");
let ordersHistory = historyOrders.orders;

const settings = {
  filter: "all",
  sortBy: "id",
  sortDir: "asc",
};

async function start() {
  registerButtons();
  loop();
}

function registerButtons() {
  document.querySelectorAll("[data-action='sort']").forEach((button) => button.addEventListener("click", selectSort));
}

function showData(orders) {
  displayList(orders);
}

async function loop() {
  ordersHistory = historyOrders.orders;
  showData(ordersHistory);
  hideLoader();
  setTimeout(loop, refresh_rate);
}

////----- SORTING ------- ////

function selectSort(event) {
  const sortBy = event.target.dataset.sort;
  const sortDir = event.target.dataset.sortDirection;

  //adding styling- indicator of how it is sorted at the moment
  //find old sort b
  const old = document.querySelector(`[data-sort="${settings.sortBy}"]`);
  old.classList.remove("sortby");
  //indicate active sort
  event.target.classList.add("sortby");

  //toggle the direction
  if (sortDir === "asc") {
    event.target.dataset.sortDirection = "desc";
  } else {
    event.target.dataset.sortDirection = "asc";
  }

  console.log(`user selected ${sortBy} ${sortDir}`);
  setSort(sortBy, sortDir); // sending  two parameters to the setSort function
}

function setSort(sortBy, sortDir) {
  settings.sortBy = sortBy; // adding those parameters to the global object
  settings.sortDir = sortDir;
  buildList();
}

function sortList(sortedList) {
  let direction = 1;

  if (settings.sortDir === "desc") {
    direction = -1;
  } else {
    direction = 1;
  }

  sortedList = sortedList.sort(sortByProperty);

  function sortByProperty(A, B) {
    if (A[settings.sortBy] < B[settings.sortBy]) {
      return -1 * direction;
    } else {
      return 1 * direction;
    }
  }

  return sortedList;
}

function buildList() {
  const sortedList = sortList(ordersHistory);
  displayList(sortedList);
}

function displayList(orders) {
  // clear the list
  document.querySelector("#list tbody").innerHTML = "";
  // build a new list
  orders.forEach(displayOrder);
}

function displayOrder(order) {
  console.log(order);
  // create clone
  const clone = document.querySelector("template#order").content.cloneNode(true);

  // set clone data
  clone.querySelector("[data-field=id]").textContent = "#" + order.id;
  clone.querySelector("[data-field=date]").textContent = order.date;
  clone.querySelector("[data-field=time]").textContent = order.served;
  clone.querySelector("[data-field=value]").textContent = order.value + " DKK";
  clone.querySelector("[data-field=bartender]").textContent = order.bartender;

  const details = order.details;

  clone.querySelector("#row").addEventListener("click", () => showPopUp(details, order.id));
  //   closePop.addEventListener("click", () => (popup.style.display = "none"));

  document.querySelector("#list tbody").appendChild(clone);
}

////----- POP UP ------- ////

function showPopUp(order, id) {
  const lineBreak = order.join("<br> ");
  popup.classList.remove("hidden");
  document.querySelector("#list").style.width = "100%";

  popup.querySelector(".beer").innerHTML = lineBreak;
  popup.querySelector("#order-id").innerHTML = "&#9432 ORDER  #" + id;
  popup.querySelector(".total").innerHTML = "Total: " + order.length * 40 + " DKK";

  document.querySelector("#close-btn").addEventListener("click", hidePopup);
}

function hidePopup() {
  popup.classList.add("hidden");
  document.querySelector("#list").style.width = "131%";
}
