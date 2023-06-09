import { Debug, Vector2 } from "./primitives.js";

/**
 * List of files to be automatically loaded at game start as images.
 */
const IMAGE_FILES = [
    "deep-water.png",
    "grass.png",
    "mountains.png",
    "sand.png",
    "snow.png",
    "trees.png",
    "water.png",
];

/**
 * Helper containing HTML image element and it's "name".
 */
interface NamedImageElement {
    name: string;
    element: HTMLImageElement;
};

export class MetaImage {
    readonly name: string;
    readonly size: Vector2;

    constructor(name: string, size: Vector2) {
        this.name = name;
        this.size = size;
    }
};

/**
 * Singleton for image loading.
 */
export class ImageLoader {
    private static _instance: ImageLoader;

    private _root = "../images/";
    private _images = new Map<string, ImageBitmap>();

    private constructor() {}

    public static GetInstance() {
        if (!ImageLoader._instance)
            ImageLoader._instance = new ImageLoader();

        return ImageLoader._instance;
    }

    /**
     * Returns a promise with loaded ImageType.
     * @param path Path (including extension).
     * @returns Promise containing loaded <img> and its name (= path).
     */
    private LoadDataFrom(path: string) {
        return new Promise<NamedImageElement>((resolve, reject) => {
            const imageElement = new Image();
            imageElement.onload = () => resolve({name: path, element: imageElement});
            imageElement.onerror = reject;
            imageElement.src = this._root + path;
        });
    }

    /**
     * Loads all image files present in the IMAGE_FILES array.
    */
    public async LoadAll() {
        const promises = new Array<Promise<NamedImageElement>>();

        for (let imageFilePath of IMAGE_FILES) {
            const promise = this.LoadDataFrom(imageFilePath);
            promises.push(promise);
        }

        const imageTypes = await Promise.all(promises);

        for (const imageType of imageTypes) {
            let imageData = this.LoadImageData(imageType.element);
            const bitmap = await createImageBitmap(imageData);
            this._images.set(imageType.name, bitmap);
            Debug(`Loaded "${imageType.name}"`, 4);
        }
    }

    /**
     * Converts content of <img> to ImageData.
     * @param imageElement Input element.
     * @returns Raw ImageData.
     */
    private LoadImageData(imageElement: HTMLImageElement) {
        let tmpCanvas = document.createElement("canvas");
        tmpCanvas.width = imageElement.width;
        tmpCanvas.height = imageElement.height;
        
        let tmpContext = tmpCanvas.getContext("2d");
        if (!tmpContext)
            throw new Error("Could not create virtual canvas.");

        tmpContext.drawImage(imageElement, 0, 0);
        return tmpContext.getImageData(0, 0, imageElement.width, imageElement.height);
    }

    /**
     * Returns reference to the requested image, the image must be loaded.
     * @param name Name of the image.
     * @returns An instance of image that can be drawn by renderer.
     */
    public GetImageReference(name: string) {
        const metaImage = this._images.get(name);

        if (!metaImage)
            throw new Error(`There is no image "name"!`);

        return new MetaImage(name, new Vector2(metaImage.width, metaImage.height));
    }

    /**
     * Returns ImageBitmap of the requested DrawableImage.
     */
    public GetImageBitmap(drawable: MetaImage) {
        const imageData = this._images.get(drawable.name);

        if (!imageData)
            throw new Error(`The DrawableImage ${drawable.name} is not loaded!`);

        return imageData;
    }
};