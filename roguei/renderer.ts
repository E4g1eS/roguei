export class Renderer {

    context : CanvasRenderingContext2D | null;

    constructor(width : number = 800, height : number = 800, element : HTMLElement | null = null) {
        let canvas = document.createElement("canvas");
        //this.canvas.style.width = width.toString();
        //this.canvas.style.height = height.toString();
        this.context = canvas.getContext("2d");

        if (!this.context)
            throw new Renderer.No2DContextError();
        
        this.context.canvas.width = width;
        this.context.canvas.height = height;

        if (element)
            element.appendChild(this.context.canvas);

        else
            document.body.appendChild(this.context.canvas);
    }

    static No2DContextError = class extends Error {
        constructor() {
            super("Program could not create 2D context on canvas element.");
        }
    }
}