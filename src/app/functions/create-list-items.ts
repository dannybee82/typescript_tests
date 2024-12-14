export class CreateListItems {

    create(className: string, data: (string | number)[]) : void {
        const element: HTMLUListElement | null = document.querySelector(className);

        if(element) {
            data.forEach(item => {
                const span: HTMLSpanElement = document.createElement('li');
                span.textContent = item.toString();
                element.appendChild(span);
            })
        }
    }

}