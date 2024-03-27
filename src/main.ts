import { ChangeColor } from "./app/functions/change-color";
import { InitButtons } from "./app/init/init-buttons";
import { InitCreateSelect } from "./app/init/init-create-select";
import { InitReadFile } from "./app/init/init-read-file";
import { InitShowMessage } from "./app/init/init-show-message";

export class Main {

    constructor() {
        //Test 001
        new InitShowMessage();

        //Test 002.
        new InitReadFile();

        //Test 003.
        new ChangeColor("background-test", ['green', 'yellow', 'blue', 'pink', 'purple']);

        //Test 003B
        new InitCreateSelect();

        //Test 004.
        new InitButtons();
    }
}

new Main();