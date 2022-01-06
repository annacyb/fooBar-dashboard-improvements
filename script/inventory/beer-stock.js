export function prepareBeerStock(beersInStock) {
  // Resets the list
  const list = document.querySelector(".stock-list");
  list.innerHTML = "";

  // Show updated list
  beersInStock.forEach((beer) => {
    showBeerStock(beer);
  });
}

async function showBeerStock(beerObject) {
  const list = document.querySelector(".stock-list");
  const template = document.querySelector(".template-stock").content.cloneNode(true);

  const { name, amount } = beerObject;
  template.querySelector(".stock-name").textContent = name;
  template.querySelector(".stock-amount").textContent = amount;

  list.append(template);
}
