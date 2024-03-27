import { ChangeText } from "../functions/change-text";

export class InitShowMessage {

    private _changeText: ChangeText = new ChangeText();

    constructor() {
        this._changeText.changeText('firstTypeScriptTest', 'This is a first TypeScript test.');
    }

}