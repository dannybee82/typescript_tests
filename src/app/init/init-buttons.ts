import { ChangeText } from "../functions/change-text";
import { CreateButtons } from "../functions/create-buttons";
import { ButtonInterface } from "../interfaces/button.interface";

export class InitButtons {

    private _buttons: ButtonInterface[] = [
        {className: 'ok', text: 'Ok button'},
        {className: 'cancel', text: 'Cancel button'},
        {className: 'return', text: 'Return button'},
    ];

    private _createButtons: CreateButtons = new CreateButtons();
    private _changeText: ChangeText = new ChangeText();

    private _targetElement: string = ".dynamicButtons";
    private _targetResultElement: string = ".dynamicButtonResult";

    constructor() {
        this._createButtons.appendButtons(this._targetElement, this._buttons);
        this.addClickListeners();
    }

    private addClickListeners(): void {
        this._buttons.forEach(item => {
            let element: HTMLElement | null = document.querySelector("." + item.className);

            if(element) {
                const text: string = element.textContent ?? '???';
                element.addEventListener('click', () => this.showText(text), false);
            }
        });
    }

    private showText(text: string): void {
        this._changeText.changeText(this._targetResultElement, text);
    }

}
