import {
  buttonClasses,
  buttonClassesUndo,
  pokeCardClasses,
} from "./classNames.js";

export class PokeCard {
  constructor({ pokeNum, card, button, pokeName, pokeImg }) {
    this.pokeNum = pokeNum;
    this.isActive = true;
    this.card = card;
    this.cardCopy = card.cloneNode(true);
    this.pokeName = pokeName;
    this.pokeImg = pokeImg;
    this.swapButton = button;
    this.swapButton.addEventListener("click", () => {
      this.isActive = !this.isActive;
      this.display();
    });
    this.card.appendChild(this.swapButton);
  }
  display() {
    if (this.isActive) {
      const card = document.getElementById(this.pokeNum);
      card.innerHTML = this.cardCopy.innerHTML;
      card.className = pokeCardClasses.join(" ");
      this.swapButton.textContent = "✓";
      this.swapButton.className = buttonClasses.join(" ");
      card.appendChild(this.swapButton);
    } else {
      this.card.innerHTML = "";
      this.card.className = "bg-green-800 flex justify-center items-center";
      this.swapButton.textContent = "⎌";
      this.swapButton.className = buttonClassesUndo.join(" ");
      this.card.append(this.swapButton);
    }
  }
}
