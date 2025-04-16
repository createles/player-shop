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
    const HOLD_TIME = 3000;

    function setProgress(percent) {
        progressBar.style.width = `${percent * 100}%`;
    }

    // Logic for click&hold behavior for Thumbprint Scanner
    let holdTimer;
    // Mousedown eventListener to trigger setTimeout()
    thumbScanner.addEventListener("mousedown", () => {
        
        // 1. setTimeout logic for callback behavior
        holdTimer = setTimeout(() => {
            console.log("Identity verified. Player shop is now available.");
            // Nav buttons made visible after identification confirmed
            navButtons.forEach(button => button.classList.add("faded"));
            // set transition for font color on scan completion
            navButtons.forEach(button => button.style.textShadow = "0px 0px 10px #20b2ab");
            navButtons.forEach(button => button.style.transition = "color 1s ease, text-shadow 1s ease");
            navButtons.forEach(button => button.style.color = "rgba(255, 255, 255)");
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
    });

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

    heading.textContent = "System Shop"
    heading.title = "none";
    heading.classList.remove("glitched");
    welcomeMsg.id ="welcomeMsg";
    welcomeMsg.textContent = "Welcome to the Player Shop."
    dealsContainer.id = "dealsContainer";
    dealsTitle.id = "dealsTitle";
    dealsTitle.textContent = "Today's deals"
    setDeal.id = "setDeal";

    void heading.offsetWidth;

    // adds fade-in effect
    heading.classList.add("fade-in");
    welcomeMsg.classList.add("fade-in");
    dealsContainer.classList.add("fade-in");
    dealsTitle.classList.add("fade-in");

    // shopDeals = 

    dealsContainer.append(dealsTitle, setDeal);
    rect.append(welcomeMsg, dealsContainer);
    content.append(heading, rect);

    // call setDealComponents AFTER appending setDeal to the DOM
    setDealComponents();
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
const images = importImages(require.context("./images/shop-items", false, /\.png$/));

// Imports all the kargalgan set images into its own image-set object
const kargSet = importImages(require.context("./images/shop-items", false, /^\.\/kargalgan.*\.png$/));

function setDealComponents() {
    const setDeal = document.querySelector("#setDeal");

    const descBox = document.createElement("div");
    const setName = document.createElement("p");
    const setPrice = document.createElement("p");
    
    setName.textContent = "Almighty Kargalgan Set";
    setName.classList.add("itemName");
    setPrice.textContent = "3000 gems";
    descBox.append(setName, setPrice);
    setDeal.append(descBox);

    for (let item in kargSet) {
        const img = document.createElement('img');
        img.src = images[item];
        img.alt = item;
        setDeal.append(img);
    }
}

export {genHomePage, checkedHomePage};