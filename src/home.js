import ThumbImage from './images/thumbprint-3.svg';

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
    
    confirmNotif.append(exclamation, confirmCaption);
    printScanner.append(thumbScanner);
    rect.append(confirmNotif, printScanner);
    content.append(heading, rect);
}

export default genHomePage;