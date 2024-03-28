import { CreateButtons } from "../functions/create-buttons";
import { CreateImage } from "../functions/create-image";
import { ReadFile } from "../functions/read-file";
import { ImageInterface } from "../interfaces/image.interface";

export class InitReadFile {

    private _targetInputSelectFile: string = "selectFile";
    private _targetPreviewImage: string = "previewImage";

    private _readFile: ReadFile = new ReadFile();
    private _createImage: CreateImage = new CreateImage();
    private _createButtons: CreateButtons = new CreateButtons();

    constructor() {
        this.addChangeListener(this._targetInputSelectFile);
    }
    
    addChangeListener = (targetId: string): void => {
        const elem: HTMLElement | null =  document.getElementById(targetId);
    
        if(elem != null && elem instanceof HTMLInputElement) {
            const input: HTMLInputElement = elem as HTMLInputElement;
            input.addEventListener("change", () => this.loadFiles(input.files ?? null), false);
        }
    }

    private loadFiles(data: FileList | null): void {
        if(data != null) {
            for(let i = 0; i < data.length; i++) {
                this._readFile.readFile(data[i]).then((result: string) => {
                    if(result) {
                        this.addImage(this._targetPreviewImage, result);
                    }
                });
            }
        }      
    }

    private addImage = (targetId: string, base64: string): void => {
        let elem: HTMLElement | null =  document.getElementById(targetId);
    
        if(elem) {
            const count: number = this.countImages();

            const img: ImageInterface = { 
                id: 'image_' + count,
                base64: base64,
                title: 'Preview image', 
                width: '250px', 
                height: 'auto'
            };

            elem.appendChild(this._createImage.create(img));

            const button = this._createButtons.createButton('remove_image' + count, 'Remove Image');
            button.addEventListener('click', () => this.removeImageAndButton('image_' + count, 'remove_image' + count), false);
                
            elem.appendChild(button);
        }  
    }

    private countImages = (): number => {
        let elem: HTMLElement | null =  document.getElementById(this._targetPreviewImage);

        if(elem) {
            let images: HTMLCollectionOf<HTMLImageElement> = elem.getElementsByTagName('img');
            return images.length;
        }

        return 0;
    }

    private removeImageAndButton = (imageId: string, buttonId: string): void => {
        let elem: HTMLElement | null =  document.getElementById(this._targetPreviewImage);

        if(elem) {
            let images: HTMLCollectionOf<HTMLImageElement> = elem.getElementsByTagName('img');
            let buttons: HTMLCollectionOf<HTMLButtonElement> = elem.getElementsByTagName('button');

            this.removeElement(elem, imageId, images);
            this.removeElement(elem, buttonId, buttons);
        }
    }

    private removeElement = (parentElement: HTMLElement, elementId: string, elements: HTMLCollectionOf<HTMLImageElement | HTMLButtonElement>): void => {
        for(let i = 0; i < elements.length; i++) {
            if(elements[i].id === elementId) {
                parentElement.removeChild(elements[i]);
            }
        }
    }

}