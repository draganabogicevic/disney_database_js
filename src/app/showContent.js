import { fetchAllCharacters, fetchSearchedCharacter } from "../service/api";
import Character from "../entities/Character";
import { observer, removeItemFromArray } from "../helpers/helpers";
import { uniq } from "lodash-es";

export let favoritesCharacters = [];
const prevSelectedToFav = JSON.parse(localStorage.getItem("favCharacters"));
const getDataFromApi = async (page) => {
  let arrayOfCharacters = [];
  await fetchAllCharacters(page).then((data) => {
    data.forEach((c) => {
      const caracter = new Character(c);
      arrayOfCharacters.push(caracter);
    });
  });
  return arrayOfCharacters;
};

export const showContent = (page, cardContainer, container) => {
  container.innerHTML = "";
  cardContainer.innerHTML = "";
  getDataFromApi(page).then((data) => {
    data.forEach((c) => {
      showCardsInGrid(c, cardContainer, container);
    });
    cardContainer.addEventListener("click", (e) => showDetails(e, data));
    cardContainer.addEventListener("click", (e) => {
      handleFavoriteSelect(e, data);
    });
  });
};

export const showCardsInGrid = (character, cardContainer, container) => {
  prevSelectedToFav.forEach((c) => {
    if (c.id === character.id) {
      character.toggleBookmark();
    }
  });
  const card = document.createElement("div");
  card.classList.add("card", "invisible");
  card.setAttribute("data-id", character.id);
  const icon = character.bookmarked ? "heart" : "heart-outline";
  card.innerHTML = `<div style="width: 100%; height: 80%; background-image: url('${character.image}'); background-size: cover; background-repeat: no-repeat;)"></div><h4 class='characterName'>${character.name}</h4>
  <div id=${character.id} class="cardControls"><div class="iconWrapper"><ion-icon data-id=${character.id}  class="heart" name=${icon}></ion-icon></div><button class="button details">Details</button></div>`;
  cardContainer.append(card);
  document.querySelectorAll(".card").forEach((card) => {
    observer.observe(card);
  });
  container.append(cardContainer);
};

export const showDetails = (e, characters) => {
  const selectedCard = e.target.closest(".card");
  const selectedId = parseInt(selectedCard.getAttribute("data-id"));
  const buttonElement = e.target.closest(".button.details");
  if (!buttonElement) return;
  let selected;
  characters.forEach((c) => {
    if (selectedId === c.id) {
      selected = c;
    }
  });
  const modal = document.querySelector(".modal");
  modal.classList.remove("hidden");
  modal.innerHTML = `<img src=${selected.image} class="modalImg" /><div class="characterDeatils"><p>Name: ${selected.name}</p>
              <p>Films: ${selected.films}</p><button class="button modalBtn">Close</button></div>`;
  document
    .querySelector(".button.modalBtn")
    .addEventListener("click", () => modal.classList.add("hidden"));
};

function handleFavoriteSelect(e, characters) {
  console.log("target is ", e.target);
  // const selectedCard = e.target.closest(".card");
  // const selectedId = parseInt(selectedCard.getAttribute("data-id"));
  const favorite = e.target;
  const selectedId = parseInt(favorite.getAttribute("data-id"));
  if (!favorite) return;
  let selected;
  characters.forEach((c) => {
    if (selectedId === c.id) {
      selected = c;
      console.log(selected);
    }
    selected.toggleBookmark();
  });
  const icon = selected.bookmarked ? "heart" : "heart-outline";
  favorite.innerHTML = `<ion-icon class="heart" name="${icon}"></ion-icon>`;

  if (selected.bookmarked) {
    favoritesCharacters = [...favoritesCharacters, selected];
  } else {
    favoritesCharacters = removeItemFromArray(favoritesCharacters, selected.id);
  }
  favoritesCharacters = uniq(favoritesCharacters);
  const lsData = JSON.stringify(favoritesCharacters);
  localStorage.setItem("favCharacters", lsData);
}

const searchInput = document.querySelector(".search");

searchInput.addEventListener("change", (e) => {
  const searchStr = e.target.value;
  fetch(`https://api.disneyapi.dev/character?name=${searchStr}`)
    .then((response) => response.json())
    .then((data) => console.log(data));
});
