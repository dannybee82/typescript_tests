import { ChangeText } from "../functions/change-text";

export class InitShowMessage {

    private _targetClass: string = ".firstTypeScriptTest";

    private _changeText: ChangeText = new ChangeText();

    constructor() {
        this._changeText.changeText(this._targetClass, 'This is a first TypeScript test.');
    }

}