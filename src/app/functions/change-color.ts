import { SharedChangeColor } from "./shared-change-color";

export class ChangeColor {

    private _targetDivElement: string = "";
    private _buttonIds: string[] = [];

    private _sharedChangeColor: SharedChangeColor = new SharedChangeColor();

    constructor(targetDiv: string, buttonIds: string[]) {
        this._targetDivElement = targetDiv;
        this._buttonIds = buttonIds;

        this._buttonIds.forEach(element => {
            this.addClickListener(element);
        });
    }

    private addClickListener = (targetId: string): void => {
        if(document.getElementById(targetId)) {
            const elem: HTMLElement | null =  document.getElementById(targetId);
    
            if(elem != null && elem instanceof HTMLButtonElement) {                
                const input: HTMLButtonElement = elem as HTMLButtonElement;
                input.addEventListener(
                    "click", 
                    () => this._sharedChangeColor.changeColor(this._targetDivElement, input.getAttribute('id') ?? null),
                    false
                );
            }
        }
    }
    
}