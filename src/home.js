import ThumbImage from './images/thumbprint-3.svg';

const home = document.querySelector("#home");
const menu = document.querySelector("#menu");
const about = document.querySelector("#about");

const navButtons = [home, menu, about];

function genHomePage() {
    const content = document.querySelector("#content");

    const heading = document.createElement("h1");

    heading.id = "contentHead";
    heading.textContent = "System: Authentication Required";
    heading.title = "System: Authentication Required";

    const rect = document.createElement("div");

    rect.id = "rect";

    const confirmNotif = document.createElement("div");
    confirmNotif.id = "confirmNotif";

    const exclamation = document.createElement("div");
    exclamation.id = "exclamation";
    exclamation.textContent = "!";

    const confirmCaption = document.createElement("div");
    confirmCaption.id = "confirmCaption";
    confirmCaption.textContent = "CONFIRM PLAYER IDENTITY"
    
    const printScanner = document.createElement("div");
    printScanner.id = "printScanner";

    const thumbScanner = document.createElement("img");
    thumbScanner.src = ThumbImage;
    thumbScanner.alt = "Thumbprint Scanner";
    // Logic for click&hold behavior for Thumbprint Scanner
    let holdTimer;
    // Mousedown eventListener to trigger setTimeout()
    thumbScanner.addEventListener("mousedown", () => {
        holdTimer = setTimeout(() => {
            console.log("Identity verified. Player shop is now available.");
            // Nav buttons made visible after identification confirmed
            navButtons.forEach(button => button.style.background = "none");
            navButtons.forEach(button => button.style.color = "rgba(255, 255, 255)");
        }, 3000);
    });
    // Mouseup eventListener set to clear holdTimer on mouse up
    thumbScanner.addEventListener("mouseup", () => {
        clearTimeout(holdTimer);
    });

    // Mouseleave eventListener set to clear holdTimer if mouse leaves scanner
    thumbScanner.addEventListener("mouseleave", () => {
        clearTimeout(holdTimer);
    });
    
    confirmNotif.append(exclamation, confirmCaption);
    printScanner.append(thumbScanner);
    rect.append(confirmNotif, printScanner);
    content.append(heading, rect);
}

export default genHomePage;