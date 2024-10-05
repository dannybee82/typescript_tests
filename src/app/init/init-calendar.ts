import { CreateCalendar } from "../functions/create-calendar";

export class InitCalendar {

    private _buttonClassName: string = '.calendar-button';
    private _calendarClassName: string = '.calendar';
    private _targetInputFieldId: string = '#dateField';

    private _createCalendar: CreateCalendar = new CreateCalendar();

    constructor() {
        this._createCalendar.addActionListener(this._buttonClassName);
        this._createCalendar.createCalendar(this._calendarClassName);
        this._createCalendar.setTargetInputFieldId(this._targetInputFieldId);
    }

}