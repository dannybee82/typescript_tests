import { CreateButtons } from "../functions/create-buttons";
import { CreateImage } from "../functions/create-image";
import { ReadFile } from "../functions/read-file";
import { ImageInterface } from "../interfaces/image.interface";

export class InitReadFile {

    private _targetInputSelectFile: string = ".select-file-input";
    private _targetPreviewImage: string = ".preview-image";

    private _readFile: ReadFile = new ReadFile();
    private _createImage: CreateImage = new CreateImage();
    private _createButtons: CreateButtons = new CreateButtons();

    constructor() {
        this.addChangeListener();
    }
    
    private addChangeListener(): void {
        const element: HTMLElement | null =  document.querySelector(this._targetInputSelectFile);
    
        if(element != null && element instanceof HTMLInputElement) {
            const input: HTMLInputElement = element as HTMLInputElement;
            input.addEventListener("change", () => this.loadFiles(input.files ?? null), false);
        }
    }

    private loadFiles(data: FileList | null): void {
        if(data != null) {
            for(let i = 0; i < data.length; i++) {
                this._readFile.readFile(data[i]).then((result: string) => {
                    if(result) {
                        this.addImage(result);
                    }
                });
            }

            this.removeSelectedFiles();
        }      
    }

    private addImage(base64: string): void {
        let element: HTMLElement | null =  document.querySelector(this._targetPreviewImage);
    
        if(element) {
            const count: number = this.countImages();

            const img: ImageInterface = { 
                className: 'image_' + count,
                base64: base64,
                title: 'Preview image', 
                width: '250px', 
                height: 'auto'
            };

            element.appendChild(this._createImage.create(img));

            const button = this._createButtons.createButton('remove_image' + count, 'Remove Image');
            button.id = 'remove-button';
            button.addEventListener('click', () => this.removeImageAndButton('image_' + count, 'remove_image' + count), false);                
            element.appendChild(button);
        }  
    }

    private countImages(): number {
        let element: HTMLElement | null =  document.querySelector(this._targetPreviewImage);

        if(element) {
            let images: NodeListOf<HTMLImageElement> = element.querySelectorAll('img');
            return images.length;
        }

        return 0;
    }

    private removeImageAndButton(imageClass: string, buttonClass: string): void {
        let elem: HTMLElement | null =  document.querySelector(this._targetPreviewImage);

        if(elem) {
            let images: NodeListOf<HTMLImageElement> = elem.querySelectorAll('img');
            let buttons: NodeListOf<HTMLButtonElement> = elem.querySelectorAll('button');

            this.removeElement(elem, imageClass, images);
            this.removeElement(elem, buttonClass, buttons);
        }
    }

    private removeElement(parentElement: HTMLElement, className: string, elements: NodeListOf<HTMLImageElement | HTMLButtonElement>): void {
        for(let i = 0; i < elements.length; i++) {
            if(elements[i].className === className) {
                parentElement.removeChild(elements[i]);
            }
        }
    }

    private removeSelectedFiles(): void {
        const element: HTMLElement | null =  document.querySelector(this._targetInputSelectFile);

        if(element) {
            const input: HTMLInputElement = element as HTMLInputElement;
            input.value = '';
        }
    }

}