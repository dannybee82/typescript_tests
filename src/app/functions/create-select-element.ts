export class CreateSelectElement {

    create = (targetId: string, selectId: string, options: string[]): void => {
        const elem: HTMLElement | null = document.getElementById(targetId);

        if(elem) {
            const select: HTMLSelectElement = document.createElement('select');
            select.id = selectId;

            options.forEach(element => {
                const option: HTMLOptionElement = document.createElement('option');
                option.value = element;
                option.text = element;

                select.appendChild(option);
            });

            elem.appendChild(select);
        }
    }

}