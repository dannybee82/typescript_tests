import { ChangeColor } from "./app/functions/change-color";
import { InitButtons } from "./app/init/init-buttons";
import { InitCreateSelect } from "./app/init/init-create-select";
import { InitDateValidation } from "./app/init/init-date-validation";
import { InitReadFile } from "./app/init/init-read-file";
import { InitShowMessage } from "./app/init/init-show-message";
import { InitCalendar } from "./app/init/init-calendar";

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
    }
}

new Main();