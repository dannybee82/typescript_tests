import { ChangeColor } from "./app/functions/change-color";
import { InitButtons } from "./app/init/init-buttons";
import { InitCreateSelect } from "./app/init/init-create-select";
import { InitDateValidation } from "./app/init/init-date-validation";
import { InitReadFile } from "./app/init/init-read-file";
import { InitShowMessage } from "./app/init/init-show-message";
import { InitCalendar } from "./app/init/init-calendar";
import { InitSorting } from "./app/init/init-sorting";
import { SortingDataInterface } from "./app/interfaces/sorting-data.interface";

export class Main {

    constructor() {
        //Test 001 = add message to div.
        new InitShowMessage();

        //Test 002 = read png & jpg file.
        new InitReadFile();

        //Test 003A = change background-colors with buttons.
        new ChangeColor(".background-test", ['.green', '.yellow', '.blue', '.pink', '.purple']);

        //Test 003B = change background-colors with select/dropdown.
        new InitCreateSelect();

        //Test 004 = create buttons.
        new InitButtons();

        //Test 005 = create input field with date validation.
        new InitDateValidation();

        //Test 006 = Calendar-button + Calendar.
        new InitCalendar();

        //Test 007 = Sorting numbers.
        const sortingNumbers: SortingDataInterface = {
            data: [3, 2, 7, 9, 10, 1, 4, 6, 5, 8],
            parentUlElementClass: '.numbers-demo',
            ascendingButtonClass: '.sort-numbers-asc-button',
            descendingButtonClass: '.sort-numbers-desc-button',
            resetButtonClass: '.sort-numbers-reset-button'
        };

        new InitSorting(sortingNumbers);

        //Test 008 = Sorting names.
        const sortingNames: SortingDataInterface = {
            data: ['Saskia', 'Matilda', 'Juliette', 'Caroline', 'Victoria', 'Abigaïl', 'Caitlin', 'Serana', 'Lydia'],
            parentUlElementClass: '.names-demo',
            ascendingButtonClass: '.sort-names-asc-button',
            descendingButtonClass: '.sort-names-desc-button',
            resetButtonClass: '.sort-names-reset-button'
        };

        new InitSorting(sortingNames);
    }
}

new Main();