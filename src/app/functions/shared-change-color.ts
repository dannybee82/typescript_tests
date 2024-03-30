export class SharedChangeColor {
    
    changeColor(targetId: string, color: string | null): void {
        if(color) {
            let elem: HTMLElement | null = document.getElementById(targetId);

            if(elem != null) {
                elem.style.backgroundColor = color;
            }            
        }
    }

}