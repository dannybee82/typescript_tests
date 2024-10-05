import { Month } from "../interfaces/month.interface";

export class CreateCalendar {
    
    private _calendarVisible: boolean = false;
    private _calendarClassName: string = '';
    private _targetInputFieldId: string = '';

    private _today: Date = new Date();
    private _currentDay: number = this._today.getDate();
    private _currentMonth: number = this._today.getMonth();
    private _currentYear: number =  this._today.getFullYear();

    private _months: Month[] = [
        { name: 'January', days: 31, dependsOnLeapYear: false },
        { name: 'February', days: 28, dependsOnLeapYear: true },
        { name: 'March', days: 31, dependsOnLeapYear: false },
        { name: 'April', days: 30, dependsOnLeapYear: false },
        { name: 'May', days: 31, dependsOnLeapYear: false },
        { name: 'June', days: 30, dependsOnLeapYear: false },
        { name: 'July', days: 31, dependsOnLeapYear: false },
        { name: 'August', days: 31, dependsOnLeapYear: false },
        { name: 'September', days: 30, dependsOnLeapYear: false },
        { name: 'October', days: 31, dependsOnLeapYear: false },
        { name: 'November', days: 30, dependsOnLeapYear: false },
        { name: 'December', days: 31, dependsOnLeapYear: false }
    ];

    private _dayNames: string[] = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

    addActionListener(buttonClassName: string): void {
        const button: HTMLButtonElement | null = document.querySelector(buttonClassName);

        if(button && button instanceof HTMLButtonElement) {
            button.addEventListener('click', () => {
                this._calendarVisible = !this._calendarVisible;
                this.showOrHideCalendar();
            });
        }
    }

    createCalendar(calendarClassName: string): void {
        this._calendarClassName = calendarClassName;

        const htmlElement: HTMLDivElement | null = document.querySelector(this._calendarClassName);

        if(htmlElement && htmlElement instanceof HTMLDivElement) {
            //Create calendar=header for buttons.
            const calendarHeader: HTMLDivElement = document.createElement('div');
            calendarHeader.className = 'calendar-header';

            //Create calendar days
            const calendarDays: HTMLDivElement = document.createElement('div');
            calendarDays.className = 'calendar-days';

            //Create current month + year.
            const currentMonthAndYear: HTMLDivElement = document.createElement('div');
            currentMonthAndYear.className = 'calendar-current-month';

            //Add buttons to calendarHeader.
            calendarHeader.appendChild(currentMonthAndYear);
            calendarHeader.appendChild(this.createButton('previous', false));
            calendarHeader.appendChild(this.createButton('next', true));            

            htmlElement.appendChild(calendarHeader);
            htmlElement.appendChild(calendarDays);

            //Draw calendar.
            this.redrawCalendar();
        }
    }

    setTargetInputFieldId(targetInputFieldId: string): void {
        this._targetInputFieldId = targetInputFieldId;
    }

    private showOrHideCalendar(): void {
        const htmlElement: HTMLElement | null = document.querySelector(this._calendarClassName);

        if(htmlElement) {
            htmlElement.style.visibility = this._calendarVisible ? 'visible' : 'hidden';
        }
    }

    private isLeapYear(year: number): boolean {
        return year % 100 == 0 && year % 400 == 0 || year % 4 == 0;
    }

    private createButton(text: string, isNextMonth: boolean): HTMLButtonElement {
        const button: HTMLButtonElement = document.createElement('button')
        button.textContent = text;
        button.className = 'calendar-button';
        button.addEventListener('click', () => {
            this.gotoNextOrPrevMonth(isNextMonth);
        });

        return button;
    }

    private gotoNextOrPrevMonth(isNextMonth: boolean): void {
        this._currentMonth = isNextMonth ? this._currentMonth += 1 : this._currentMonth -1;

        if(this._currentMonth < 0) {
            this._currentMonth = this._months.length - 1;
            this._currentYear--;
        }

        if(this._currentMonth >= this._months.length) {
            this._currentMonth = 0;
            this._currentYear++;
        }

        this.redrawCalendar();
    }

    private redrawCalendar(): void {
        const currentMonthAndYear: HTMLDivElement | null = document.querySelector('.calendar-current-month');
        
        if(currentMonthAndYear) {
            let monthInfo: Month = this._months[this._currentMonth];
            currentMonthAndYear.innerHTML = `${monthInfo.name} - ${this._currentYear}`;
        }

        const calendarDays: HTMLDivElement | null = document.querySelector('.calendar-days');

        if(calendarDays) {
            //Remove everything.
            calendarDays.innerHTML = '';

            let startCurrentMonth: Date = new Date(this._currentYear, this._currentMonth, 1);
            let startDayCurrentMonth: number = startCurrentMonth.getDay();

            //Note below: switch Sunday with Monday and vice versa.
            startDayCurrentMonth = startDayCurrentMonth === 0 ? 7 : startDayCurrentMonth === 7 ? 0 : startDayCurrentMonth;

            let today: Date = new Date();

            let monthInfo: Month = this._months[this._currentMonth];

            if(monthInfo.dependsOnLeapYear && this.isLeapYear(this._currentYear)) {
                monthInfo = {...monthInfo, days: monthInfo.days + 1};
            }

            //Create table for days.
            let calendar: string = '';
            calendar += '<table>';
            calendar += '<tr>';

            this._dayNames.forEach(element => {
                calendar += `<td>${element}</td>`;
            });

            calendar += '</tr>';
            calendar += '<tr>';

            for(let i = 0; i < 42; i++) {
                let day: string = (i - startDayCurrentMonth >= 0) && (i - startDayCurrentMonth + 1 <= monthInfo.days) ? `${i - startDayCurrentMonth + 1}` : ' ';
                let cellClassName: string = '';

                if(this._currentYear === today.getFullYear() && this._currentMonth === today.getMonth() && this._currentDay === i - startDayCurrentMonth + 1) {
                    cellClassName = 'today';
                } else {
                    cellClassName = day !== ' ' ? 'day' : '';
                }

                calendar += cellClassName === '' ? `<td>${day}</td>` : `<td class="calendar-day ${cellClassName}">${day}</td>`;

                if(i % 7 == 0 && i < 36) {
                    calendar += '</tr><tr>';
                }
            }

            calendar += '</tr>';
            calendar += '</table>';
            
            calendarDays.innerHTML = calendar;
            this.addClickFunctionsToCells();
        }
    }

    private addClickFunctionsToCells(): void {
        const cells: NodeListOf<HTMLTableCellElement> | null = document.querySelectorAll('.calendar-day');

        if(cells) {
            cells.forEach((element: HTMLTableCellElement) => {
                let textContent: string = element.textContent ?? ' ';

                if(textContent !== ' ') {
                    element.addEventListener('click', () => {
                        this.setDate(parseInt(textContent));
                        this._calendarVisible = false;
                        this.showOrHideCalendar();
                    });
                }
            });
        }
    }

    private setDate(day: number): void {
        let finalDay: string = day < 10 ? '0' + day : day.toString();
        let finalMonth: string = this._currentMonth + 1 < 10 ? '0' + (this._currentMonth + 1) : (this._currentMonth + 1).toString();
        const date: string = `${finalDay}-${finalMonth}-${this._currentYear}`;

        const inputField: HTMLInputElement | null = document.querySelector(this._targetInputFieldId);

        if(inputField && inputField instanceof HTMLInputElement) {
            inputField.value = date;
            inputField.dispatchEvent(new Event('change'));
        }
    }

}