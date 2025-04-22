function genMenuPage() {
    const content = document.querySelector("#content");
    const rect = document.createElement("div");
    rect.id = "rect";
    rect.content = "hello";

    content.append(rect);
}

export {genMenuPage};