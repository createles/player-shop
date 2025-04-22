import './styles.css';

import {genHomePage, checkedHomePage} from './home';
import { genMenuPage } from './menu';

document.addEventListener("DOMContentLoaded", () => {
    genHomePage();
});

const content = document.querySelector("#content");
const home = document.querySelector("#home");
const menu = document.querySelector("#menu");
const about = document.querySelector("#about");

const buttons = [home, menu, about];

function clearTab() {
    content.innerHTML = "";
}

buttons.forEach(button => button.addEventListener("click", clearTab));

menu.addEventListener("click", genMenuPage);

window.addEventListener("load", () => {
    document.body.classList.remove("loading");
});
