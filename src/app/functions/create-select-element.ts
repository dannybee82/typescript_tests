export class CreateSelectElement {

    create(targetId: string, selectId: string, options: string[], addClass?: boolean): void {
        const elem: HTMLElement | null = document.getElementById(targetId);

        if(elem) {
            const select: HTMLSelectElement = document.createElement('select');
            select.id = selectId;
            select.className = 'default-select-color';

            options.forEach(element => {
                const option: HTMLOptionElement = document.createElement('option');
                option.value = element;
                option.text = element;

                if(addClass) {
                    option.className = 'item-color-' + element;
                }

                select.appendChild(option);
            });

            elem.appendChild(select);
        }
    }

}