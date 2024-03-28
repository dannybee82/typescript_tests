import { ChangeText } from "../functions/change-text";
import { CreateButtons } from "../functions/create-buttons";
import { ButtonInterface } from "../interfaces/button.interface";

export class InitButtons {

    private _buttons: ButtonInterface[] = [
        {id: 'ok', text: 'Ok button'},
        {id: 'cancel', text: 'Cancel button'},
        {id: 'return', text: 'Return button'},
    ];

    private _createButtons: CreateButtons = new CreateButtons();
    private _changeText: ChangeText = new ChangeText();

    private _targetElement: string = "dynamicButtons";
    private _targetResultElement: string = "dynamicButtonResult";

    constructor() {
        this._createButtons.appendButtons(this._targetElement, this._buttons);
        this.addClickListeners();
    }

    private addClickListeners = (): void => {
        this._buttons.forEach(element => {
            let elem: HTMLElement | null = document.getElementById(element.id);

            if(elem) {
                const text: string = elem.textContent ?? '???';
                elem.addEventListener('click', () => this.showText(text), false);
            }
        });
    }

    private showText = (text: string): void => {
        this._changeText.changeText(this._targetResultElement, text);
    }

}
