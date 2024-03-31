import { SharedChangeColor } from "./shared-change-color";

export class ChangeColor {

    private _targetClass: string = "";
    private _buttonClasses: string[] = [];

    private _sharedChangeColor: SharedChangeColor = new SharedChangeColor();

    constructor(targetClass: string, buttonClasses: string[]) {
        this._targetClass = targetClass;
        this._buttonClasses = buttonClasses;

        this._buttonClasses.forEach(element => {
            this.addClickListener(element);
        });
    }

    private addClickListener(buttonClass: string): void {
        const element: HTMLElement | null =  document.querySelector(buttonClass);
    
        if(element != null && element instanceof HTMLButtonElement) {                
            const input: HTMLButtonElement = element as HTMLButtonElement;
            input.addEventListener(
                "click", 
                () => this._sharedChangeColor.changeColor(this._targetClass, input.getAttribute('class') ?? null),
                false
            );
        }
    }
    
}