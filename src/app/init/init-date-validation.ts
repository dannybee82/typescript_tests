import { DateValidation } from "../functions/date-validation";

export class InitDateValidation {

    private _targetDateFieldId: string = 'input#dateField';

    private _dateValidation: DateValidation = new DateValidation();

    constructor() {
        this._dateValidation.addDateValidation(this._targetDateFieldId);
    }

}