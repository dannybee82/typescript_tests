export class CreateSelectElement {

    create(className: string, selectId: string, options: string[], addClass?: boolean): void {
        const element: HTMLElement | null = document.querySelector(className);

        if(element) {
            const select: HTMLSelectElement = document.createElement('select');
            select.id = selectId;
            select.className = 'default-select-color';

            options.forEach(element => {
                const option: HTMLOptionElement = document.createElement('option');
                option.value = element;
                option.text = element;

                if(addClass) {
                    option.className = (element !== '') ? 'item-color-' + element : 'default-select-color';
                }

                select.appendChild(option);
            });

            element.appendChild(select);
        }
    }

}