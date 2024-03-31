export class SharedChangeColor {
    
    changeColor(targetClass: string, color: string | null): void {
        if(color) {
            let element: HTMLElement | null = document.querySelector(targetClass);

            if(element != null) {
                element.style.backgroundColor = color;
            }            
        }
    }

}