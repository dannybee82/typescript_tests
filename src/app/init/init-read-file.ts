import { ReadFile } from "../functions/read-file";

export const getFileList = (input: HTMLInputElement): FileList | null => { 
    return input.files; 
};

export class InitReadFile {

    private _targetInputSelectFile: string = "selectFile";
    private _targetPreviewImage: string = "previewImage";

    private _readFile: ReadFile = new ReadFile();

    constructor() {
        this.addChangeListener(this._targetInputSelectFile);
    }
    
    addChangeListener(targetId: string): void {
        if(document.getElementById(targetId)) {
            const elem: HTMLElement | null =  document.getElementById(targetId);
    
            if(elem != null && elem instanceof HTMLInputElement) {
                const input: HTMLInputElement = elem as HTMLInputElement;
                input.addEventListener("change", () => this.loadFiles(input.files ?? null), false);
            }
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

    private addImage(targetId: string, base64: string): void {
        if(document.getElementById(targetId)) {
            let elem: HTMLElement | null =  document.getElementById(targetId);
    
            let img: HTMLImageElement = document.createElement('img');
            img.src = base64;
            img.title = 'Preview image';
            img.style.maxWidth = '250px';
            img.style.height = 'auto';
    
            elem?.appendChild(img);
        }
    }

}