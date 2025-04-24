import './styles.css';

import {genHomePage, checkedHomePage} from './home';
import { genMenuPage } from './menu';
import { genAboutPage } from './about';

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

home.addEventListener("click", () => {
    const contentHead = document.createElement("h1");
    contentHead.id = "contentHead";
    const rect = document.createElement('div');
    rect.id = "rect";
    content.append(contentHead, rect);
    checkedHomePage();
})

menu.addEventListener("click", genMenuPage);

about.addEventListener("click", genAboutPage);

window.addEventListener("load", () => {
    document.body.classList.remove("loading");
});
