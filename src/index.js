import './styles.css';

import {genHomePage, checkedHomePage} from './home';

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

window.addEventListener("load", () => {
    document.body.classList.remove("loading");
});
