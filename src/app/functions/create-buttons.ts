import { ButtonInterface } from "../interfaces/button.interface";

export class CreateButtons {

    appendButtons(targetElement: string, buttons: ButtonInterface[]): void {
        const element: HTMLElement | null = document.querySelector(targetElement);

        if(element) {
            buttons.forEach(item => {
                const button: HTMLButtonElement = document.createElement('button');
                button.className = item.className;
                button.textContent = item.text;
                element.appendChild(button);
            });
        }
    }

    createButton(className: string, text: string): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement('button');
        button.className = className;
        button.textContent = text;

        return button;
    }

}