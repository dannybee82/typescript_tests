import { CreateListItems } from "../functions/create-list-items";

export class InitSortingNumbers {

    private _targetUl: string = '.numbers-demo';
    private _ascendingButton: string = '.sort-numbers-asc-button';
    private _descendingButton: string = '.sort-numbers-desc-button';
    private _resetButton: string = '.sort-numbers-reset-button';    

    private _createListItems: CreateListItems = new CreateListItems();

    private _originalState: (string | number)[] = [];

    constructor(data: (string | number)[]) {
        this._originalState = data;
        let arrayType: string = this.getArrayType(data);

        this._createListItems.create(this._targetUl, data);

        const numbersDiv: HTMLDivElement | null = document.querySelector(this._targetUl);
        const ascendingButton: HTMLButtonElement | null = document.querySelector(this._ascendingButton);
        const descendingButton: HTMLButtonElement | null = document.querySelector(this._descendingButton);
        const resetButton: HTMLButtonElement | null = document.querySelector(this._resetButton);

        if(ascendingButton && numbersDiv) {
            ascendingButton.addEventListener('click', () => {
                const listitems: NodeListOf<HTMLLIElement> | null = document.querySelectorAll(this._targetUl + ' li');
               
                if(listitems) {
                    let values: (string | number)[] = [];
                    listitems.forEach(item => {
                        if(item.textContent) {
                            values.push(arrayType === 'number array' ? parseInt(item.textContent) : item.textContent);
                        }                        
                    });

                    numbersDiv.innerHTML = '';
                    values = this.sortArray(values, false, arrayType);
                    this._createListItems.create(this._targetUl, values);
                }
            });
        }

        if(descendingButton && numbersDiv) {
            descendingButton.addEventListener('click', () => {
                const spans: NodeListOf<HTMLSpanElement> | null = document.querySelectorAll(this._targetUl + ' li');
               
                if(spans) {
                    let values: (string | number)[] = [];
                    spans.forEach(item => {
                        if(item.textContent) {
                            values.push(arrayType === 'number array' ? parseInt(item.textContent) : item.textContent);
                        }                        
                    });

                    numbersDiv.innerHTML = '';
                    values = this.sortArray(values, true, arrayType);
                    this._createListItems.create(this._targetUl, values);
                }
            });
        }

        if(resetButton && numbersDiv) {
            resetButton.addEventListener('click', () => {
                numbersDiv.innerHTML = '';
                this._createListItems.create(this._targetUl, this._originalState);
            });
        }
    }

    private sortArray(arr: (string | number)[], isAscending: boolean, arrayType: string): (string | number)[] {
        if(arrayType === 'number array') {
            arr = arr.sort((a: any, b: any) => b - a);
        } else {
            arr = arr.sort();
        }        

        if(!isAscending) {
            arr.reverse();
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

}