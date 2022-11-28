import {
  showContent,
  showCardsInGrid,
  showDetails,
  handleFavoriteSelect,
} from "./app/showContent";

let page = 1;
const container = document.querySelector(".container");
const cardContainer = document.createElement("div");
const cardContainerForFav = document.createElement("div");
const cardContainer3 = document.createElement("div");
cardContainer.classList.add("cardContainer");
cardContainerForFav.classList.add("cardContainer");
cardContainer3.classList.add("cardContainer");

const controlButtonPrev = document.querySelector(".button.prev");
const controlButtonNext = document.querySelector(".button.next");
const favorite = document.querySelector(".favorite");
const disneyLogo = document.querySelector(".disneyLogo");

favorite.addEventListener("click", () => {
  container.innerHTML = "";
  cardContainerForFav.innerHTML = "";
  const dataToShow = JSON.parse(localStorage.getItem("favCharacters"));
  dataToShow.forEach((character) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.setAttribute("data-id", character.id);
    const icon = character.bookmarked ? "heart" : "heart-outline";
    card.innerHTML = `<div style="width: 100%; height: 80%; background-image: url('${character.image}'); background-size: cover; background-repeat: no-repeat;)"></div><h4 class='characterName'>${character.name}</h4>
    <div id=${character.id} class="cardControls"><div class="iconWrapper"><ion-icon  class="heart" name=${icon}></ion-icon></div><button class="button details">Details</button></div>`;
    cardContainerForFav.append(card);

    cardContainerForFav.addEventListener("click", (e) =>
      showDetails(e, dataToShow)
    );
    // cardContainerForFav.addEventListener("click", (e) => {
    //   handleFavoriteSelect(e, dataToShow);
    // });
  });
  container.append(cardContainerForFav);
});

controlButtonPrev.addEventListener("click", () => {
  page -= 1;
  if (page <= 1) {
    page = 1;
  }
  showContent(page.toString(), cardContainer, container);
});

controlButtonNext.addEventListener("click", () => {
  page += 1;
  console.log(page.toString());
  if (page >= 149) {
    page = 149;
  }
  showContent(page.toString(), cardContainer, container);
});

disneyLogo.addEventListener("click", () =>
  showContent("1", cardContainer3, container)
);

showContent("1", cardContainer, container);
