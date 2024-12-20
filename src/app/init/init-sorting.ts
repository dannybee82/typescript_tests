import { CreateListItems } from "../functions/create-list-items";
import { SortingDataInterface } from "../interfaces/sorting-data.interface";

export class InitSorting {

    private _targetUl: string = '';
    private _ascendingButton: string = '';
    private _descendingButton: string = '';
    private _resetButton: string = '';    

    private _createListItems: CreateListItems = new CreateListItems();

    private _originalState: (string | number)[] = [];

    constructor(sortingData: SortingDataInterface) {
        this._originalState = sortingData.data;
        this._targetUl = sortingData.parentUlElementClass;
        this._ascendingButton = sortingData.ascendingButtonClass;
        this._descendingButton = sortingData.descendingButtonClass;
        this._resetButton = sortingData.resetButtonClass;

        const arrayType: string = this.getArrayType(sortingData.data);
        this._createListItems.create(this._targetUl, sortingData.data);        

        const parentElement: HTMLDivElement | null = document.querySelector(this._targetUl);
        const ascendingButton: HTMLButtonElement | null = document.querySelector(this._ascendingButton);
        const descendingButton: HTMLButtonElement | null = document.querySelector(this._descendingButton);
        const resetButton: HTMLButtonElement | null = document.querySelector(this._resetButton);

        if(ascendingButton && parentElement) {
            ascendingButton.addEventListener('click', () => this.addFunction(parentElement, false, arrayType));
        }

        if(descendingButton && parentElement) {
            descendingButton.addEventListener('click', () => this.addFunction(parentElement, true, arrayType));
        }

        if(resetButton && parentElement) {
            resetButton.addEventListener('click', () => {
                parentElement.innerHTML = '';
                this._createListItems.create(this._targetUl, this._originalState);
            });
        }
    }

    private sortArray(arr: (string | number)[], isAscending: boolean, arrayType: string): (string | number)[] {
        if(arrayType === 'number array') {
            arr = arr.sort((a: any, b: any) => b - a);            

            if(!isAscending) {
                arr.reverse();
            }
        } else {
            arr = arr.sort();

            if(isAscending) {
                arr.reverse();
            }
        }

        return arr;
    }

    private getArrayType(arr: (string | number)[]) : string {
        const cleanUpRegex: RegExp = /^.*\s|\]{1}$/g;

        let numbers: number = 0;
        let strings: number = 0;

        arr.forEach(item => {
            const type: string = Object.prototype.toString.call(item).replace(cleanUpRegex, '');

            switch(type) {
                case 'String':
                    strings++;
                    break;
                case 'Number':
                    numbers++;
                    break;
                default:
                    strings++;
                    break;
            }
        });

        if(numbers > 0 && strings == 0) {
            return 'number array';
        }

        return 'string array';
    }

    private getValues(elements: NodeListOf<HTMLSpanElement>, arrayType: string): (string | number)[] {
        let values: (string | number)[] = [];
        
        elements.forEach(item => {
            if(item.textContent) {
                values.push(arrayType === 'number array' ? parseInt(item.textContent) : item.textContent);
            }                        
        });

        return values;
    }

    private addFunction(parentElement: HTMLElement, isAscending: boolean, arrayType: string): void {
        const listitems: NodeListOf<HTMLSpanElement> | null = document.querySelectorAll(this._targetUl + ' li');
           
        if(listitems) {
            let values: (string | number)[] = this.getValues(listitems, arrayType);

            parentElement.innerHTML = '';
            values = this.sortArray(values, isAscending, arrayType);
            this._createListItems.create(this._targetUl, values);
        }
    }

}