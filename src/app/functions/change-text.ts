export class ChangeText {

    changeText(targetClass: string, message: string): void {
        const element: HTMLElement | null =  document.querySelector(targetClass);

        if(element) {
            element.innerText = message;
        }
    }

}