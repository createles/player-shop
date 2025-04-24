function genAboutPage() {
    const content = document.querySelector("#content");
    const contentHead = document.createElement("h1");
    contentHead.id = "contentHead";
    contentHead.classList.add("fade-in");
    contentHead.textContent = "What is this?";

    const rect = document.createElement("div");
    rect.id = "rect";

    const aboutDesc = document.createElement("div");
    aboutDesc.id = "aboutDesc";
    aboutDesc.classList.add("fade-in");

    const aboutTxt = document.createElement("p");
    aboutTxt.id = "aboutTxt";
    aboutTxt.textContent = "This webpage is a sample player store for the Webtoon series 'Solo Leveling' and was served via bundling through Webpack."

    const attrib = document.createElement("p");
    attrib.id = "attrib";
    attrib.classList.add("fade-in");
    attrib.textContent = "Clean CSS Glitch effect by Piotr Galor https://codepen.io/pgalor/pen/OeRWJQ";

    aboutDesc.append(aboutTxt);
    rect.append(aboutDesc, attrib);
    content.append(contentHead, rect);
}

export {genAboutPage};
