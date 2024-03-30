import { ButtonInterface } from "../interfaces/button.interface";

export class CreateButtons {

    appendButtons(targetElement: string, buttons: ButtonInterface[]): void {
        const elem: HTMLElement | null = document.getElementById(targetElement);

        if(elem) {
            buttons.forEach(element => {
                const button: HTMLButtonElement = document.createElement('button');
                button.id = element.id;
                button.textContent = element.text;
                elem.appendChild(button);
            });
        }
    }

    createButton(id: string, text: string): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement('button');
        button.id = id;
        button.textContent = text;

        return button;
    }

}