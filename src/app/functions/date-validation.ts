export class DateValidation {

    addDateValidation(fieldId: string): void {
        const inputElement: HTMLInputElement | null = document.querySelector(fieldId);

        if(inputElement != null && inputElement instanceof HTMLInputElement) {
            inputElement.addEventListener("change", () => this.validateDate(inputElement) );

            //Trigger for the first time.
            this.validateDate(inputElement);
        }
    }

    private validateDate(inputElement: HTMLInputElement): void {
        let date: string = inputElement.value;

        if(date !== '') {
            let parts: string[] = date.split('-').reverse();;
            let dt: Date = new Date(parts.join("-"));

            if(dt.toString() === 'Invalid Date') {
                inputElement.className = 'invalid-date';
                return;
            }

            let json: string = dt.toJSON();
            json = json.substring(0, json.toLowerCase().indexOf('t'));

            if(json !== parts.join("-")) {
                inputElement.className = 'invalid-date';
                return;
            }

            inputElement.className = 'valid-date';
        }        
    }

}