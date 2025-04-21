import ThumbImage from './images/thumbprint-3.svg';

const home = document.querySelector("#home");
const menu = document.querySelector("#menu");
const about = document.querySelector("#about");

const navButtons = [home, menu, about];

function genHomePage() {
    const content = document.querySelector("#content");

    const heading = document.createElement("h1");

    heading.id = "contentHead";
    heading.classList.add("glitched");
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
    
    // Thumbprint Scanner elements
    const printScanner = document.createElement("div");
    printScanner.id = "printScanner";
    const thumbScanner = document.createElement("img");
    thumbScanner.src = ThumbImage;
    thumbScanner.alt = "Thumbprint Scanner";
    const progressContainer = document.createElement("div");
    progressContainer.id = "progressContainer";
    const progressBar = document.createElement("div");
    progressBar.id = "progressBar";

    // Thumbprint Scanner behavior

    // Define progress bar variables
    let startTime, animationFrame;

    // thumbscanner required hold time
    const HOLD_TIME = 1500;

    function setProgress(percent) {
        progressBar.style.width = `${percent * 100}%`;
    }

    // Logic for click&hold behavior for Thumbprint Scanner
    let holdTimer;
    // Mousedown eventListener to trigger setTimeout()
    thumbScanner.addEventListener("mousedown", verificationProcess);
    thumbScanner.addEventListener("touchstart", e => {
        e.preventDefault();
        verificationProcess();
});
    // callback function for hold behavior;
    function verificationProcess() {
                // 1. setTimeout logic for callback behavior
                holdTimer = setTimeout(() => {
                    console.log("Identity verified. Player shop is now available.");
                    // Nav buttons made visible after identification confirmed
                    navButtons.forEach(button => button.classList.add("faded"));
                    // set transition for font color on scan completion
                    navButtons.forEach(button => button.style.textShadow = "0px 0px 10px #20b2ab");
                    navButtons.forEach(button => button.style.transition = "color 1s ease, text-shadow 1s ease");
                    navButtons.forEach(button => button.style.color = "rgba(255, 255, 255)");
                    navButtons.forEach(button => button.style.cursor = "pointer");
                    // adds fade out effect to the elements
                    printScanner.style.opacity = "0";
                    progressContainer.style.opacity = "0";
                    confirmNotif.style.opacity = "0";
                    heading.style.opacity = "0";
                }, HOLD_TIME);
        
                // 2. progressBar fill behavior
                progressBar.style.transition = "none";
        
                startTime = performance.now();
        
                function updateProgress(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / HOLD_TIME, 1);
                    setProgress(progress);
        
                    if (progress < 1) {
                        animationFrame = requestAnimationFrame(updateProgress);
                    }
                }
        
                animationFrame = requestAnimationFrame(updateProgress);
            }

    // removes the thumbprint after the transition
    printScanner.addEventListener("transitionend", () => {
        printScanner.remove();
    })

    // removes the progressBar ONLY when the opacity is changed, and not for any other transitions
    progressContainer.addEventListener("transitionend", function handler(e) {
        if (e.propertyName === "opacity") {
            progressContainer.remove();
        }
    });

    // remove notification on completion of scan
    confirmNotif.addEventListener("transitionend", () => {
        confirmNotif.remove();
        checkedHomePage();
    })

    function resetProgress() {
        clearTimeout(holdTimer);
        cancelAnimationFrame(animationFrame);
        progressBar.style.transition = "width 0.3s ease";
        setProgress(0);
    }
    // Mouseup eventListener set to clear holdTimer and reset progressBar on mouse up
    thumbScanner.addEventListener("mouseup", resetProgress);

    // Mouseleave eventListener set to clear holdTimer and reset progressBar if mouse leaves scanner
    thumbScanner.addEventListener("mouseleave", resetProgress);

    // handles touch input; when touch is released early, reset progress
    thumbScanner.addEventListener("touchend", resetProgress);
    
    confirmNotif.append(exclamation, confirmCaption);
    printScanner.append(thumbScanner);
    progressContainer.append(progressBar);
    rect.append(confirmNotif, printScanner, progressContainer);
    content.append(heading, rect);
}

function checkedHomePage() {
    const content = document.querySelector("#content");
    const heading = document.querySelector("#contentHead");
    const rect = document.querySelector("#rect");
    const welcomeMsg = document.createElement("div");
    const dealsTitle = document.createElement("div");
    const dealsContainer = document.createElement("div");
    const setDeal = document.createElement("div");
    const weaponDeals = document.createElement("div");

    heading.textContent = "System Shop"
    heading.title = "none";
    heading.classList.remove("glitched");
    welcomeMsg.id ="welcomeMsg";
    welcomeMsg.textContent = "Welcome to the Player Shop."
    dealsContainer.id = "dealsContainer";
    dealsTitle.id = "dealsTitle";
    dealsTitle.textContent = "Today's deals"
    setDeal.id = "setDeal";
    weaponDeals.id = "weaponDeals";

    void heading.offsetWidth;

    // adds fade-in effect
    heading.classList.add("fade-in");
    welcomeMsg.classList.add("fade-in");
    dealsContainer.classList.add("fade-in");
    dealsTitle.classList.add("fade-in");

    // shopDeals = 

    dealsContainer.append(dealsTitle, setDeal, weaponDeals);
    rect.append(welcomeMsg, dealsContainer);
    content.append(heading, rect);

    // call setDealComponents AFTER appending setDeal to the DOM
    setDealComponents();
    weaponDealsComponents();
}

// function to import images from the images directory
// r will be our CONTEXT for our images (meaning the scope of the image files included in the import)
function importImages(r) {
    // initialize empty object to house our images
    let images = {};
    // given a certain condition/context, populate our image-set object with the appropriate files
    r.keys().forEach((key) => {
        // must remove ./ added by webpack to the start of every file name
        const cleanedKey = key.replace('./', '');
        // populate our image-set object by setting the key and the value pairs
        images[cleanedKey] = r(key);
    });
    return images; 
}

// Imports all our png images in the images/shop-items folder
const saleWeapons = importImages(require.context("./images/shop-items/weapon-choices", false, /\.png$/));

// Imports all the kargalgan set images into its own image-set object
const kargSet = importImages(require.context("./images/shop-items", false, /^\.\/kargalgan.*\.png$/));

function setDealComponents() {
    const setDeal = document.querySelector("#setDeal");

    const descBox = document.createElement("div");
    descBox.id = "descBox";
    const setName = document.createElement("p");
    const setPrice = document.createElement("p");
    
    setName.textContent = "Almighty Kargalgan Set";
    setName.classList.add("itemName");
    setPrice.textContent = "3000 gems";
    setPrice.classList.add("itemPrice");
    descBox.append(setName, setPrice);
    setDeal.append(descBox);

    const setContainer = document.createElement("div");
    setContainer.id = "setContainer";
    setDeal.append(setContainer);

    for (let item in kargSet) {
        const img = document.createElement('img');
        img.src = kargSet[item];
        img.alt = item;
        setContainer.append(img);
    }
}

function weaponDealsComponents() {
    const weaponDeals = document.querySelector("#weaponDeals");
    const descBoxWeapon = document.createElement("div");
    descBoxWeapon.id = "descBoxWeapon";
    const weaponDealName = document.createElement("p");
    const weaponDealPrice = document.createElement("p");

    weaponDealName.textContent = "Random S+ Rank Weapon";
    weaponDealName.classList.add("itemName");
    weaponDealPrice.textContent = "500 gems";
    weaponDealPrice.classList.add("itemPrice");
    descBoxWeapon.append(weaponDealName, weaponDealPrice);
    weaponDeals.append(descBoxWeapon);

    const weaponChoices = document.createElement("div");
    weaponChoices.id = "weaponChoices";
    weaponDeals.append(weaponChoices);

    for (let weapon in saleWeapons) {
        const img = document.createElement('img');
        const weaponBox = document.createElement("div");
        const weaponName = document.createElement("div");
        weaponBox.id = "weaponBox";
        weaponName.id = "weaponName";
        weaponName.textContent = weapon
        .replace(/\.[^/.]+$/, "")
        .replace(/-/g, " ")
        // capitalizes the first letter of every word
        // by identifying word boundaries (\b) and a word character
        // that follows (\w) and runs toUpperCase to it
        .replace(/\b\w/g, c => c.toUpperCase()); 
        img.src = saleWeapons[weapon];
        img.alt = weapon;
        weaponBox.append(img, weaponName);
        weaponChoices.append(weaponBox);
    }
}

export {genHomePage, checkedHomePage};