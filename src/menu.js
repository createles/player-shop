import { importImages } from "./home";

const consumableImgs = importImages(require.context("./images/shop-items/consumables/", false, /\.png$/));
const mana = importImages(require.context("./images/shop-items/consumables/mana/", false, /\.png$/));
const time = importImages(require.context("./images/shop-items/consumables/time/", false, /\.png$/));

function genMenuPage() {
    const content = document.querySelector("#content");
    const contentHead = document.createElement("h1");
    contentHead.id = "contentHead";
    contentHead.textContent = "Shop Menu";

    const rect = document.createElement("div");
    rect.id = "rect";
    rect.classList.add("fade-in");

    const consumables = document.createElement("div");
    consumables.id = "consumablesCont";

    const keyCont = document.createElement("div");
    const keyWrap = document.createElement("div");
    keyWrap.classList.add("wrapper");
    keyWrap.id = "keyWrap";
    keyCont.id = "keyCont";
    keyCont.classList.add("menuBox");


    for (let item in consumableImgs) {
        const img = document.createElement("img");
        const itemBox = document.createElement("div");
        const itemName = document.createElement("div");
        itemBox.classList.add("itemBox");
        itemName.classList.add("itemName");
        itemName.textContent = item
        .replace(/\.[^/.]+$/, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase()); 
        img.src = consumableImgs[item];
        img.alt = item;
        itemBox.append(itemName);
        keyWrap.append(itemBox, img);
        keyCont.append(keyWrap);
    }

    const manaCont = document.createElement("div");
    const manaWrap = document.createElement("div");
    manaWrap.classList.add("wrapper");
    manaWrap.id = "manaWrap";
    manaCont.id = "manaCont";
    manaCont.classList.add("menuBox");

    for (let item in mana) {
        const img = document.createElement("img");
        const itemBox = document.createElement("div");
        const itemName = document.createElement("div");
        itemBox.classList.add("itemBox");
        itemName.classList.add("itemName");
        itemName.textContent = item
        .replace(/\.[^/.]+$/, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase()); 
        img.src = mana[item];
        img.alt = item;
        itemBox.append(itemName);
        manaWrap.append(itemBox, img);
        manaCont.append(manaWrap);
    }

    const timeCont = document.createElement("div");
    const timeWrap = document.createElement("div");
    timeWrap.classList.add("wrapper");
    timeWrap.id = "timeWrap";
    timeCont.id = "timeCont";
    timeCont.classList.add("menuBox");

    for (let item in time) {
        const img = document.createElement("img");
        const itemBox = document.createElement("div");
        const itemName = document.createElement("div");
        itemBox.classList.add("itemBox");
        itemName.classList.add("itemName");
        itemName.textContent = item
        .replace(/\.[^/.]+$/, "")
        .replace(/-/g, " ")
        .replace(/\b\w/g, c => c.toUpperCase()); 
        img.src = time[item];
        img.alt = item;
        itemBox.append(itemName);
        timeWrap.append(itemBox, img);
        timeCont.append(timeWrap);
    }

    consumables.append(keyCont, manaCont, timeCont);
    rect.append(consumables);
    content.append(contentHead, rect);
}

export {genMenuPage};