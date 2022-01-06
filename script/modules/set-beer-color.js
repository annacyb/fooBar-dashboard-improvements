import { beerColors } from "./settings.js";

export async function setBeerMainColor() {
  // find the same beer name in beerColors object and find it's color
  let found = beerColors.beers.filter((beer) => beer.name == beerName);
  if (found.length == 0) {
    console.log("Beer not found");
  }
  return found[0].color;
}

export async function setBeerGradient(beerName) {
  // find the same beer name in beerColors object  and find it's color
  let found = beerColors.beers.filter((beer) => beer.name == beerName);
  if (found.length == 0) {
    console.log("Beer not found");
  }
  return found[0].gradient;
}
