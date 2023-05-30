export class Renderer {

    div : HTMLDivElement;

    constructor(width : number = 800, height : number = 800, element : HTMLElement | null = null) {
        this.div = document.createElement("div");
        this.div.style.width = width.toString();
        this.div.style.height = height.toString();

        
        if (element)
            element.appendChild(this.div);

        else
            document.body.appendChild(this.div);
    }
}