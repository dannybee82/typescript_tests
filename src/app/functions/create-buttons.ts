import { ButtonInterface } from "../interfaces/button.interface";

export class CreateButtons {

    create(targetElement: string, buttons: ButtonInterface[]): void {
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

}