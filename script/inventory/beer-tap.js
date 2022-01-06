import { setBeerGradient } from "../modules/set-beer-color";

export function prepareTapStatus(tapStock) {
  // Resets the list
  const list = document.querySelector(".tap-list");
  list.innerHTML = "";

  // Show updated list
  tapStock.forEach((beer) => {
    showTapStatus(beer);
  });
}

async function showTapStatus(beerObject) {
  const list = document.querySelector(".tap-list");
  const template = document.querySelector(".template-tap").content.cloneNode(true);

  const { level, capacity, beer } = beerObject;

  //get the beer color from the json file
  const beerColor = await setBeerGradient(beer);

  //calculate the percentage with level and capacity
  template.querySelector(".tap-amount").textContent = Math.round((level / capacity) * 100) + "%";

  template.querySelector(".tap-name").textContent = beer;
  template.querySelector(".circle").style.background = beerColor;
  list.append(template);
}
