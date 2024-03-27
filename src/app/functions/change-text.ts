export class ChangeText {

    changeText = (targetId: string, message: string): void => {
        const elem: HTMLElement | null =  document.getElementById(targetId);

        if(elem) {
            elem.innerText = message;
        }
    }

}