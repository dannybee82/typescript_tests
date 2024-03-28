import { ImageInterface } from "../interfaces/image.interface";

export class CreateImage {

    create = (imgage: ImageInterface): HTMLImageElement => {
        const img: HTMLImageElement = document.createElement('img');
        img.id = imgage.id;
        img.src = imgage.base64;
        img.title = imgage.title;
        img.style.width = imgage.width;
        img.style.height = imgage.height;

        return img;
    }

}